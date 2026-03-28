import { redirect } from '@sveltejs/kit';
import { isAuthenticated, getCurrentUser } from '$lib/server/auth.js';

export function load({ cookies, url }) {
	// ถ้าไม่ใช่หน้า login และยังไม่ได้ login ให้ redirect ไป login
	if (!url.pathname.startsWith('/admin/login') && !isAuthenticated(cookies)) {
		throw redirect(303, '/admin/login');
	}

	// ส่งข้อมูล user ไปให้ client
	const user = getCurrentUser(cookies);

	return {
		user
	};
}
