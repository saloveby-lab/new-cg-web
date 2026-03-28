import db from '../database.js';
import { createSlug, paginate } from '../db-utils.js';

/**
 * Create new News article
 */
export function createNews({ title, content, excerpt, featured_image, author_id, status = 'draft', category = 'News', featured = 0 }) {
	try {
		const slug = createSlug(title);
		const stmt = db.prepare(`
			INSERT INTO news (title, slug, content, excerpt, featured_image, author_id, status, category, featured, published_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

		const published_at = status === 'published' ? new Date().toISOString() : null;
		const result = stmt.run(title, slug, content, excerpt, featured_image, author_id, status, category, featured ? 1 : 0, published_at);

		return { success: true, id: result.lastInsertRowid, slug };
	} catch (error) {
		if (error.message.includes('UNIQUE constraint failed')) {
			// If slug is duplicate, add timestamp suffix
			const timestamp = Date.now();
			const newSlug = `${createSlug(title)}-${timestamp}`;
			const stmt = db.prepare(`
				INSERT INTO news (title, slug, content, excerpt, featured_image, author_id, status, category, featured, published_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			`);
			const published_at = status === 'published' ? new Date().toISOString() : null;
			const result = stmt.run(title, newSlug, content, excerpt, featured_image, author_id, status, category, featured ? 1 : 0, published_at);
			return { success: true, id: result.lastInsertRowid, slug: newSlug };
		}
		return { success: false, error: error.message };
	}
}

/**
 * ดึง News ทั้งหมด (พร้อม pagination และ filter)
 */
export function getAllNews({ page = 1, limit = 10, status = null, author_id = null } = {}) {
	let whereConditions = [];
	let params = [];

	if (status) {
		whereConditions.push('news.status = ?');
		params.push(status);
	}

	if (author_id) {
		whereConditions.push('news.author_id = ?');
		params.push(author_id);
	}

	const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

	// นับจำนวนทั้งหมด
	const countStmt = db.prepare(`SELECT COUNT(*) as total FROM news ${whereClause}`);
	const { total } = countStmt.get(...params);
	const pagination = paginate(total, page, limit);

	// ดึงข้อมูล พร้อมข้อมูล author
	const stmt = db.prepare(`
		SELECT
			news.*,
			users.username as author_name,
			users.email as author_email
		FROM news
		LEFT JOIN users ON news.author_id = users.id
		${whereClause}
		ORDER BY news.created_at DESC
		LIMIT ? OFFSET ?
	`);

	const news = stmt.all(...params, pagination.limit, pagination.offset);
	return { news, pagination };
}

/**
 * ดึง News ที่ publish แล้ว (สำหรับแสดงหน้าเว็บ)
 */
export function getPublishedNews(page = 1, limit = 10) {
	return getAllNews({ page, limit, status: 'published' });
}

/**
 * ดึง News ตาม ID
 */
export function getNewsById(id) {
	const stmt = db.prepare(`
		SELECT
			news.*,
			users.username as author_name,
			users.email as author_email
		FROM news
		LEFT JOIN users ON news.author_id = users.id
		WHERE news.id = ?
	`);
	return stmt.get(id);
}

/**
 * ดึง News ตาม slug
 */
export function getNewsBySlug(slug) {
	const stmt = db.prepare(`
		SELECT
			news.*,
			users.username as author_name,
			users.email as author_email
		FROM news
		LEFT JOIN users ON news.author_id = users.id
		WHERE news.slug = ?
	`);
	return stmt.get(slug);
}

/**
 * ค้นหา News
 */
export function searchNews(query, page = 1, limit = 10) {
	const searchPattern = `%${query}%`;

	const countStmt = db.prepare(`
		SELECT COUNT(*) as total
		FROM news
		WHERE title LIKE ? OR content LIKE ? OR excerpt LIKE ?
	`);
	const { total } = countStmt.get(searchPattern, searchPattern, searchPattern);
	const pagination = paginate(total, page, limit);

	const stmt = db.prepare(`
		SELECT
			news.*,
			users.username as author_name
		FROM news
		LEFT JOIN users ON news.author_id = users.id
		WHERE news.title LIKE ? OR news.content LIKE ? OR news.excerpt LIKE ?
		ORDER BY news.created_at DESC
		LIMIT ? OFFSET ?
	`);

	const news = stmt.all(searchPattern, searchPattern, searchPattern, pagination.limit, pagination.offset);
	return { news, pagination };
}

/**
 * Update News article
 */
export function updateNews(id, { title, content, excerpt, featured_image, status, category, featured }) {
	try {
		const updates = [];
		const values = [];

		if (title !== undefined) {
			updates.push('title = ?');
			values.push(title);

			// Update slug if title changes
			updates.push('slug = ?');
			values.push(createSlug(title));
		}

		if (content !== undefined) {
			updates.push('content = ?');
			values.push(content);
		}

		if (excerpt !== undefined) {
			updates.push('excerpt = ?');
			values.push(excerpt);
		}

		if (featured_image !== undefined) {
			updates.push('featured_image = ?');
			values.push(featured_image);
		}

		if (category !== undefined) {
			updates.push('category = ?');
			values.push(category);
		}

		if (featured !== undefined) {
			updates.push('featured = ?');
			values.push(featured ? 1 : 0);
		}

		if (status !== undefined) {
			updates.push('status = ?');
			values.push(status);

			// Set published_at timestamp when status changes to published
			if (status === 'published') {
				updates.push('published_at = ?');
				values.push(new Date().toISOString());
			}
		}

		if (updates.length === 0) {
			return { success: false, error: 'No fields to update' };
		}

		updates.push('updated_at = CURRENT_TIMESTAMP');
		values.push(id);

		const stmt = db.prepare(`
			UPDATE news
			SET ${updates.join(', ')}
			WHERE id = ?
		`);

		const result = stmt.run(...values);
		return { success: result.changes > 0 };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

/**
 * ลบ News
 */
export function deleteNews(id) {
	try {
		const stmt = db.prepare('DELETE FROM news WHERE id = ?');
		const result = stmt.run(id);
		return { success: result.changes > 0 };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

/**
 * ลบ News หลายรายการ
 */
export function deleteMultipleNews(ids) {
	try {
		const placeholders = ids.map(() => '?').join(',');
		const stmt = db.prepare(`DELETE FROM news WHERE id IN (${placeholders})`);
		const result = stmt.run(...ids);
		return { success: true, deleted: result.changes };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
