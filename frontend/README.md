
# Spur AI Chat – Frontend

This is the frontend for the Spur AI Chat Support application.  
It provides a clean, minimal chat interface for interacting with the AI support assistant.

---

##  Tech Stack

- **Framework:** SvelteKit
- **Language:** JavaScript
- **Styling:** Scoped CSS (no UI libraries)

---

##  Features

- Support-style chat UI
- Clear distinction between user and assistant messages
- Session persistence using `localStorage`
- Auto-scroll to latest messages
- “New Chat” button to reset conversation
- Responsive layout (mobile + desktop)

---

##  Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
2️⃣ Run development server

npm run dev
Frontend runs at:

http://localhost:5173
🔗 Backend Dependency
The frontend expects the backend API to be available at:

http://localhost:4000
Endpoint used:
POST /chat/message
```
## UX Notes

-UI is intentionally minimal and support-focused

-Designed to feel like a real customer support widget

-Avoids heavy animations or unnecessary complexity

## Future Improvements
-Streaming responses

-Deployment environment switching

Optional dark mode

## Author
Archit Prakash Choudhary