import {
  getOrCreateConversation,
  saveMessage,
  getConversationHistory
} from "../services/conversation.service.js";

import { generateReply } from "../services/llm.service.js";

export async function handleChatMessage(req, res) {
  try {
    const { message, sessionId } = req.body;

    // Validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message cannot be empty"
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message too long"
      });
    }

    // Conversation
    const conversation = await getOrCreateConversation(sessionId);

    // Save user message
    await saveMessage(conversation.id, "user", message);

    // Fetch history for context
    const history = await getConversationHistory(conversation.id);

    // Generate AI reply
    const reply = await generateReply(history, message);

    // Save AI message
    await saveMessage(conversation.id, "ai", reply);

    return res.json({
      reply,
      sessionId: conversation.sessionId
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      error: "Something went wrong. Please try again."
    });
  }
}
