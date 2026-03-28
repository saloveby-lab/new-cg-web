module.exports = {
  apps: [{
    name: 'casinogame-sveltekit',
    script: './build/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    // PM2 Options
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

    // Auto restart on crash
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',

    // Kill timeout
    kill_timeout: 5000
  }]
};
