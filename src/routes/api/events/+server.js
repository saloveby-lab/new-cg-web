import { json } from '@sveltejs/kit';
import * as eventsModel from '$lib/server/models/events.js';

/**
 * GET /api/events - ดึง events ทั้งหมด
 */
export async function GET({ url }) {
	const page = parseInt(url.searchParams.get('page')) || 1;
	const limit = parseInt(url.searchParams.get('limit')) || 10;
	const status = url.searchParams.get('status');
	const author_id = url.searchParams.get('author_id');
	const search = url.searchParams.get('search');
	const filter = url.searchParams.get('filter'); // upcoming, past

	try {
		let result;

		if (search) {
			result = eventsModel.searchEvents(search, page, limit);
		} else if (filter === 'upcoming') {
			result = eventsModel.getUpcomingEvents(page, limit);
		} else if (filter === 'past') {
			result = eventsModel.getPastEvents(page, limit);
		} else {
			result = eventsModel.getAllEvents({
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
 * POST /api/events - สร้าง event ใหม่
 */
export async function POST({ request }) {
	try {
		const data = await request.json();
		const {
			title,
			description,
			location,
			event_date,
			end_date,
			featured_image,
			status,
			max_participants,
			author_id
		} = data;

		// Validate required fields
		if (!title || !description || !event_date || !author_id) {
			return json(
				{ error: 'Title, description, event_date, and author_id are required' },
				{ status: 400 }
			);
		}

		const result = eventsModel.createEvent({
			title,
			description,
			location,
			event_date,
			end_date,
			featured_image,
			status,
			max_participants,
			author_id
		});

		if (!result.success) {
			return json({ error: result.error }, { status: 400 });
		}

		return json(result, { status: 201 });
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
