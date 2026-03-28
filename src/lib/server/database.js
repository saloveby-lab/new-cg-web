import Database from 'better-sqlite3';
import { join } from 'path';
import crypto from 'crypto';

// Create or connect to database
const db = new Database(join(process.cwd(), 'data.db'), { verbose: console.log });

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Hash password helper
function hashPassword(password) {
	return crypto.createHash('sha256').update(password).digest('hex');
}

// Create tables
function initializeDatabase() {
	// Users table
	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT UNIQUE NOT NULL,
			email TEXT UNIQUE NOT NULL,
			password_hash TEXT NOT NULL,
			role TEXT DEFAULT 'user',
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);

	// News table
	db.exec(`
		CREATE TABLE IF NOT EXISTS news (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			slug TEXT UNIQUE NOT NULL,
			content TEXT NOT NULL,
			excerpt TEXT,
			featured_image TEXT,
			author_id INTEGER,
			status TEXT DEFAULT 'draft',
			published_at DATETIME,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (author_id) REFERENCES users(id)
		)
	`);

	// Events table
	db.exec(`
		CREATE TABLE IF NOT EXISTS events (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			slug TEXT UNIQUE NOT NULL,
			description TEXT NOT NULL,
			location TEXT,
			event_date DATETIME NOT NULL,
			end_date DATETIME,
			featured_image TEXT,
			status TEXT DEFAULT 'upcoming',
			max_participants INTEGER,
			author_id INTEGER,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (author_id) REFERENCES users(id)
		)
	`);

	// Create indexes for faster queries
	db.exec(`
		CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
		CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
		CREATE INDEX IF NOT EXISTS idx_news_author ON news(author_id);
		CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
		CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
		CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
	`);

	// Create default admin user if not exists
	const checkAdmin = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?');
	const { count } = checkAdmin.get('admin');

	if (count === 0) {
		const insertAdmin = db.prepare(`
			INSERT INTO users (username, email, password_hash, role)
			VALUES (?, ?, ?, ?)
		`);

		// Default credentials: admin / admin123
		insertAdmin.run('admin', 'admin@casinogame.com', hashPassword('admin123'), 'admin');
		console.log('✓ Default admin user created');
		console.log('  Username: admin');
		console.log('  Password: admin123');
	}

	console.log('Database initialized successfully');
}

// Initialize on startup
initializeDatabase();

export default db;
