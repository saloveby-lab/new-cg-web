# 🚀 Deployment Guide สำหรับ Hostinger

## ข้อมูล Server
- **Remote Path**: `/data/casinogame-sveltekit`
- **Process Manager**: PM2
- **Database**: SQLite (data.db)

---

## วิธีการ Deploy

### 1. แก้ไขไฟล์ `deploy-to-hostinger.sh`

เปิดไฟล์และแก้ไข configuration ตามข้อมูล server ของคุณ:

```bash
REMOTE_USER="your_ssh_username"    # SSH username (เช่น u123456789)
REMOTE_HOST="your_server_ip"       # IP หรือ domain (เช่น 1.2.3.4 หรือ yourdomain.com)
```

### 2. ทำให้ script สามารถ execute ได้

```bash
chmod +x deploy-to-hostinger.sh
```

### 3. Run deployment script

```bash
./deploy-to-hostinger.sh
```

Script จะทำงานตามลำดับดังนี้:
1. ✅ Build โปรเจค
2. 💾 Backup build เดิมบน server
3. 📤 Upload build files ไปยัง server
4. 📤 Upload package.json และ static files
5. 🔄 Install dependencies และ reload PM2

---

## การ Deploy แบบ Manual

### ขั้นตอนที่ 1: Build โปรเจค

```bash
npm run build
```

### ขั้นตอนที่ 2: Upload ไฟล์ไปยัง Server

**ใช้ rsync (แนะนำ):**
```bash
rsync -avz --exclude='node_modules' --exclude='data.db' \
  ./build/ user@host:/data/casinogame-sveltekit/build/
```

**หรือใช้ scp:**
```bash
scp -r ./build/* user@host:/data/casinogame-sveltekit/build/
```

### ขั้นตอนที่ 3: SSH เข้า Server และ Restart

```bash
ssh user@host
cd /data/casinogame-sveltekit
npm install --production  # ถ้ามี dependencies เพิ่ม
pm2 reload ecosystem.config.cjs
```

---

## PM2 Commands ที่มีประโยชน์

### ดูสถานะ Application
```bash
pm2 status
pm2 list
```

### ดู Logs
```bash
pm2 logs casinogame-sveltekit
pm2 logs casinogame-sveltekit --lines 100
pm2 logs casinogame-sveltekit --err  # เฉพาะ errors
```

### Restart/Reload Application
```bash
pm2 restart casinogame-sveltekit  # Restart (มี downtime)
pm2 reload casinogame-sveltekit   # Reload (zero-downtime)
```

### Stop/Start Application
```bash
pm2 stop casinogame-sveltekit
pm2 start casinogame-sveltekit
```

### Monitor Resources
```bash
pm2 monit
```

### บันทึก PM2 configuration
```bash
pm2 save
```

---

## การอัพเดท Database Schema

ถ้ามีการเปลี่ยนแปลง database schema (เช่น เพิ่ม column):

### SSH เข้า server แล้วรัน migration script:

```bash
cd /data/casinogame-sveltekit
node scripts/add-category-to-news.js
node scripts/add-featured-to-news.js
```

---

## ตรวจสอบ Application

### 1. ตรวจสอบว่า PM2 running
```bash
pm2 status
```

### 2. ตรวจสอบ Logs
```bash
pm2 logs casinogame-sveltekit --lines 50
```

### 3. ทดสอบผ่าน Browser
```
https://yourdomain.com
https://yourdomain.com/admin
```

### 4. ตรวจสอบ Database
```bash
cd /data/casinogame-sveltekit
sqlite3 data.db
sqlite> .tables
sqlite> SELECT COUNT(*) FROM news;
sqlite> .quit
```

---

## Troubleshooting

### ปัญหา: Application ไม่ start
```bash
# ดู logs เพื่อหาสาเหตุ
pm2 logs casinogame-sveltekit --err

# ลอง restart
pm2 delete casinogame-sveltekit
pm2 start ecosystem.config.cjs
```

### ปัญหา: Database locked
```bash
# หยุด application ก่อน
pm2 stop casinogame-sveltekit

# รอสักครู่แล้ว start ใหม่
pm2 start casinogame-sveltekit
```

### ปัญหา: Permission denied
```bash
# ตรวจสอบ ownership ของไฟล์
ls -la /data/casinogame-sveltekit

# แก้ไข ownership (ถ้าจำเป็น)
sudo chown -R your_user:your_group /data/casinogame-sveltekit
```

### ปัญหา: Port already in use
```bash
# ตรวจสอบว่า port ถูกใช้งานหรือไม่
lsof -i :3000

# Kill process ที่ใช้ port
kill -9 <PID>

# หรือเปลี่ยน port ใน ecosystem.config.cjs
```

---

## Rollback (กรณีมีปัญหา)

```bash
# SSH เข้า server
ssh user@host
cd /data/casinogame-sveltekit

# หา backup ที่ต้องการ restore
ls -la | grep build.backup

# Restore backup
rm -rf build
mv build.backup.YYYYMMDD_HHMMSS build

# Restart application
pm2 reload casinogame-sveltekit
```

---

## Security Checklist ก่อน Deploy

- [ ] เปลี่ยน admin password จาก default (admin/admin123)
- [ ] ตรวจสอบ `.env` file (ถ้ามี) ไม่ได้ commit ขึ้น Git
- [ ] ตรวจสอบ HTTPS configuration
- [ ] Backup database ก่อน deploy ทุกครั้ง
- [ ] ทดสอบบน staging environment ก่อน (ถ้ามี)

---

## Important Notes

⚠️ **อย่าลืม:**
1. Backup database ก่อน deploy: `cp data.db data.db.backup`
2. ไฟล์ `data.db` จะไม่ถูก overwrite เมื่อ deploy
3. Static files ใน `/static` จะถูก sync ทั้งหมด
4. PM2 จะทำ zero-downtime reload โดยอัตโนมัติ

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `./deploy-to-hostinger.sh` | Deploy แบบอัตโนมัติ |
| `pm2 status` | ดูสถานะ |
| `pm2 logs` | ดู logs |
| `pm2 reload ecosystem.config.cjs` | Reload application |
| `pm2 restart casinogame-sveltekit` | Restart application |

---

## ติดต่อ Support

หากมีปัญหาในการ deploy สามารถตรวจสอบได้จาก:
- PM2 logs: `pm2 logs casinogame-sveltekit`
- Application logs: `/data/casinogame-sveltekit/*.log`
- System logs: `/var/log/messages` หรือ `/var/log/syslog`
