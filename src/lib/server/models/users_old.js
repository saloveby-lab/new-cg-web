import db from '../database.js';
import { hashPassword, verifyPassword, paginate } from '../db-utils.js';

/**
 * สร้าง User ใหม่
 */
export function createUser({ username, email, password, role = 'user' }) {
	try {
		const passwordHash = hashPassword(password);
		const stmt = db.prepare(`
			INSERT INTO users (username, email, password_hash, role)
			VALUES (?, ?, ?, ?)
		`);

		const result = stmt.run(username, email, passwordHash, role);
		return { success: true, id: result.lastInsertRowid };
	} catch (error) {
		if (error.message.includes('UNIQUE constraint failed')) {
			return { success: false, error: 'Username or email already exists' };
		}
		return { success: false, error: error.message };
	}
}

/**
 * ดึง User ทั้งหมด (พร้อม pagination)
 */
export function getAllUsers(page = 1, limit = 10) {
	const countStmt = db.prepare('SELECT COUNT(*) as total FROM users');
	const { total } = countStmt.get();
	const pagination = paginate(total, page, limit);

	const stmt = db.prepare(`
		SELECT id, username, email, role, created_at, updated_at
		FROM users
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`);

	const users = stmt.all(pagination.limit, pagination.offset);
	return { users, pagination };
}

/**
 * ดึง User ตาม ID
 */
export function getUserById(id) {
	const stmt = db.prepare(`
		SELECT id, username, email, role, created_at, updated_at
		FROM users
		WHERE id = ?
	`);
	return stmt.get(id);
}

/**
 * ดึง User ตาม username
 */
export function getUserByUsername(username) {
	const stmt = db.prepare(`
		SELECT id, username, email, role, created_at, updated_at
		FROM users
		WHERE username = ?
	`);
	return stmt.get(username);
}

/**
 * ดึง User ตาม email
 */
export function getUserByEmail(email) {
	const stmt = db.prepare(`
		SELECT id, username, email, role, created_at, updated_at
		FROM users
		WHERE email = ?
	`);
	return stmt.get(email);
}

/**
 * Login - ตรวจสอบ username/email และ password
 */
export function authenticateUser(usernameOrEmail, password) {
	const stmt = db.prepare(`
		SELECT id, username, email, password_hash, role
		FROM users
		WHERE username = ? OR email = ?
	`);
	const user = stmt.get(usernameOrEmail, usernameOrEmail);

	if (!user) {
		return { success: false, error: 'User not found' };
	}

	if (verifyPassword(password, user.password_hash)) {
		// ไม่ส่ง password_hash กลับไป
		const { password_hash, ...userWithoutPassword } = user;
		return { success: true, user: userWithoutPassword };
	}

	return { success: false, error: 'Invalid password' };
}

/**
 * อัพเดท User
 */
export function updateUser(id, { username, email, role }) {
	try {
		const updates = [];
		const values = [];

		if (username !== undefined) {
			updates.push('username = ?');
			values.push(username);
		}
		if (email !== undefined) {
			updates.push('email = ?');
			values.push(email);
		}
		if (role !== undefined) {
			updates.push('role = ?');
			values.push(role);
		}

		if (updates.length === 0) {
			return { success: false, error: 'No fields to update' };
		}

		updates.push('updated_at = CURRENT_TIMESTAMP');
		values.push(id);

		const stmt = db.prepare(`
			UPDATE users
			SET ${updates.join(', ')}
			WHERE id = ?
		`);

		const result = stmt.run(...values);
		return { success: result.changes > 0 };
	} catch (error) {
		if (error.message.includes('UNIQUE constraint failed')) {
			return { success: false, error: 'Username or email already exists' };
		}
		return { success: false, error: error.message };
	}
}

/**
 * เปลี่ยน password
 */
export function changePassword(id, newPassword) {
	try {
		const passwordHash = hashPassword(newPassword);
		const stmt = db.prepare(`
			UPDATE users
			SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
			WHERE id = ?
		`);

		const result = stmt.run(passwordHash, id);
		return { success: result.changes > 0 };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

/**
 * ลบ User
 */
export function deleteUser(id) {
	try {
		const stmt = db.prepare('DELETE FROM users WHERE id = ?');
		const result = stmt.run(id);
		return { success: result.changes > 0 };
	} catch (error) {
		return { success: false, error: error.message };
	}
}
