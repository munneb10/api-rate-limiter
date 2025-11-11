# 🛑 API Rate Limiter Middleware “The Bouncer at the API Door”

Every great system has a quiet guardian a gatekeeper who ensures that chaos never reaches the core.
In APIs, that guardian is the **Rate Limiter**.

When hundreds (or even thousands) of requests flood your server, this small piece of middleware stands at the door and says:

> “Wait your turn. Everyone gets fair access.”

That’s the beauty of this project a few lines of TypeScript that teach big ideas in **system protection** and **middleware architecture**.

---

## 🏗 How It Works

Every incoming request carries an **IP address**.
The middleware keeps track of recent requests per IP using a small memory map.

Here’s what it does:

1. Check how many times this IP has called the API recently.
2. If too many calls in a short time, reject it with **HTTP 429**.
3. Otherwise, let it pass through.

It’s basically a *sliding window* in time always watching the last 60 seconds, always cleaning up old requests.

---

## ⚙️ Project Setup

```bash
git clone https://github.com/munneb10/api-rate-limiter.git
cd api-rate-limiter
npm install
npm run dev
```

Now open your browser:

```
http://localhost:3000/
```

Make 5 requests quickly you’ll see:

```
Too many requests. Please try again later.
```

That’s your digital bouncer at work.

---

## 🧩 Code Overview

The core idea lives here:

```typescript
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

requests[ip].timestamps = requests[ip].timestamps.filter(
  (time) => now - time < WINDOW_SIZE
);
```

Old requests fade away, new ones come in just like a revolving door at a busy café.
The system never crashes because it never lets the crowd build up.

---

## 🚀 Why It Matters

This project looks tiny, but it mirrors how real-world systems like:

* **Cloudflare**
* **AWS API Gateway**
* **Express-rate-limit**
  protect billions of requests daily.

It’s not just about coding it’s about designing **systems that scale responsibly**.

---

## 💬 A Closing Thought

Every engineer writes code.
But great engineers write *defenses* quiet, invisible protectors that make everything else work smoothly.

This little middleware is one of those protectors.
Simple. Solid. Smart.

---

## 🧰 Tech Stack

* **TypeScript** for type safety
* **Express.js** for middleware structure
* **Node.js** runtime
* (Optional: Redis for distributed version later)

---

## 🧠 Next Steps

Try improving it:

* Store rate limits in Redis (for multiple servers)
* Use token bucket algorithm instead of sliding window
* Add per-user or per-endpoint limits

---

Made with ❤️ by an engineer who believes **small projects teach big lessons**.