import { json } from '@sveltejs/kit';
import * as eventsModel from '$lib/server/models/events.js';

/**
 * GET /api/events/[id] - ดึง event ตาม ID
 */
export async function GET({ params }) {
	try {
		const event = eventsModel.getEventById(params.id);

		if (!event) {
			return json({ error: 'Event not found' }, { status: 404 });
		}

		return json(event);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}

/**
 * PUT /api/events/[id] - อัพเดท event
 */
export async function PUT({ params, request }) {
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
			max_participants
		} = data;

		const result = eventsModel.updateEvent(params.id, {
			title,
			description,
			location,
			event_date,
			end_date,
			featured_image,
			status,
			max_participants
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
 * DELETE /api/events/[id] - ลบ event
 */
export async function DELETE({ params }) {
	try {
		const result = eventsModel.deleteEvent(params.id);

		if (!result.success) {
			return json({ error: 'Event not found' }, { status: 404 });
		}

		return json(result);
	} catch (error) {
		return json({ error: error.message }, { status: 500 });
	}
}
