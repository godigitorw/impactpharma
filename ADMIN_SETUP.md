# Impact Pharma Admin Panel Setup Guide

## Overview
The admin panel provides a secure management interface for the Impact Pharma website, including blog posts, contact messages, and quote requests.

## Access Information

### Admin Login URL
```
http://localhost:3000/admin/login
```

### Default Credentials
- **Email:** admin@impactpharma.rw
- **Password:** admin123

⚠️ **IMPORTANT:** Change these credentials immediately after first login in a production environment!

## Features

### 1. Dashboard
- Overview of site statistics
- Quick action buttons
- Recent activity feed

### 2. Blog Posts Management
- View all published blog posts
- List of 6 current articles
- Links to view posts on the live website
- Edit and delete capabilities (UI ready, needs database integration)

### 3. Contact Messages
- View contact form submissions
- Empty state ready for when database is connected

### 4. Quote Requests
- View quote request submissions
- Empty state ready for when database is connected

## Current Status

### ✅ Completed Features
- Authentication system with NextAuth.js
- Protected admin routes with middleware
- Responsive admin dashboard layout
- Blog posts listing page
- Contact messages page (ready for data)
- Quote requests page (ready for data)
- Session management
- Secure login/logout functionality

### 🔄 Next Steps for Full Functionality

To enable full CRUD operations and form submissions, you need to:

#### 1. Set Up a Database
Choose one of these options:
- **PostgreSQL** (Recommended for production)
- **MongoDB** (Good for flexibility)
- **MySQL** (Traditional option)
- **Supabase** (Easiest to set up)

#### 2. Create Database Schema
Example tables needed:
```sql
-- Blog Posts
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  excerpt TEXT,
  content JSONB,
  image VARCHAR(255),
  category VARCHAR(100),
  author VARCHAR(100),
  date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  company VARCHAR(100),
  subject VARCHAR(200),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quote Requests
CREATE TABLE quote_requests (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  company VARCHAR(100),
  position VARCHAR(100),
  organization_type VARCHAR(50),
  location VARCHAR(200),
  product_category VARCHAR(100),
  product_details TEXT,
  quantity VARCHAR(100),
  delivery_date DATE,
  special_requirements TEXT,
  agreed_to_terms BOOLEAN,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. Install Database Client
```bash
# For PostgreSQL
npm install pg

# For MongoDB
npm install mongodb mongoose

# For Prisma ORM (Recommended)
npm install @prisma/client
npx prisma init
```

#### 4. Create API Routes

Create these API endpoints:

**Blog Posts:**
- `GET /api/posts` - List all posts
- `GET /api/posts/[slug]` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

**Contact Messages:**
- `POST /api/contact` - Submit contact form
- `GET /api/admin/contacts` - Get all contacts
- `PATCH /api/admin/contacts/[id]` - Mark as read

**Quote Requests:**
- `POST /api/quotes` - Submit quote request
- `GET /api/admin/quotes` - Get all quotes
- `PATCH /api/admin/quotes/[id]` - Update quote status

#### 5. Update Forms
Update the contact and quote request forms to send data to your API endpoints instead of just console logging.

## Environment Variables

The `.env.local` file contains:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# Add database connection
DATABASE_URL=postgresql://username:password@localhost:5432/impactpharma
```

## Security Recommendations

1. **Change Default Password**
   - Update the credentials in `/app/api/auth/[...nextauth]/route.ts`
   - Use bcrypt to hash passwords properly

2. **Use Strong Secret Key**
   - Generate a secure NEXTAUTH_SECRET
   - Run: `openssl rand -base64 32`

3. **Enable HTTPS**
   - Use HTTPS in production
   - Update NEXTAUTH_URL to https://yourdomain.com

4. **Database Security**
   - Use environment variables for database credentials
   - Never commit database passwords to git
   - Use connection pooling for better performance

5. **Rate Limiting**
   - Add rate limiting to API routes
   - Protect against brute force attacks

## File Structure

```
app/
├── admin/
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── dashboard/
│       ├── layout.tsx         # Admin layout with sidebar
│       ├── page.tsx           # Dashboard home
│       ├── posts/
│       │   └── page.tsx       # Blog posts management
│       ├── contacts/
│       │   └── page.tsx       # Contact messages
│       └── quotes/
│           └── page.tsx       # Quote requests
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts       # NextAuth configuration
middleware.ts                   # Route protection
.env.local                     # Environment variables
```

## Testing the Admin Panel

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/admin/login

3. Login with default credentials

4. Explore the dashboard and various management pages

## Support

For issues or questions:
- Check the Next.js documentation: https://nextjs.org/docs
- NextAuth.js docs: https://next-auth.js.org
- Contact the development team

---

**Version:** 1.0.0
**Last Updated:** November 19, 2025
