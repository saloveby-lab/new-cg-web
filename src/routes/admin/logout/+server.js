import { json } from '@sveltejs/kit';
import { logout } from '$lib/server/auth.js';

export async function POST({ cookies }) {
	logout(cookies);
	return json({ success: true });
}
