import { authenticateUser } from './models/users.js';

/**
 * Check if user is authenticated
 */
export function isAuthenticated(cookies) {
	const userId = cookies.get('admin_user_id');
	return !!userId;
}

/**
 * Get current user from cookies
 */
export function getCurrentUser(cookies) {
	const userId = cookies.get('admin_user_id');
	const username = cookies.get('admin_username');
	const role = cookies.get('admin_role');

	if (!userId) return null;

	return {
		id: parseInt(userId),
		username,
		role
	};
}

/**
 * Login and set cookies
 */
export function login(cookies, user) {
	cookies.set('admin_user_id', user.id.toString(), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});

	cookies.set('admin_username', user.username, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7
	});

	cookies.set('admin_role', user.role, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7
	});
}

/**
 * Logout and delete cookies
 */
export function logout(cookies) {
	cookies.delete('admin_user_id', { path: '/' });
	cookies.delete('admin_username', { path: '/' });
	cookies.delete('admin_role', { path: '/' });
}

/**
 * Check if user is admin
 */
export function isAdmin(cookies) {
	const role = cookies.get('admin_role');
	return role === 'admin';
}
