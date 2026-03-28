import { getAllNews } from '$lib/server/models/news.js';

export function load() {
	try {
		// Get all published news from database
		const result = getAllNews({ status: 'published', page: 1, limit: 100 });

		return {
			news: result.news || [],
			pagination: result.pagination || {}
		};
	} catch (error) {
		console.error('Error loading news:', error);
		return {
			news: [],
			pagination: {}
		};
	}
}
