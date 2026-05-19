# Mazaya FM Admin

Standalone Next.js admin console for leads, tickets, work orders, vendors, live chats, reports, and briefings.

## Run Locally

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open:

```text
http://localhost:3001
```

Default login:

```text
Username: admin
Password: Admin@Mazaya2025
```

## Backend URL

Update line 1 in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Use your deployed backend URL in production.
