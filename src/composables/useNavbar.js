// ============================================
// TIMETRAVEL AGENCY — Composable Navbar
// ============================================
import { ref, onMounted, onUnmounted } from 'vue'

export function useNavbar() {
  const isScrolled = ref(false)
  const isMenuOpen = ref(false)

  function onScroll() {
    isScrolled.value = window.scrollY > 50
  }

  function toggleMenu(open) {
    isMenuOpen.value = open !== undefined ? open : !isMenuOpen.value
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
  }

  function closeMenu() {
    toggleMenu(false)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.body.style.overflow = ''
  })

  return { isScrolled, isMenuOpen, toggleMenu, closeMenu }
}