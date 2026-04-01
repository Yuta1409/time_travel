<template>
  <main>
    <!-- ===== PAGE HERO ===== -->
    <section class="page-hero">
      <div class="page-hero-content" data-aos="fade-up">
        <span class="section-label">Voyages dans le temps</span>
        <h1 class="page-hero-title">
          Nos <span class="hero-accent">Destinations</span>
        </h1>
        <p class="page-hero-subtitle">
          Trois époques exceptionnelles. Trois expériences uniques. Un seul
          guide : l'Histoire.
        </p>
      </div>
    </section>

    <!-- ===== NAVIGATION RAPIDE ===== -->
    <div class="dest-nav" id="dest-nav">
      <div class="container">
        <div class="dest-nav-inner">
          <a
            v-for="dest in destinations"
            :key="dest.id"
            :href="'#' + dest.id"
            class="dest-nav-link"
            :class="{ active: activeSection === dest.id }"
            @click.prevent="scrollToSection(dest.id)"
          >
            <span class="dest-nav-era">{{ dest.era }}</span>
            <span class="dest-nav-name">{{ dest.location.split(",")[0] }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- ===== SECTIONS DESTINATIONS ===== -->
    <section
      v-for="(dest, index) in destinations"
      :key="dest.id"
      :id="dest.id"
      class="destination-section"
      :class="'dest-' + dest.id"
    >
      <div class="container">
        <div
          class="dest-layout"
          :class="{ 'dest-layout--reverse': index % 2 !== 0 }"
        >
          <!-- Visuel -->
          <div
            class="dest-visual"
            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          >
            <div class="dest-image-wrap">
              <div
                class="dest-image-fallback"
                :style="{ background: dest.gradient }"
              ></div>
              <img
                v-if="dest.image"
                class="dest-image"
                :src="dest.image"
                :alt="dest.title"
                loading="lazy"
              />
              <span class="dest-era-badge">{{ dest.era }}</span>
            </div>
            <div class="dest-quick-info">
              <div class="quick-info-item">
                <span class="qi-label">Destination</span>
                <span class="qi-value">{{ dest.location }}</span>
              </div>
              <div class="quick-info-item">
                <span class="qi-label">Époque</span>
                <span class="qi-value">{{
                  dest.subtitle.split(" — ")[0]
                }}</span>
              </div>
              <div class="quick-info-item">
                <span class="qi-label">Durée</span>
                <span class="qi-value">{{ dest.duration }}</span>
              </div>
              <div class="quick-info-item">
                <span class="qi-label">À partir de</span>
                <span class="qi-value price">{{ dest.priceDisplay }}</span>
              </div>
            </div>
          </div>

          <!-- Contenu -->
          <div
            class="dest-content"
            :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
          >
            <span class="section-label"
              >{{ dest.era }} — {{ dest.location }}</span
            >
            <h2 class="dest-title">{{ dest.title }}</h2>
            <p class="dest-tagline">{{ dest.tagline }}</p>
            <p class="dest-description">{{ dest.description }}</p>

            <div class="dest-highlights">
              <h3 class="highlights-title">Points forts du voyage</h3>
              <ul class="highlights-list">
                <li v-for="h in dest.highlights" :key="h">{{ h }}</li>
              </ul>
            </div>

            <div class="dest-includes">
              <h3 class="highlights-title">Inclus dans le voyage</h3>
              <div class="includes-grid">
                <span
                  v-for="inc in dest.includes"
                  :key="inc"
                  class="include-item"
                  >✦ {{ inc }}</span
                >
              </div>
            </div>

            <div class="dest-cta">
              <RouterLink
                :to="'/reservation?destination=' + dest.id"
                class="btn btn-primary"
              >
                Réserver ce voyage
              </RouterLink>
              <span class="dest-price-display"
                >Dès <strong>{{ dest.priceDisplay }}</strong> / pers.</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== COMPARATIF ===== -->
    <section class="comparison-section" data-aos="fade-up">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Aide au choix</span>
          <h2 class="section-title">Comparez nos destinations</h2>
        </div>
        <div class="comparison-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Critère</th>
                <th v-for="dest in destinations" :key="dest.id">
                  {{ dest.location.split(",")[0] }} {{ dest.era }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Époque</td>
                <td v-for="dest in destinations" :key="dest.id">
                  {{ dest.era }}
                </td>
              </tr>
              <tr>
                <td>Durée</td>
                <td v-for="dest in destinations" :key="dest.id">
                  {{ dest.duration }}
                </td>
              </tr>
              <tr>
                <td>Prix</td>
                <td v-for="dest in destinations" :key="dest.id">
                  Dès {{ dest.priceDisplay }}
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td v-for="dest in destinations" :key="dest.id">
                  {{ dest.type }}
                </td>
              </tr>
              <tr>
                <td>Niveau d'aventure</td>
                <td v-for="dest in destinations" :key="dest.id">
                  {{ renderStars(dest.adventureLevel) }}
                </td>
              </tr>
              <tr>
                <td>Niveau culturel</td>
                <td v-for="dest in destinations" :key="dest.id">
                  {{ renderStars(dest.culturalLevel) }}
                </td>
              </tr>
              <tr>
                <td>Idéal pour</td>
                <td v-for="dest in destinations" :key="dest.id">
                  {{ dest.idealFor }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { DESTINATIONS_LIST } from "../data/destinations.js";
import { useAOS } from "../composables/useAOS.js";

const props = defineProps({
  openModal: Function,
});

useAOS();

const destinations = DESTINATIONS_LIST;
const activeSection = ref(destinations[0].id);
const route = useRoute();

function renderStars(level) {
  return "⭐".repeat(level) + "☆".repeat(5 - level);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbar = document.querySelector(".navbar");
  const destNav = document.getElementById("dest-nav");
  const offset =
    (navbar?.offsetHeight || 72) + (destNav?.offsetHeight || 56) + 8;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

// Intersection observer pour highlight nav
let observer = null;

function initObserver() {
  const sections = document.querySelectorAll(".destination-section[id]");
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
  );
  sections.forEach((s) => observer.observe(s));
}

onMounted(() => {
  initObserver();
  // Pré-scroll si param URL ?destination=xxx
  const dest = route.query.destination;
  if (dest && destinations.find((d) => d.id === dest)) {
    setTimeout(() => scrollToSection(dest), 300);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
/* ── Page Hero ── */
.page-hero {
  min-height: 340px;
  display: flex;
  align-items: flex-end;
  padding: 6rem 2rem 3rem;
  background:
    linear-gradient(to bottom, rgba(8, 6, 18, 0) 0%, var(--color-bg) 100%),
    radial-gradient(
      ellipse at 50% 0%,
      rgba(201, 169, 110, 0.12) 0%,
      transparent 70%
    );
  text-align: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
}

.page-hero-content {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  color: var(--color-text);
}

.hero-accent {
  color: var(--color-gold);
  font-style: italic;
}

.page-hero-subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.6;
}

/* ── Dest Nav ── */
.dest-nav {
  position: sticky;
  top: 72px;
  z-index: 100;
  background: rgba(8, 6, 18, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
}

.dest-nav-inner {
  display: flex;
  gap: 0;
  max-width: 1280px;
  margin: 0 auto;
}

.dest-nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.9rem 2rem;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition:
    border-color 0.25s,
    color 0.25s;
  flex: 1;
  text-align: center;
}

.dest-nav-era {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  transition: color 0.25s;
}

.dest-nav-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color 0.25s;
}

.dest-nav-link.active {
  border-bottom-color: var(--color-gold);
}

.dest-nav-link.active .dest-nav-era,
.dest-nav-link.active .dest-nav-name {
  color: var(--color-gold);
}

.dest-nav-link:hover .dest-nav-name,
.dest-nav-link:hover .dest-nav-era {
  color: var(--color-text);
}

/* ── Destination Sections ── */
.destination-section {
  padding: 6rem 0;
  border-bottom: 1px solid var(--color-border);
}

.destination-section:nth-child(even) {
  background: var(--color-surface);
}

.dest-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.dest-layout--reverse {
  direction: rtl;
}

.dest-layout--reverse > * {
  direction: ltr;
}

/* ── Visuel ── */
.dest-image-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.dest-image-fallback {
  position: absolute;
  inset: 0;
}

.dest-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dest-era-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 169, 110, 0.4);
  color: var(--color-gold);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
}

.dest-quick-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1.5rem;
}

.quick-info-item {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.quick-info-item:nth-child(2n) {
  border-right: none;
}
.quick-info-item:nth-last-child(-n + 2) {
  border-bottom: none;
}

.qi-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.qi-value {
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 500;
}

.qi-value.price {
  color: var(--color-gold);
  font-weight: 700;
}

/* ── Contenu ── */
.dest-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.dest-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: var(--color-text);
  line-height: 1.15;
}

.dest-tagline {
  font-size: 1rem;
  color: var(--color-gold);
  font-style: italic;
}

.dest-description {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.75;
}

.highlights-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.highlights-list li {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.5;
}

.highlights-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-gold);
}

.includes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem 1rem;
}

.include-item {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.dest-cta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.5rem;
  flex-wrap: wrap;
}

.dest-price-display {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

.dest-price-display strong {
  color: var(--color-gold);
}

/* ── Comparatif ── */
.comparison-section {
  padding: 6rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.comparison-table-wrap {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.comparison-table th,
.comparison-table td {
  padding: 0.9rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.comparison-table th {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  background: var(--color-surface);
}

.comparison-table td:first-child {
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
}

.comparison-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

@media (max-width: 900px) {
  .dest-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .dest-layout--reverse {
    direction: ltr;
  }
  .includes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .dest-nav-link {
    padding: 0.75rem 1rem;
  }
  .dest-quick-info {
    grid-template-columns: 1fr;
  }
  .quick-info-item:nth-child(n) {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
  .quick-info-item:last-child {
    border-bottom: none;
  }
}
</style>
