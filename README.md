# S2 - Chat Application

This is a real-time chat application built with [Next.js](https://nextjs.org/), [NextAuth.js](https://next-auth.js.org/), and [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

## Features

- User authentication with NextAuth.js
- Real-time chat with WebSockets
- Modern UI built with React and Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [ws](https://www.npmjs.com/package/ws) - WebSocket library for Node.js

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/s2.git
cd s2
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/your-database

# WebSocket Server
WS_URL=ws://localhost:8080
```

### 3. Configure Each Variable

| Variable          | Description                                    | Example                                         |
| ----------------- | ---------------------------------------------- | ----------------------------------------------- |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js to encrypt tokens   | Run `openssl rand -base64 32` to generate one   |
| `NEXTAUTH_URL`    | Fallback URL for NextAuth (used in production) | `https://your-domain.com`                       |
| `DATABASE_URL`    | Your PostgreSQL connection string              | `postgresql://user:pass@localhost:5432/chat_db` |
| `WS_URL`          | WebSocket server URL for real-time messaging   | `ws://localhost:8080`                           |

### 4. Set Up Your Database

Run the database migrations to create necessary tables:

```bash
npx prisma migrate dev
```

### 5. Create a User with Hashed Password

You can create a user directly in your database or use a script. Here's how to hash a password using bcrypt:

```javascript
import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed password:", hashedPassword);

  // Use this hashed password in your database insert
  return hashedPassword;
}

// Example usage
hashPassword("your-desired-password");
```

Then insert the user into your database with the hashed password.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 7. Running the WebSocket Server

For real-time chat functionality, you'll need to run the WebSocket server separately:

```bash
# In a new terminal
node ws-server.js
```

Or add it to your package.json scripts:

```json
"scripts": {
  "dev": "next dev",
  "ws": "node ws-server.js"
}
```

Then run both servers in separate terminals.
