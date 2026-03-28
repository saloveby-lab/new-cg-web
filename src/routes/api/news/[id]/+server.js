import { json } from '@sveltejs/kit';
import * as newsModel from '$lib/server/models/news.js';

/**
 * GET /api/news/[id] - ดึง news ตาม ID
 */
export async function GET({ params }) {
	try {
		const news = newsModel.getNewsById(params.id);

		if (!news) {
			return json({ error: 'News not found' }, { status: 404 });
		}

		return json(news);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * PUT /api/news/[id] - Update news
 */
export async function PUT({ params, request }) {
	try {
		const data = await request.json();
		const { title, content, excerpt, featured_image, status, category, featured } = data;

		const result = newsModel.updateNews(params.id, {
			title,
			content,
			excerpt,
			featured_image,
			status,
			category,
			featured
		});

		if (!result.success) {
			return json({ error: result.error }, { status: 400 });
		}

		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * DELETE /api/news/[id] - ลบ news
 */
export async function DELETE({ params }) {
	try {
		const result = newsModel.deleteNews(params.id);

		if (!result.success) {
			return json({ error: 'News not found' }, { status: 404 });
		}

		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
