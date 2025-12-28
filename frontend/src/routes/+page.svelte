<script>
  import { tick } from "svelte";

  let messages = [];
  let loading = false;
  let bottomRef;

  let sessionId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("sessionId")
      : null;

  function newConversation() {
    messages = [];
    sessionId = null;
    localStorage.removeItem("sessionId");
  }

  async function sendMessage() {
    const input = document.getElementById("msg");
    const text = input.value.trim();
    if (!text || loading) return;

    messages = [...messages, { role: "user", content: text, time: new Date() }];
    input.value = "";
    loading = true;
    await tick();
    bottomRef?.scrollIntoView({ behavior: "smooth" });

    try {
      const res = await fetch("https://spur-ai-chat-1.onrender.com/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId })
      });

      const data = await res.json();

      if (data.sessionId && !sessionId) {
        sessionId = data.sessionId;
        localStorage.setItem("sessionId", sessionId);
      }

      messages = [
        ...messages,
        { role: "assistant", content: data.reply, time: new Date() }
      ];
    } catch {
      messages = [
        ...messages,
        {
          role: "assistant",
          content: "Sorry — something went wrong. Please try again.",
          time: new Date()
        }
      ];
    } finally {
      loading = false;
      await tick();
      bottomRef?.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<main class="page">
  <section class="chat-shell">
    <header class="chat-header">
      <div>
        <h1>Spur Support</h1>
        <p>AI-powered help • replies in seconds</p>
      </div>

      <button class="new-chat-btn" on:click={newConversation}>
        New chat
      </button>
    </header>

    <div class="chat-body">
      {#if messages.length === 0}
        <div class="chat-empty">
          <div class="empty-bubble">
            👋 Hi! I’m your support assistant.<br />
            Ask about orders, delivery, or returns.
          </div>
        </div>
      {:else}
        {#each messages as msg}
          <div class="row {msg.role}">
            {#if msg.role === "assistant"}
              <div class="avatar"></div>
            {/if}

            <div class="bubble">
              <div class="text">{msg.content}</div>
              <div class="time">
                {msg.time?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
          </div>
        {/each}

        {#if loading}
          <div class="row assistant">
            <div class="avatar"></div>
            <div class="bubble typing">Thinking…</div>
          </div>
        {/if}
      {/if}
      <div bind:this={bottomRef}></div>
    </div>

    <footer class="chat-input">
      <input
        id="msg"
        placeholder="Type your question…"
        disabled={loading}
        on:keydown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button class="send-btn" on:click={sendMessage} disabled={loading}>
        Send
      </button>
    </footer>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #f4f6fa;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 16px;
  }

  .chat-shell {
    width: 100%;
    max-width: 420px;
    height: min(680px, 95vh);
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat-header {
    padding: 16px 18px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-header h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  .chat-header p {
    margin: 4px 0 0;
    font-size: 12px;
    color: #6b7280;
  }

  .new-chat-btn {
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid #d1d5db;
    background: #fff;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }

  .new-chat-btn:hover {
    background: #f3f4f6;
  }

  .new-chat-btn:active {
    transform: scale(0.96);
  }

  .chat-body {
    flex: 1;
    padding: 18px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .chat-empty {
    flex: 1;
    display: grid;
    place-items: center;
  }

  .empty-bubble {
    background: #f3f4f6;
    padding: 16px 18px;
    border-radius: 14px;
    font-size: 14px;
    color: #374151;
    text-align: center;
  }

  .row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .row.user {
    justify-content: flex-end;
  }

  .avatar {
    width: 10px;
    height: 10px;
    background: #6366f1;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }

  .bubble {
    max-width: 75%;
    padding: 14px 16px;
    border-radius: 16px;
    background: #f3f4f6;
    font-size: 14px;
    line-height: 1.5;
  }

  .row.user .bubble {
    background: #111827;
    color: #fff;
  }

  .text {
    margin-bottom: 6px;
  }

  .time {
    font-size: 10px;
    opacity: 0.5;
    text-align: right;
  }

  .chat-input {
    display: flex;
    gap: 10px;
    padding: 14px;
    border-top: 1px solid #e5e7eb;
    background: #fafafa;
  }

  input {
    flex: 1;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    font-size: 14px;
  }

  input:focus {
    outline: none;
    border-color: #111827;
  }

  .send-btn {
    padding: 0 18px;
    border-radius: 12px;
    border: none;
    background: #111827;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }

  .send-btn:hover {
    background: #000;
  }

  .send-btn:active {
    transform: scale(0.96);
  }

  @media (max-width: 480px) {
    .chat-shell {
      height: 100vh;
      border-radius: 0;
    }
  }
</style>
