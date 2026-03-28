import { json } from '@sveltejs/kit';

/**
 * POST /api/auth/logout - ออกจากระบบ
 */
export async function POST({ cookies }) {
	cookies.delete('user_id', { path: '/' });
	return json({ success: true, message: 'Logged out successfully' });
}
