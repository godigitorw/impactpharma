# Impact Pharma

Your Trusted Partner in Medical Equipment Distribution

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
impact-pharma/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility functions and Prisma client
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
└── ...config files
```

## Database

To update the database schema:

1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name your_migration_name`
3. Prisma Client will be automatically regenerated

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
