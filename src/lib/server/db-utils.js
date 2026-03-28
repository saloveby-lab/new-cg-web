import crypto from 'crypto';

/**
 * Create slug from title
 */
export function createSlug(title) {
	return title
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/--+/g, '-') // Replace multiple -- with single -
		.trim();
}

/**
 * Hash password with SHA-256
 */
export function hashPassword(password) {
	return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verify password against hash
 */
export function verifyPassword(password, hash) {
	return hashPassword(password) === hash;
}

/**
 * Create pagination metadata
 */
export function paginate(total, page = 1, limit = 10) {
	const offset = (page - 1) * limit;
	const totalPages = Math.ceil(total / limit);

	return {
		total,
		page: parseInt(page),
		limit: parseInt(limit),
		totalPages,
		hasNextPage: page < totalPages,
		hasPrevPage: page > 1,
		offset
	};
}

/**
 * Format datetime for SQLite
 */
export function formatDateTime(date = new Date()) {
	return date.toISOString().replace('T', ' ').substring(0, 19);
}
