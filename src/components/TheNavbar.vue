<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <RouterLink to="/" class="nav-logo" @click="closeMenu">
        <span class="logo-icon">⏱</span>
        <span class="logo-text"
          >TimeTravel <span class="logo-accent">Agency</span></span
        >
      </RouterLink>

      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li>
          <RouterLink to="/destinations" class="nav-link" @click="closeMenu"
            >Destinations</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/reservation" class="nav-link" @click="closeMenu"
            >À propos</RouterLink
          >
        </li>
        <li>
          <a href="#" class="nav-link" @click.prevent="handleChatOpen"
            >Conseiller</a
          >
        </li>
      </ul>

      <RouterLink to="/destinations" class="btn btn-primary nav-cta"
        >Explorer</RouterLink
      >

      <button
        class="nav-burger"
        :class="{ active: isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-label="Menu"
        @click="toggleMenu()"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useNavbar } from "../composables/useNavbar.js";

const props = defineProps({
  openChatbot: Function,
});

const { isScrolled, isMenuOpen, toggleMenu, closeMenu } = useNavbar();

function handleChatOpen() {
  closeMenu();
  if (props.openChatbot) props.openChatbot();
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease;
}

.navbar.scrolled {
  background: rgba(8, 6, 18, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 rgba(201, 169, 110, 0.15);
}

.nav-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.3rem;
}
.logo-accent {
  color: var(--color-gold);
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.25rem;
  margin-left: auto;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.2s;
  border-radius: 6px;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-text);
}

.nav-cta {
  margin-left: 1rem;
  flex-shrink: 0;
  font-size: 0.85rem;
  padding: 0.55rem 1.4rem;
}

.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
}

.nav-burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition:
    transform 0.3s,
    opacity 0.3s;
}

.nav-burger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-burger.active span:nth-child(2) {
  opacity: 0;
}
.nav-burger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-burger {
    display: flex;
  }
  .nav-cta {
    display: none;
  }
  .nav-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 999;
  }
  .nav-links.open {
    transform: translateX(0);
  }
  .nav-link {
    font-size: 1.4rem;
    padding: 0.75rem 2rem;
  }
}
</style>
