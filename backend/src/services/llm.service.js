import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Strong system instruction to control output length & tone
const SYSTEM_PROMPT = `
You are a customer support chat agent for a small e-commerce store.

Rules:
- Reply in short, conversational sentences
- Keep responses concise (2–3 short paragraphs max)
- Do NOT use markdown, bullet points, or headings
- Sound friendly and human, not like documentation
- Answer directly and clearly

Store info:
- Worldwide shipping
- Delivery time: 5–10 business days
- Return policy: 30-day hassle-free returns
- Support hours: Mon–Fri, 9am–6pm IST
`;

export async function generateReply(history, userMessage) {
  try {
    const messages = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      ...history.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content
      })),
      {
        role: "user",
        content: userMessage
      }
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_tokens: 180
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("LLM error:", error);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}
