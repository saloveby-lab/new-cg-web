#!/bin/bash

# Configuration
REMOTE_USER="your_ssh_username"  # แก้ไขเป็น SSH username ของคุณ
REMOTE_HOST="your_server_ip"      # แก้ไขเป็น IP หรือ domain ของ Hostinger
REMOTE_PATH="/data/casinogame-sveltekit"
LOCAL_BUILD_DIR="./build"

echo "🚀 Deploying to Hostinger..."
echo "Target: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
echo ""

# Confirm deployment
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Build project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed!"
echo ""

# Backup existing build on server
echo "💾 Creating backup on server..."
ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_PATH && cp -r build build.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || true"

# Upload build directory
echo "📤 Uploading build files..."
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='data.db' \
  --exclude='*.log' \
  $LOCAL_BUILD_DIR/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/build/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    exit 1
fi

# Upload package.json if changed
echo "📤 Uploading package.json..."
rsync -avz package.json $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

# Upload static files
echo "📤 Uploading static files..."
rsync -avz --delete static/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/static/

# Install/update dependencies and restart
echo "🔄 Updating dependencies and restarting application..."
ssh $REMOTE_USER@$REMOTE_HOST << 'ENDSSH'
cd /data/casinogame-sveltekit
npm install --production
pm2 reload ecosystem.config.cjs --update-env
pm2 save
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment completed successfully!"
    echo ""
    echo "🔍 Checking application status..."
    ssh $REMOTE_USER@$REMOTE_HOST "pm2 status casinogame-sveltekit"
else
    echo "❌ Deployment failed!"
    exit 1
fi
