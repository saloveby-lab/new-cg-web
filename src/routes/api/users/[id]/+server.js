import { json } from '@sveltejs/kit';
import * as usersModel from '$lib/server/models/users.js';

/**
 * GET /api/users/[id] - ดึง user ตาม ID
 */
export async function GET({ params }) {
	try {
		const user = usersModel.getUserById(params.id);

		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json(user);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * PUT /api/users/[id] - อัพเดท user
 */
export async function PUT({ params, request }) {
	try {
		const data = await request.json();
		const { username, email, role } = data;

		const result = usersModel.updateUser(params.id, { username, email, role });

		if (!result.success) {
			return json({ error: result.error }, { status: 400 });
		}

		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * DELETE /api/users/[id] - ลบ user
 */
export async function DELETE({ params }) {
	try {
		const result = usersModel.deleteUser(params.id);

		if (!result.success) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
