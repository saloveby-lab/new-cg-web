#!/bin/bash

# Deployment script for Hostinger
echo "🚀 Starting deployment to Hostinger..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Create deployment directory structure
echo "📁 Creating deployment structure..."
mkdir -p deploy
mkdir -p deploy/build
mkdir -p deploy/scripts
mkdir -p deploy/static

# Copy necessary files
echo "📋 Copying files..."
cp -r build/* deploy/build/
cp -r static/* deploy/static/ 2>/dev/null || true
cp package.json deploy/
cp ecosystem.config.cjs deploy/
cp -r scripts/*.js deploy/scripts/ 2>/dev/null || true
cp .htaccess deploy/ 2>/dev/null || true

# Create production package.json (without devDependencies)
echo "📝 Creating production package.json..."
cat > deploy/package.json << 'EOF'
{
  "name": "casinogame-sveltekit",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node build/index.js",
    "pm2:start": "pm2 start ecosystem.config.cjs",
    "pm2:stop": "pm2 stop casinogame-sveltekit",
    "pm2:restart": "pm2 restart casinogame-sveltekit"
  },
  "dependencies": {
    "better-sqlite3": "^12.8.0"
  }
}
EOF

# Create deployment instructions
cat > deploy/DEPLOY_INSTRUCTIONS.md << 'EOF'
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
EOF

echo "✅ Deployment package created in 'deploy' directory"
echo ""
echo "📦 Files ready for upload:"
echo "   - build/ (compiled application)"
echo "   - static/ (static assets)"
echo "   - package.json"
echo "   - ecosystem.config.cjs"
echo "   - .htaccess"
echo ""
echo "📖 See deploy/DEPLOY_INSTRUCTIONS.md for deployment steps"
echo ""
echo "🎉 Deployment preparation complete!"
