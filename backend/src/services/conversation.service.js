import prisma from "../db/prisma.js";
import { randomUUID } from "crypto";

export async function getOrCreateConversation(sessionId) {
  if (!sessionId) {
    sessionId = randomUUID();
  }

  let conversation = await prisma.conversation.findUnique({
      where: { id: sessionId }
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
	data: { id: sessionId }
    });
  }

  return conversation;
}

export async function saveMessage(conversationId, sender, content) {
  return prisma.message.create({
    data: {
      conversationId,
      sender,
      content
    }
  });
}

// 🔥 THIS WAS MISSING
export async function getConversationHistory(conversationId) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: 10 // cost & context control
  });
}
