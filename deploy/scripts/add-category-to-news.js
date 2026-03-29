import Database from 'better-sqlite3';
import { join } from 'path';

// Connect to database
const db = new Database(join(process.cwd(), 'data.db'));

console.log('Adding category column to news table...');

try {
	// Check if column already exists
	const columns = db.prepare("PRAGMA table_info(news)").all();
	const hasCategory = columns.some(col => col.name === 'category');

	if (!hasCategory) {
		// Add category column
		db.prepare('ALTER TABLE news ADD COLUMN category TEXT DEFAULT "News"').run();
		console.log('✓ Category column added successfully');

		// Set default category for existing news
		const updateStmt = db.prepare('UPDATE news SET category = ? WHERE category IS NULL');
		const result = updateStmt.run('Company News');
		console.log(`✓ Updated ${result.changes} existing records with default category`);
	} else {
		console.log('⚠️  Category column already exists');
	}

	console.log('\n✓ Migration completed successfully');
} catch (error) {
	console.error('✗ Error during migration:', error.message);
} finally {
	db.close();
}
