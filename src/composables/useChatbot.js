// ============================================
// TIMETRAVEL AGENCY — Composable Chatbot
// ============================================
import { ref, nextTick } from 'vue'
import { CHATBOT_RESPONSES, DEFAULT_RESPONSE, WELCOME_MESSAGE } from '../data/chatbot.js'

export function useChatbot() {
  const isOpen = ref(false)
  const isTyping = ref(false)
  const messages = ref([])
  const inputText = ref('')
  const showBadge = ref(true)
  const chatHistory = ref([])

  // ── Find mock response ──
  function findMockResponse(message) {
    const lower = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    for (const item of CHATBOT_RESPONSES) {
      for (const keyword of item.keywords) {
        const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        if (lower.includes(normalizedKeyword)) {
          return item.response
        }
      }
    }
    return DEFAULT_RESPONSE
  }

  // ── API call with mock fallback ──
  async function getResponse(text) {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: chatHistory.value.slice(-8) })
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      if (data.fallback) throw new Error('fallback')
      chatHistory.value.push({ role: 'user', content: text })
      chatHistory.value.push({ role: 'assistant', content: data.reply })
      if (chatHistory.value.length > 20) chatHistory.value = chatHistory.value.slice(-20)
      return data.reply
    } catch {
      return findMockResponse(text)
    }
  }

  // ── Add message ──
  function addMessage(text, type = 'bot') {
    messages.value.push({ id: Date.now() + Math.random(), text, type })
  }

  // ── Send message ──
  async function sendMessage(messagesEl) {
    const text = inputText.value.trim()
    if (!text || isTyping.value) return

    addMessage(text, 'user')
    inputText.value = ''
    isTyping.value = true

    await scrollToBottom(messagesEl)

    const response = await getResponse(text)

    isTyping.value = false
    addMessage(response, 'bot')
    await nextTick()
    await scrollToBottom(messagesEl)
  }

  // ── Scroll helper ──
  async function scrollToBottom(el) {
    await nextTick()
    if (el) el.scrollTop = el.scrollHeight
  }

  // ── Toggle ──
  function toggleChat(forceOpen) {
    isOpen.value = forceOpen !== undefined ? forceOpen : !isOpen.value
    if (isOpen.value) {
      showBadge.value = false
    }
  }

  function openChat() {
    toggleChat(true)
  }

  // ── Init welcome message ──
  function initWelcome() {
    setTimeout(() => {
      addMessage(WELCOME_MESSAGE, 'bot')
    }, 500)
  }

  return {
    isOpen,
    isTyping,
    messages,
    inputText,
    showBadge,
    sendMessage,
    toggleChat,
    openChat,
    initWelcome,
    scrollToBottom
  }
}