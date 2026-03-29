# Deployment Instructions for Hostinger

## Prerequisites
- Node.js 18+ installed on server
- PM2 installed globally: `npm install -g pm2`
- SSH access to Hostinger server

## Deployment Steps

### 1. Upload Files
Upload all files in this directory to your Hostinger public_html or subdomain folder.

### 2. Install Dependencies
```bash
cd /path/to/your/project
npm install --production
```

### 3. Initialize Database
```bash
# Database will be auto-created on first run
# Or manually initialize:
node scripts/import-news.js  # If you have news.json
```

### 4. Start Application with PM2
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### 5. Configure Reverse Proxy
Make sure your .htaccess is configured to proxy requests to Node.js.

## Environment Variables (Optional)
Create a `.env` file if needed:
```
PORT=3000
HOST=0.0.0.0
```

## Useful Commands
- Check status: `pm2 status`
- View logs: `pm2 logs casinogame-sveltekit`
- Restart: `pm2 restart casinogame-sveltekit`
- Stop: `pm2 stop casinogame-sveltekit`

## Database Location
The SQLite database (data.db) will be created automatically in the project root directory.

## Important Files
- `build/index.js` - Main application entry point
- `ecosystem.config.cjs` - PM2 configuration
- `.htaccess` - Apache reverse proxy configuration
- `data.db` - SQLite database (auto-created)

## Default Admin Credentials
- Username: admin
- Password: admin123

⚠️ **Remember to change the admin password after first login!**
