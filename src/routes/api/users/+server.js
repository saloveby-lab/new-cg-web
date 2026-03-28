import { json } from '@sveltejs/kit';
import * as usersModel from '$lib/server/models/users.js';

/**
 * GET /api/users - ดึง users ทั้งหมด
 */
export async function GET({ url }) {
	const page = parseInt(url.searchParams.get('page')) || 1;
	const limit = parseInt(url.searchParams.get('limit')) || 10;

	try {
		const result = usersModel.getAllUsers(page, limit);
		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * POST /api/users - สร้าง user ใหม่
 */
export async function POST({ request }) {
	try {
		const data = await request.json();
		const { username, email, password, role } = data;

		// Validate required fields
		if (!username || !email || !password) {
			return json({ error: 'Username, email, and password are required' }, { status: 400 });
		}

		const result = usersModel.createUser({ username, email, password, role });

		if (!result.success) {
			return json({ error: result.error }, { status: 400 });
		}

		return json(result, { status: 201 });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
