<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="footer-logo">⏱ TimeTravel Agency</span>
          <p class="footer-tagline">
            Le temps n'est pas une limite,<br />c'est une destination.
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social-link" aria-label="Twitter">𝕏</a>
            <a href="#" class="footer-social-link" aria-label="Instagram">◎</a>
            <a href="#" class="footer-social-link" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Destinations</h4>
          <ul class="footer-links">
            <li v-for="dest in destinations" :key="dest.id">
              <button class="footer-link-btn" @click="openModal(dest.id)">
                {{ dest.location.split(",")[0] }} {{ dest.era }}
              </button>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Agence</h4>
          <ul class="footer-links">
            <li>
              <RouterLink to="/" class="footer-link">À propos</RouterLink>
            </li>
            <li><a href="#" class="footer-link">Mentions légales</a></li>
            <li><a href="#" class="footer-link">Confidentialité</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Contact</h4>
          <address class="footer-contact">
            <p>
              <a href="mailto:contact@timetravel-agency.com" class="footer-link"
                >contact@timetravel-agency.com</a
              >
            </p>
            <p>+33 1 23 45 67 89</p>
            <p>Paris, France (Siège temporel)</p>
          </address>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} TimeTravel Agency — Projet pédagogique</p>
        <p class="footer-tech">
          Fait avec ❤️ et un soupçon de paradoxe temporel
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { DESTINATIONS_LIST } from "../data/destinations.js";

const props = defineProps({
  openModal: Function,
});

const destinations = DESTINATIONS_LIST;
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 4rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.footer-logo {
  display: block;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.footer-tagline {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.footer-social-link:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.footer-col-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link,
.footer-link-btn {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.footer-link:hover,
.footer-link-btn:hover {
  color: var(--color-gold);
}

.footer-contact {
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-contact p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.footer-tech {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
