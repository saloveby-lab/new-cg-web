import { getNewsBySlug, getAllNews } from '$lib/server/models/news.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	try {
		const article = getNewsBySlug(params.slug);

		if (!article) {
			throw error(404, 'News article not found');
		}

		// Get related news (latest 3 articles, excluding current)
		const allNews = getAllNews({ status: 'published', page: 1, limit: 4 });
		const relatedNews = (allNews.news || [])
			.filter(n => n.slug !== params.slug)
			.slice(0, 3)
			.map(n => ({
				id: n.slug,
				title: n.title,
				image: n.featured_image || '/images/news/default.png'
			}));

		return {
			article: {
				...article,
				category: article.category || 'News',
				author: article.author_name || 'CasinoGame Team',
				readTime: estimateReadTime(article.content),
				date: article.published_at || article.created_at,
				image: article.featured_image || '/images/news/default.png',
				relatedNews
			}
		};
	} catch (err) {
		console.error('Error loading news article:', err);
		throw error(404, 'News article not found');
	}
}

// Helper function to estimate read time
function estimateReadTime(content) {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return `${minutes} min read`;
}
