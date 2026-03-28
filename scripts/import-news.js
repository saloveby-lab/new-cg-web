import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';
import crypto from 'crypto';

// Create slug from title
function createSlug(title) {
	return title
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/--+/g, '-')
		.trim();
}

// Connect to database
const db = new Database(join(process.cwd(), 'data.db'));

// Read news.json
const newsData = JSON.parse(readFileSync(join(process.cwd(), 'news.json'), 'utf-8'));

// Get or create default admin user
const adminUser = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
const authorId = adminUser ? adminUser.id : 1;

console.log('Starting news import...');
console.log(`Found ${newsData.news.length} news articles to import`);

// Prepare insert statement
const insertStmt = db.prepare(`
	INSERT INTO news (title, slug, content, excerpt, featured_image, author_id, status, published_at, created_at)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Import each news article
let imported = 0;
let skipped = 0;

for (const article of newsData.news) {
	try {
		const slug = createSlug(article.listTitle);
		const title = article.listTitle;
		const content = article.content;
		const excerpt = article.contentTitle;
		const featuredImage = article.coverImage;
		const publishedAt = article.datePublished;
		const createdAt = article.datePublished;

		// Check if slug already exists
		const existing = db.prepare('SELECT id FROM news WHERE slug = ?').get(slug);

		if (existing) {
			console.log(`⚠️  Skipped: "${title}" (slug already exists)`);
			skipped++;
			continue;
		}

		insertStmt.run(
			title,
			slug,
			content,
			excerpt,
			featuredImage,
			authorId,
			'published',
			publishedAt,
			createdAt
		);

		console.log(`✓ Imported: "${title}"`);
		imported++;
	} catch (error) {
		console.error(`✗ Error importing article ${article.id}:`, error.message);
		skipped++;
	}
}

console.log('\n=== Import Summary ===');
console.log(`Total articles: ${newsData.news.length}`);
console.log(`Imported: ${imported}`);
console.log(`Skipped: ${skipped}`);
console.log('=====================\n');

db.close();
