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

First, you'll need to set up your environment variables. Create a `.env.local` file in the root of the project and add the necessary variables for NextAuth.js. For example:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
