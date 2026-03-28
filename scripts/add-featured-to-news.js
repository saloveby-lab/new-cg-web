import Database from 'better-sqlite3';
import { join } from 'path';

// Connect to database
const db = new Database(join(process.cwd(), 'data.db'));

console.log('Adding featured column to news table...');

try {
	// Check if column already exists
	const columns = db.prepare("PRAGMA table_info(news)").all();
	const hasFeatured = columns.some(col => col.name === 'featured');

	if (!hasFeatured) {
		// Add featured column (default 0 = not featured)
		db.prepare('ALTER TABLE news ADD COLUMN featured INTEGER DEFAULT 0').run();
		console.log('✓ Featured column added successfully');
	} else {
		console.log('⚠️  Featured column already exists');
	}

	console.log('\n✓ Migration completed successfully');
} catch (error) {
	console.error('✗ Error during migration:', error.message);
} finally {
	db.close();
}
