# Spur AI Chat – Backend

This repository contains the backend for an AI-powered customer support chat system, built as a technical assessment for **Spur**. 

The system provides a robust API to handle persistent user conversations, integrated with high-performance LLMs via a modular service architecture.

---

## 🚀 Features

* **Persistent Conversations:** Session-based message storage using Prisma ORM.
* **Modular LLM Layer:** Pluggable service design currently powered by **Groq (Llama 3.1)**.
* **Production-Ready Patterns:** Clean layered architecture (Controllers, Services, Routes).
* **Error Resilience:** Robust handling for LLM timeouts and API failures.
* **Fast & Lightweight:** Powered by Express.js and SQLite for zero-config setup.

---

## 🧱 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite (via Prisma ORM)
* **LLM Provider:** Groq (OpenAI-compatible SDK)
* **Language:** JavaScript (ES Modules)

---

## 📂 Project Structure



```text
backend/
├── src/
│   ├── controllers/      # Handles HTTP logic (req/res)
│   ├── services/         # Business logic & AI API integration
│   ├── routes/           # Endpoint definitions
│   ├── db/               # Prisma Client singleton
│   ├── app.js            # Express middleware & app config
│   └── server.js         # Server entry point
├── prisma/
│   └── schema.prisma     # Database models & relationships
├── .env.example          # Environment template
├── package.json          # Script & dependency management
└── README.md             # Documentation

---

## ⚙️ Setup Instructions
1. Install Dependencies
Bash

cd backend
npm install
2. Environment Setup
Create a .env file in the backend/ directory:

Code snippet

DATABASE_URL="file:./dev.db"
GROQ_API_KEY=your_api_key_here
3. Database Migration
Initialize the SQLite database and sync your schema:

Bash

npx prisma migrate dev --name init
4. Run Development Server
Bash

npm run dev
The API will be live at: http://localhost:4000

## 📡 API Documentation
Check Health
GET /health

Returns 200 OK if the server and database are active.

Send Message
POST /chat/message

Payload:

JSON

{
  "message": "What is your refund policy?"
}
Success Response:

JSON

{
  "reply": "Our refund policy allows returns within 30 days...",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
🧠 Design Decisions
Service Isolation: The LLM logic is decoupled from the controller. This allowed a quick switch from Google Gemini to Groq without touching the routing or database logic.

Schema Design: The message schema includes role (user/assistant) and sessionId to support future multi-turn memory implementation.

SQLite for Evaluation: Chosen for its "zero-setup" nature, allowing evaluators to run the project instantly without configuring Docker or Postgres.

👤 Author
Archit Prakash Choudhary B.Tech Computer Science & Engineering
