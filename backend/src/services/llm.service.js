import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function generateReply(history, userMessage) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a helpful customer support agent for a small e-commerce store.

Store info:
- Worldwide shipping
- Delivery time: 5–10 business days
- Return policy: 30-day hassle-free returns
- Support hours: Mon–Fri, 9am–6pm IST`
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
      temperature: 0.4
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("LLM error:", error);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}
