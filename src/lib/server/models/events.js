import db from '../database.js';
import { createSlug, paginate } from '../db-utils.js';

/**
 * สร้าง Event ใหม่
 */
export function createEvent({
	title,
	description,
	location,
	event_date,
	end_date,
	featured_image,
	status = 'upcoming',
	max_participants,
	author_id
}) {
	try {
		const slug = createSlug(title);
		const stmt = db.prepare(`
			INSERT INTO events (
				title, slug, description, location, event_date, end_date,
				featured_image, status, max_participants, author_id
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`);

		const result = stmt.run(
			title,
			slug,
			description,
			location,
			event_date,
			end_date,
			featured_image,
			status,
			max_participants,
			author_id
		);

		return { success: true, id: result.lastInsertRowid, slug };
	} catch (error) {
		if (error.message.includes('UNIQUE constraint failed')) {
			// ถ้า slug ซ้ำ ให้เพิ่มเลขต่อท้าย
			const timestamp = Date.now();
			const newSlug = `${createSlug(title)}-${timestamp}`;
			const stmt = db.prepare(`
				INSERT INTO events (
					title, slug, description, location, event_date, end_date,
					featured_image, status, max_participants, author_id
				)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			`);

			const result = stmt.run(
				title,
				newSlug,
				description,
				location,
				event_date,
				end_date,
				featured_image,
				status,
				max_participants,
				author_id
			);
			return { success: true, id: result.lastInsertRowid, slug: newSlug };
		}
		return { success: false, error: error.message };
	}
}

/**
 * ดึง Events ทั้งหมด (พร้อม pagination และ filter)
 */
export function getAllEvents({ page = 1, limit = 10, status = null, author_id = null } = {}) {
	let whereConditions = [];
	let params = [];

	if (status) {
		whereConditions.push('events.status = ?');
		params.push(status);
	}

	if (author_id) {
		whereConditions.push('events.author_id = ?');
		params.push(author_id);
	}

	const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

	// นับจำนวนทั้งหมด
	const countStmt = db.prepare(`SELECT COUNT(*) as total FROM events ${whereClause}`);
	const { total } = countStmt.get(...params);
	const pagination = paginate(total, page, limit);

	// ดึงข้อมูล พร้อมข้อมูล author
	const stmt = db.prepare(`
		SELECT
			events.*,
			users.username as author_name,
			users.email as author_email
		FROM events
		LEFT JOIN users ON events.author_id = users.id
		${whereClause}
		ORDER BY events.event_date DESC
		LIMIT ? OFFSET ?
	`);

	const events = stmt.all(...params, pagination.limit, pagination.offset);
	return { events, pagination };
}

/**
 * ดึง Events ที่กำลังจะมาถึง
 */
export function getUpcomingEvents(page = 1, limit = 10) {
	const countStmt = db.prepare(`
		SELECT COUNT(*) as total
		FROM events
		WHERE status = 'upcoming' AND event_date >= datetime('now')
	`);
	const { total } = countStmt.get();
	const pagination = paginate(total, page, limit);

	const stmt = db.prepare(`
		SELECT
			events.*,
			users.username as author_name
		FROM events
		LEFT JOIN users ON events.author_id = users.id
		WHERE events.status = 'upcoming' AND events.event_date >= datetime('now')
		ORDER BY events.event_date ASC
		LIMIT ? OFFSET ?
	`);

	const events = stmt.all(pagination.limit, pagination.offset);
	return { events, pagination };
}

/**
 * ดึง Events ที่ผ่านไปแล้ว
 */
export function getPastEvents(page = 1, limit = 10) {
	const countStmt = db.prepare(`
		SELECT COUNT(*) as total
		FROM events
		WHERE event_date < datetime('now')
	`);
	const { total } = countStmt.get();
	const pagination = paginate(total, page, limit);

	const stmt = db.prepare(`
		SELECT
			events.*,
			users.username as author_name
		FROM events
		LEFT JOIN users ON events.author_id = users.id
		WHERE events.event_date < datetime('now')
		ORDER BY events.event_date DESC
		LIMIT ? OFFSET ?
	`);

	const events = stmt.all(pagination.limit, pagination.offset);
	return { events, pagination };
}

