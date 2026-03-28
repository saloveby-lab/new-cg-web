import { json } from '@sveltejs/kit';
import * as newsModel from '$lib/server/models/news.js';

/**
 * GET /api/news - ดึง news ทั้งหมด
 */
export async function GET({ url }) {
	const page = parseInt(url.searchParams.get('page')) || 1;
	const limit = parseInt(url.searchParams.get('limit')) || 10;
	const status = url.searchParams.get('status');
	const author_id = url.searchParams.get('author_id');
	const search = url.searchParams.get('search');

	try {
		let result;

		if (search) {
			result = newsModel.searchNews(search, page, limit);
		} else {
			result = newsModel.getAllNews({
				page,
				limit,
				status: status || null,
				author_id: author_id || null
			});
		}

		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * POST /api/news - Create new news
 */
export async function POST({ request }) {
	try {
		const data = await request.json();
		const { title, content, excerpt, featured_image, author_id, status, category, featured } = data;

		// Validate required fields
		if (!title || !content || !author_id) {
			return json({ error: 'Title, content, and author_id are required' }, { status: 400 });
		}

		const result = newsModel.createNews({
			title,
			content,
			excerpt,
			featured_image,
			author_id,
			status,
			category,
			featured
		});

		if (!result.success) {
			return json({ error: result.error }, { status: 400 });
		}

		return json(result, { status: 201 });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
