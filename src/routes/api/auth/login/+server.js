import { json } from '@sveltejs/kit';
import * as usersModel from '$lib/server/models/users.js';

/**
 * POST /api/auth/login - เข้าสู่ระบบ
 */
export async function POST({ request, cookies }) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		const result = usersModel.authenticateUser(username, password);

		if (!result.success) {
			return json({ error: result.error }, { status: 401 });
		}

		// สามารถเพิ่ม session/JWT ได้ที่นี่
		// ตัวอย่างง่ายๆ: เก็บ user id ใน cookie
		cookies.set('user_id', result.user.id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		return json({ success: true, user: result.user });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
