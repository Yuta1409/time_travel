// ============================================
// TIMETRAVEL AGENCY — Composable Modal
// ============================================
import { ref, watch } from 'vue'

export function useModal() {
  const isOpen = ref(false)
  const activeDestination = ref(null)

  function openModal(destination) {
    activeDestination.value = destination
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    isOpen.value = false
    setTimeout(() => {
      activeDestination.value = null
    }, 400)
    document.body.style.overflow = ''
  }

  return { isOpen, activeDestination, openModal, closeModal }
}