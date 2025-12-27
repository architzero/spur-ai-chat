# Spur AI Chat – Backend

This is the backend service for the Spur AI Chat Support application.  
It handles message processing, session management, persistence, and AI-powered replies.

---

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **LLM Provider:** Groq (LLaMA model)

---

##  Features

- Session-based conversations
- Persistent storage of conversations and messages
- Clean controller → service → data layer separation
- LLM replies with conversation context
- Graceful error handling

---

##  Project Structure

src/
├─ controllers/ # Request handling
├─ services/ # LLM + business logic
├─ routes/ # API routes
├─ prisma/ # Prisma schema & migrations
└─ server.js # App entry point

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install

2️⃣ Environment variables
Create a .env file in backend/:
env
Copy code
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
GROQ_API_KEY=your_groq_api_key

3️⃣ Database setup
npx prisma migrate dev
(Optional)
npx prisma studio

4️⃣ Run the server

npm run dev

Server runs at:
http://localhost:4000

🔗 API Endpoints
POST /chat/message
Request

json
Copy code
{
  "message": "What is your return policy?",
  "sessionId": "optional-session-id"
}
Response

json
Copy code
{
  "reply": "AI-generated response",
  "sessionId": "conversation-session-id"
}

Data & Persistence
Conversations are identified using a session ID

All user and assistant messages are stored in the database

Conversation history is used to maintain multi-turn context

Sessions persist across page reloads via localStorage

Notes & Trade-offs

Authentication is intentionally omitted (not required by assignment)

Responses are generated synchronously (no streaming)

Designed for clarity and extensibility over feature completeness

👤 Author
Archit Prakash Choudhary
