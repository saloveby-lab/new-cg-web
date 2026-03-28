import { json } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/models/users.js';
import { login } from '$lib/server/auth.js';

export async function POST({ request, cookies }) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		const result = authenticateUser(username, password);

		if (!result.success) {
			return json({ error: 'Invalid username or password' }, { status: 401 });
		}

		// Set cookies
		login(cookies, result.user);

		return json({ success: true, user: result.user });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
