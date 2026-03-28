# CasinoGame SvelteKit - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- PM2 installed globally: `npm install -g pm2`
- Access to server with sudo/root privileges

## Server Setup

### 1. Install Node.js and PM2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 to start on system boot
pm2 startup
# Run the command that PM2 outputs
```

### 2. Clone/Upload Project

```bash
# Clone repository (if using git)
git clone <your-repo-url> casinogame-sveltekit
cd casinogame-sveltekit

# Or upload files via SCP/FTP to your server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Build for Production

```bash
npm run build
```

This will create a `build` directory with your production-ready application.

## PM2 Deployment

### Start Application

```bash
# Start with ecosystem config (recommended)
pm2 start ecosystem.config.cjs

# Or start with custom port
PORT=3000 pm2 start build/index.js --name casinogame

# Start in cluster mode (multiple instances)
pm2 start ecosystem.config.cjs
```

### PM2 Management Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs casinogame-sveltekit

# Monitor resources
pm2 monit

# Restart application
pm2 restart casinogame-sveltekit

# Stop application
pm2 stop casinogame-sveltekit

# Delete from PM2
pm2 delete casinogame-sveltekit

# Save PM2 process list
pm2 save

# Reload (zero-downtime restart)
pm2 reload casinogame-sveltekit
```

## Port Configuration

### Configure Firewall (UFW)

```bash
# Allow SSH (if not already allowed)
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow custom port (if using non-standard port)
sudo ufw allow 3000/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### Using Nginx as Reverse Proxy (Recommended)

Install Nginx:

```bash
sudo apt install nginx -y
```

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/casinogame
```

Add this configuration:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/casinogame /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate (HTTPS) with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
# Test renewal
sudo certbot renew --dry-run
```

## Environment Variables

Create `.env` file in project root:

```bash
nano .env
```

Add environment variables:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
# Add any other environment variables your app needs
```

Update `ecosystem.config.cjs` to use .env file:

```javascript
module.exports = {
  apps: [{
    name: 'casinogame-sveltekit',
    script: './build/index.js',
    env_file: '.env',
    // ... rest of config
  }]
};
```

## Deployment Workflow

### Initial Deployment

```bash
# 1. Build the application
npm run build

# 2. Start with PM2
pm2 start ecosystem.config.cjs

# 3. Save PM2 configuration
pm2 save
```

### Update Deployment

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install new dependencies (if any)
npm install

# 3. Build application
npm run build

# 4. Reload PM2 (zero-downtime)
pm2 reload casinogame-sveltekit

# Or restart if needed
pm2 restart casinogame-sveltekit
```

## Monitoring and Logs

### View Logs

```bash
# All logs
pm2 logs

# Specific app logs
pm2 logs casinogame-sveltekit

# Only error logs
pm2 logs casinogame-sveltekit --err

# Only output logs
pm2 logs casinogame-sveltekit --out

# Clear logs
pm2 flush
```

### Monitor Resources

```bash
# Real-time monitoring
pm2 monit

# Process info
pm2 show casinogame-sveltekit

# Get process ID
pm2 id casinogame-sveltekit
```

## Performance Optimization

### Enable Compression in Nginx

Add to Nginx configuration:

```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
```

### PM2 Cluster Mode

The `ecosystem.config.cjs` is already configured for cluster mode with `instances: 'max'`, which will use all available CPU cores.

## Troubleshooting

### Check if port is in use

```bash
sudo lsof -i :3000
# or
sudo netstat -tulpn | grep 3000
```

### Kill process on port

```bash
sudo kill -9 $(sudo lsof -t -i:3000)
```

### PM2 not starting on boot

```bash
# Re-run startup command
pm2 startup
# Follow the output instructions

# Save current PM2 list
pm2 save
```

### Application crashes

```bash
# Check logs
pm2 logs casinogame-sveltekit --err

# Check PM2 status
pm2 status

# Restart application
pm2 restart casinogame-sveltekit
```

## Security Recommendations

1. **Keep system updated**: `sudo apt update && sudo apt upgrade`
2. **Use firewall**: Configure UFW as shown above
3. **Use HTTPS**: Always use SSL certificates
4. **Environment variables**: Never commit `.env` to version control
5. **Regular backups**: Backup your data regularly
6. **Monitor logs**: Check PM2 logs regularly for errors
7. **Update dependencies**: `npm audit fix` to fix vulnerabilities

## Quick Command Reference

```bash
# Build
npm run build

# PM2 Start
pm2 start ecosystem.config.cjs

# PM2 Status
pm2 status

# PM2 Logs
pm2 logs

# PM2 Restart
pm2 restart casinogame-sveltekit

# PM2 Reload (zero-downtime)
pm2 reload casinogame-sveltekit

# PM2 Stop
pm2 stop casinogame-sveltekit

# PM2 Save
pm2 save

# Nginx Test
sudo nginx -t

# Nginx Restart
sudo systemctl restart nginx
```

## Port Configuration Summary

- **Application Port**: 3000 (configured in ecosystem.config.cjs)
- **Nginx Port**: 80 (HTTP) and 443 (HTTPS)
- **Firewall**: Allow ports 80, 443, and optionally 3000 if accessing directly

The application will be accessible at:
- Direct access: `http://your-server-ip:3000`
- Through Nginx: `http://yourdomain.com` or `https://yourdomain.com`
