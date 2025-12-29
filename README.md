# Spur AI Chat Support

A full-stack AI-powered customer support chat application built as part of the Spur Software Engineer assignment.

##  Live Demo
https://spur-ai-chat-frontend.onrender.com/

---

##  Features
- AI-powered customer support chat
- Session-based conversation memory
- Persistent message storage
- Clean and minimal chat UI
- Start new conversation / reset chat
- Robust backend error handling

---

##  Tech Stack

### Frontend
- SvelteKit

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL (via Prisma ORM)

### AI / LLM
- Groq API (LLaMA model)

---
## Project Structure
/frontend
/backend

Each folder contains its own README with setup instructions.

---
##  Notes
- The frontend and backend are deployed separately.
- Session IDs are used to maintain conversation context.
- The backend is designed with a clean service-based architecture for scalability.

---

## Future Enhancements

The current version focuses on correctness, clarity, and production readiness. The following improvements can be explored to further enhance the product:

- User Authentication & Accounts
Add optional user login to associate conversations with specific users across devices.

- Conversation History UI
Allow users to view and switch between past conversations instead of only resetting sessions.

- Advanced Prompt Control
Add configurable system prompts or domain-specific modes (e.g., sales, support, troubleshooting).

- Analytics & Monitoring
Track response times, conversation volume, and common queries for better insights.

- Role-based Support Escalation
Escalate conversations to a human agent when confidence is low or on explicit user request.

- Improved Error Handling & Retries
Graceful fallbacks for LLM downtime, rate limits, or partial failures.

- Theming & Accessibility
Support light/dark themes and improved accessibility (ARIA labels, keyboard navigation).

##  License
This project was built for evaluation purposes as part of a technical assignment.


