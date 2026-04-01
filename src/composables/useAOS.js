// ============================================
// TIMETRAVEL AGENCY — Composable AOS
// ============================================
import { onMounted } from 'vue'

export function useAOS() {
  onMounted(() => {
    if (typeof window !== 'undefined') {
      import('aos').then(({ default: AOS }) => {
        AOS.init({
          duration: 700,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          once: true,
          offset: 80
        })
      })
    }
  })
}