/**
 * ดึง Event ตาม ID
 */
export function getEventById(id) {
	const stmt = db.prepare(`
		SELECT
			events.*,
			users.username as author_name,
			users.email as author_email
		FROM events
		LEFT JOIN users ON events.author_id = users.id
		WHERE events.id = ?
	`);
	return stmt.get(id);
}

/**
 * ดึง Event ตาม slug
 */
export function getEventBySlug(slug) {
	const stmt = db.prepare(`
		SELECT
			events.*,
			users.username as author_name,
			users.email as author_email
		FROM events
		LEFT JOIN users ON events.author_id = users.id
		WHERE events.slug = ?
	`);
	return stmt.get(slug);
}

/**
 * ค้นหา Events
 */
export function searchEvents(query, page = 1, limit = 10) {
	const searchPattern = `%${query}%`;

	const countStmt = db.prepare(`
		SELECT COUNT(*) as total
		FROM events
		WHERE title LIKE ? OR description LIKE ? OR location LIKE ?
	`);
	const { total } = countStmt.get(searchPattern, searchPattern, searchPattern);
	const pagination = paginate(total, page, limit);

	const stmt = db.prepare(`
		SELECT
			events.*,
			users.username as author_name
		FROM events
		LEFT JOIN users ON events.author_id = users.id
		WHERE events.title LIKE ? OR events.description LIKE ? OR events.location LIKE ?
		ORDER BY events.event_date DESC
		LIMIT ? OFFSET ?
	`);

	const events = stmt.all(
		searchPattern,
		searchPattern,
		searchPattern,
		pagination.limit,
		pagination.offset
	);
	return { events, pagination };
}

/**
 * อัพเดท Event
 */
export function updateEvent(
	id,
	{ title, description, location, event_date, end_date, featured_image, status, max_participants }
) {
	try {
		const updates = [];
		const values = [];

		if (title !== undefined) {
			updates.push('title = ?');
			values.push(title);

			// อัพเดท slug ด้วยถ้ามีการเปลี่ยน title
			updates.push('slug = ?');
			values.push(createSlug(title));
		}

		if (description !== undefined) {
			updates.push('description = ?');
			values.push(description);
		}

		if (location !== undefined) {
			updates.push('location = ?');
			values.push(location);
		}

		if (event_date !== undefined) {
			updates.push('event_date = ?');
			values.push(event_date);
		}

		if (end_date !== undefined) {
			updates.push('end_date = ?');
			values.push(end_date);
		}

		if (featured_image !== undefined) {
			updates.push('featured_image = ?');
			values.push(featured_image);
		}

		if (status !== undefined) {
			updates.push('status = ?');
			values.push(status);
		}

		if (max_participants !== undefined) {
			updates.push('max_participants = ?');
			values.push(max_participants);
		}

		if (updates.length === 0) {
			return { success: false, error: 'No fields to update' };
		}

		updates.push('updated_at = CURRENT_TIMESTAMP');
		values.push(id);

		const stmt = db.prepare(`
			UPDATE events
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
 * ลบ Event
 */
export function deleteEvent(id) {
	try {
		const stmt = db.prepare('DELETE FROM events WHERE id = ?');
		const result = stmt.run(id);
		return { success: result.changes > 0 };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

/**
 * ลบ Events หลายรายการ
 */
export function deleteMultipleEvents(ids) {
	try {
		const placeholders = ids.map(() => '?').join(',');
		const stmt = db.prepare(`DELETE FROM events WHERE id IN (${placeholders})`);
		const result = stmt.run(...ids);
		return { success: true, deleted: result.changes };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
