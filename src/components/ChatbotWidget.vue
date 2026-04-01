<template>
  <div class="chatbot-widget">
    <!-- Fenêtre -->
    <Transition name="chatbot-slide">
      <div
        v-show="chatbot.isOpen.value"
        class="chatbot-window"
        role="complementary"
        aria-label="Assistant virtuel Chronos"
      >
        <div class="chatbot-header">
          <div class="chatbot-avatar-wrap">
            <div class="chatbot-avatar">C</div>
            <span class="chatbot-online-dot"></span>
          </div>
          <div class="chatbot-header-info">
            <span class="chatbot-name">Chronos</span>
            <span class="chatbot-status">Guide temporel · En ligne</span>
          </div>
          <button
            class="chatbot-header-close"
            aria-label="Fermer le chat"
            @click="chatbot.toggleChat(false)"
          >
            ×
          </button>
        </div>

        <div
          ref="messagesEl"
          class="chatbot-messages"
          role="log"
          aria-live="polite"
        >
          <div
            v-for="msg in chatbot.messages.value"
            :key="msg.id"
            class="chat-message"
            :class="msg.type"
          >
            <div class="chat-bubble">{{ msg.text }}</div>
          </div>

          <!-- Typing indicator -->
          <div v-if="chatbot.isTyping.value" class="chat-typing">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>

        <div class="chatbot-footer">
          <div class="chatbot-input-wrap">
            <input
              v-model="chatbot.inputText.value"
              type="text"
              class="chatbot-input"
              placeholder="Posez votre question..."
              aria-label="Votre message"
              autocomplete="off"
              maxlength="300"
              @keydown.enter.prevent="handleSend"
            />
            <button
              class="chatbot-send-btn"
              aria-label="Envoyer le message"
              @click="handleSend"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Bouton toggle -->
    <button
      class="chatbot-toggle"
      aria-label="Ouvrir l'assistant Chronos"
      @click="chatbot.toggleChat()"
    >
      <span
        class="chatbot-toggle-icon"
        :style="{ display: chatbot.isOpen.value ? 'none' : 'flex' }"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          ></path>
        </svg>
      </span>
      <span
        class="chatbot-toggle-icon"
        :style="{
          display: chatbot.isOpen.value ? 'flex' : 'none',
          fontSize: '24px',
        }"
        >×</span
      >
      <span v-if="chatbot.showBadge.value" class="chatbot-badge">1</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  chatbot: Object,
});

const messagesEl = ref(null);

async function handleSend() {
  await props.chatbot.sendMessage(messagesEl.value);
}
</script>

<style scoped>
.chatbot-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.chatbot-window {
  width: 360px;
  max-height: 520px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.chatbot-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(201, 169, 110, 0.1),
    rgba(201, 169, 110, 0.05)
  );
  border-bottom: 1px solid var(--color-border);
}

.chatbot-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.chatbot-avatar {
  width: 38px;
  height: 38px;
  background: var(--color-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
}

.chatbot-online-dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 10px;
  height: 10px;
  background: #4caf50;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
}

.chatbot-header-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chatbot-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text);
}

.chatbot-status {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.chatbot-header-close {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s;
}

.chatbot-header-close:hover {
  color: var(--color-text);
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  scroll-behavior: smooth;
}

.chat-message {
  display: flex;
}

.chat-message.user {
  justify-content: flex-end;
}

.chat-bubble {
  max-width: 85%;
  padding: 0.65rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-line;
}

.chat-message.bot .chat-bubble {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 4px 12px 12px 12px;
}

.chat-message.user .chat-bubble {
  background: var(--color-gold);
  color: #0a0800;
  border-radius: 12px 12px 4px 12px;
}

.chat-typing {
  display: flex;
  gap: 4px;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-border);
  border-radius: 4px 12px 12px 12px;
  width: fit-content;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--color-text-muted);
  border-radius: 50%;
  animation: typing-bounce 1.2s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
}

.chatbot-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-border);
}

.chatbot-input-wrap {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  transition: border-color 0.2s;
}

.chatbot-input-wrap:focus-within {
  border-color: var(--color-gold);
}

.chatbot-input {
  flex: 1;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 0.875rem;
  outline: none;
}

.chatbot-input::placeholder {
  color: var(--color-text-muted);
}

.chatbot-send-btn {
  background: var(--color-gold);
  border: none;
  border-radius: 7px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0a0800;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.chatbot-send-btn:hover {
  opacity: 0.85;
}

.chatbot-toggle {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-gold);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0800;
  box-shadow: 0 4px 20px rgba(201, 169, 110, 0.4);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.chatbot-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 28px rgba(201, 169, 110, 0.5);
}

.chatbot-toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.chatbot-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  background: #e53e3e;
  border-radius: 50%;
  border: 2px solid var(--color-bg);
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Transitions */
.chatbot-slide-enter-active,
.chatbot-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.chatbot-slide-enter-from,
.chatbot-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}

@media (max-width: 480px) {
  .chatbot-widget {
    bottom: 1rem;
    right: 1rem;
  }
  .chatbot-window {
    width: calc(100vw - 2rem);
  }
}
</style>
