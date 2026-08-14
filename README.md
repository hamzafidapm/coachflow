<h1 align="center">🎯 CoachFlow</h1>
<p align="center">A modern SaaS platform for coaches to manage clients, bookings, and subscriptions — built end-to-end with AI-assisted development.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
</p>

<!-- 📸 Add a screenshot or GIF of the dashboard here -->
<!-- ![CoachFlow Screenshot](./screenshot.png) -->

---

## 🚀 Live Demo
🔗 [coursesflow.vercel.app](https://coursesflow.vercel.app)

---

## ✨ Features

- 🔐 Secure authentication with NextAuth.js
- 💳 Subscription billing powered by Stripe
- 📅 Client booking and scheduling system
- 📊 Coach dashboard for managing sessions and clients
- 🎨 Smooth, animated UI built with Framer Motion
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Database ORM | Prisma |
| Database | Supabase (PostgreSQL) |
| Auth | NextAuth.js |
| Payments | Stripe |
| Deployment | Vercel |

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/hamzafidapm/coachflow.git
cd coachflow

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase, Stripe, and NextAuth credentials

# Run Prisma migrations
npx prisma generate
npx prisma migrate dev

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

---

## 🔑 Environment Variables

```env
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## 📄 License

This project is for portfolio purposes.

---

<p align="center">Built by <a href="https://instagram.com/vibewith.hamzah">Hamza Fida</a> — Full-stack developer</p>
