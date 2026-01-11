CloudShift360 - Hostinger Deployment Guide

Overview

This guide explains how to deploy the CloudShift360 website to Hostinger hosting. The website is built with React, Node.js/Express backend, and MySQL database.




Prerequisites

Before deploying, make sure you have:

1.
Hostinger Account with hosting plan that supports:

•
Node.js applications

•
MySQL databases

•
Custom domain setup



2.
Domain Name (cloudshift360.com or your custom domain)

3.
FTP/SSH Access credentials from Hostinger

4.
Database Credentials (MySQL username, password, host)




Step 1: Build the Application

Run the build command to create production-ready files:

Bash


cd /home/ubuntu/cloudshift360-expanded
pnpm build


This will create:

•
dist/ folder with the compiled backend

•
client/dist/ folder with the compiled frontend




Step 2: Prepare Files for Upload

Create a deployment package with all necessary files:

Bash


# Copy the built files
cp -r dist/* /tmp/cloudshift360-deploy/
cp -r client/dist/* /tmp/cloudshift360-deploy/public/
cp package.json /tmp/cloudshift360-deploy/
cp .env.production /tmp/cloudshift360-deploy/  # Create this file with production env vars





Step 3: Database Setup on Hostinger

1.
Log into Hostinger Control Panel

2.
Go to Databases section

3.
Create New Database:

•
Database Name: cloudshift360_db

•
Username: cloudshift360_user

•
Password: (strong password)

•
Host: (usually localhost or provided by Hostinger)



4.
Import Database Schema:

•
Export your local database schema using:

Bash


mysqldump -u root -p cloudshift360_db > schema.sql




•
Import to Hostinger using phpMyAdmin or command line






Step 4: Upload Files to Hostinger

Option A: Using FTP (Easier)

1.
Download FTP Client (FileZilla, WinSCP, etc.)

2.
Connect with Hostinger FTP credentials:

•
Host: (provided by Hostinger)

•
Username: (your FTP username)

•
Password: (your FTP password)

•
Port: 21



3.
Upload files:

•
Upload dist/ contents to /public_html/api/

•
Upload client/dist/ contents to /public_html/

•
Upload package.json to /public_html/



Option B: Using SSH (Advanced)

Bash


# Connect to Hostinger via SSH
ssh your-username@your-hostinger-domain.com

# Navigate to public_html
cd public_html

# Upload files using SCP
scp -r /home/ubuntu/cloudshift360-expanded/dist/* your-username@your-hostinger-domain.com:~/public_html/api/
scp -r /home/ubuntu/cloudshift360-expanded/client/dist/* your-username@your-hostinger-domain.com:~/public_html/





Step 5: Environment Variables

Create .env file in the root directory on Hostinger with:

Plain Text


# Database
DATABASE_URL=mysql://cloudshift360_user:password@localhost/cloudshift360_db

# JWT & Auth
JWT_SECRET=your-secure-random-secret-key-here

# Manus OAuth (keep your existing values)
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# Email Configuration
OWNER_NAME=Michael
OWNER_EMAIL=michael@cloudshift360.com

# Frontend URLs
VITE_APP_TITLE=CloudShift360
VITE_APP_LOGO=/logo.svg

# API URLs (update these for production )
VITE_FRONTEND_FORGE_API_URL=https://your-hostinger-domain.com/api
BUILT_IN_FORGE_API_URL=https://your-hostinger-domain.com/api





Step 6: Configure Node.js on Hostinger

1.
Access Hostinger Control Panel

2.
Go to Node.js section

3.
Create New Node.js Application:

•
Application Name: cloudshift360

•
Node.js Version: 20.x or higher

•
Application Root: /public_html/

•
Application URL: your-domain.com

•
Startup File: dist/index.js



4.
Set Environment Variables in Hostinger Node.js settings




Step 7: Configure Domain & DNS

1.
Point Domain to Hostinger:

•
Update your domain registrar's nameservers to Hostinger's nameservers

•
Or update A records to point to Hostinger's IP



2.
SSL Certificate:

•
Hostinger usually provides free SSL (Let's Encrypt )

•
Enable HTTPS in Hostinger Control Panel

•
Update all URLs to use https://



3.
DNS Records (if needed ):

Plain Text


A Record: @ -> Hostinger IP
A Record: www -> Hostinger IP
CNAME: api -> your-domain.com







Step 8: Database Migrations

Run migrations on the production database:

Bash


# Connect to Hostinger via SSH
ssh your-username@your-hostinger-domain.com

# Navigate to application root
cd public_html

# Run migrations
npm run db:push





Step 9: Start the Application

1.
Via Hostinger Control Panel:

•
Go to Node.js Applications

•
Click "Start" on your application



2.
Or via SSH:

Bash


npm start







Step 10: Verify Deployment

1.
Check if website loads:

•
Visit https://your-domain.com

•
Check if homepage displays correctly



2.
Test contact form:

•
Submit a test inquiry

•
Verify email notification is sent to michael@cloudshift360.com



3.
Test admin dashboard:

•
Visit https://your-domain.com/admin/dashboard

•
Verify you can log in and see inquiries



4.
Check console for errors:

•
Hostinger Control Panel → Logs

•
Review application logs for any issues






Troubleshooting

Issue: "Cannot find module" errors

Solution:

Bash


npm install
npm run build


Issue: Database connection fails

Solution:

•
Verify DATABASE_URL is correct

•
Check database credentials in Hostinger

•
Ensure database user has proper permissions

Issue: Email notifications not sending

Solution:

•
Verify OWNER_EMAIL is set correctly

•
Check Hostinger email settings

•
Review application logs for email errors

Issue: Static files (CSS, JS ) not loading

Solution:

•
Ensure client/dist/ is uploaded to /public_html/

•
Check file permissions (should be 644)

•
Verify paths in HTML are correct




Performance Optimization

1.
Enable Gzip Compression:

Bash


# In Hostinger Control Panel → Performance




2.
Set Cache Headers:

•
Static files: 1 year

•
API responses: No cache



3.
Monitor Performance:

•
Use Hostinger's monitoring tools

•
Check application logs regularly






Maintenance

Regular Backups

Bash


# Backup database
mysqldump -u cloudshift360_user -p cloudshift360_db > backup_$(date +%Y%m%d).sql

# Backup application files
tar -czf cloudshift360_backup_$(date +%Y%m%d).tar.gz /public_html/


Update Dependencies

Bash


npm update
npm audit fix
npm run build


Monitor Logs

•
Check Hostinger error logs regularly

•
Review application performance metrics

•
Monitor database usage




Support

For Hostinger-specific issues:

•
Contact Hostinger Support: https://www.hostinger.com/support

•
Check Hostinger Documentation: https://www.hostinger.com/help

For application issues:

•
Review application logs in Hostinger Control Panel

•
Check Node.js console output

•
Verify environment variables are set correctly




Next Steps

After successful deployment:

1.
Set up monitoring for uptime and performance

2.
Configure email alerts for errors

3.
Set up automated backups for database and files

4.
Monitor inquiry submissions and respond promptly

5.
Update content regularly to maintain SEO rankings




Last Updated: January 2026 Version: 1.0

