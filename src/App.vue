<template>
  <div id="app-root">
    <TheNavbar :open-chatbot="chatbot.openChat" />
    <RouterView
      :open-modal="modal.openModal"
      :open-chatbot="chatbot.openChat"
    />
    <DestinationModal
      v-if="modal.isOpen.value"
      :destination="modal.activeDestination.value"
      :is-open="modal.isOpen.value"
      @close="modal.closeModal"
      @reserve="handleModalReserve"
    />
    <ChatbotWidget :chatbot="chatbot" />
    <TheFooter :open-modal="modal.openModal" />
  </div>
</template>

<script setup>
import { provide } from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import TheFooter from "./components/TheFooter.vue";
import DestinationModal from "./components/DestinationModal.vue";
import ChatbotWidget from "./components/ChatbotWidget.vue";
import { useChatbot } from "./composables/useChatbot.js";
import { useModal } from "./composables/useModal.js";

const modal = useModal();
const chatbot = useChatbot();
chatbot.initWelcome();

provide("openModal", modal.openModal);
provide("openChatbot", chatbot.openChat);

function handleModalReserve(destination) {
  modal.closeModal();
  chatbot.openChat();
  setTimeout(() => {
    chatbot.inputText.value = `Je suis intéressé par ${destination.title}`;
  }, 400);
}
</script>
