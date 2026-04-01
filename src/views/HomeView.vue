<template>
  <main>
    <!-- ===== HERO ===== -->
    <section class="hero" id="hero">
      <video class="hero-video" autoplay muted loop playsinline>
        <source
          src="/src/public/assets/videos/hero-video.mp4"
          type="video/mp4"
        />
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-badge">Agence de voyage temporel de luxe</span>
        <h1 class="hero-title">
          <span class="hero-title-line">Explorez</span>
          <span class="hero-title-line hero-title-accent">l'Histoire</span>
          <span class="hero-title-line">de l'intérieur</span>
        </h1>
        <p class="hero-subtitle">
          Paris 1889. Le Crétacé. Florence 1504.<br />
          Trois époques. Trois aventures. Une seule agence.
        </p>
        <div class="hero-cta-group">
          <RouterLink to="/destinations" class="btn btn-primary"
            >Découvrir nos voyages</RouterLink
          >
          <a href="#about" class="btn btn-ghost" @click.prevent="scrollToAbout"
            >En savoir plus</a
          >
        </div>
      </div>
      <div class="hero-scroll">
        <span class="scroll-text">Défiler</span>
        <span class="scroll-line"></span>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section class="about" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-text-block" data-aos="fade-right">
            <span class="section-label">Notre Mission</span>
            <h2 class="section-title">
              L'Agence qui brise les frontières du temps
            </h2>
            <p class="about-description">
              Fondée par des passionnés d'histoire et de technologie, TimeTravel
              Agency est la première agence de voyage temporel de luxe. Nous
              vous offrons des expériences immersives uniques au cœur des plus
              grandes époques de l'humanité.
            </p>
            <p class="about-description">
              Chaque voyage est méticuleusement préparé pour garantir sécurité,
              authenticité et émerveillement. Nos guides experts vous
              accompagnent pas à pas dans votre aventure à travers les siècles.
            </p>
          </div>
          <div
            class="about-stats-block"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div v-for="stat in stats" :key="stat.label" class="stat-card">
              <span class="stat-number">{{ stat.number }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DESTINATIONS ===== -->
    <section class="destinations" id="destinations">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <span class="section-label">Nos voyages</span>
          <h2 class="section-title">Choisissez votre époque</h2>
          <p class="section-subtitle">
            Trois destinations exceptionnelles, trois expériences uniques
          </p>
        </div>
        <div class="destinations-grid">
          <DestinationCard
            v-for="(dest, i) in destinations"
            :key="dest.id"
            :destination="dest"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 100"
            @open="openModal"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { inject } from "vue";
import DestinationCard from "../components/DestinationCard.vue";
import { DESTINATIONS_LIST } from "../data/destinations.js";
import { useAOS } from "../composables/useAOS.js";

const props = defineProps({
  openModal: Function,
  openChatbot: Function,
});

useAOS();

const destinations = DESTINATIONS_LIST;

const stats = [
  { number: "3", label: "Destinations" },
  { number: "1 200+", label: "Voyageurs satisfaits" },
  { number: "∞", label: "Années d'histoire" },
  { number: "100%", label: "Retour garanti" },
];

function scrollToAbout() {
  const el = document.getElementById("about");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
</script>

<style scoped>
/* ── Hero ── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(8, 6, 18, 0.3) 0%,
    rgba(8, 6, 18, 0.6) 50%,
    rgba(8, 6, 18, 0.85) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 780px;
  padding: 0 2rem;
  margin: 0 auto;
  text-align: center;
  padding-top: 72px;
}

.hero-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  border: 1px solid rgba(201, 169, 110, 0.3);
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  background: rgba(201, 169, 110, 0.07);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.05;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.hero-title-line {
  color: var(--color-text);
}
.hero-title-accent {
  color: var(--color-gold);
  font-style: italic;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.hero-cta-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
}

.scroll-text {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent);
  animation: scroll-pulse 1.8s ease-in-out infinite;
}

@keyframes scroll-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* ── About ── */
.about {
  padding: 6rem 0;
  background: var(--color-surface);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.about-text-block {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.about-description {
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.75;
}

.about-stats-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: border-color 0.3s;
}

.stat-card:hover {
  border-color: rgba(201, 169, 110, 0.4);
}

.stat-number {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--color-gold);
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ── Destinations ── */
.destinations {
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

.section-subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
  max-width: 480px;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .destinations-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
}

@media (max-width: 600px) {
  .hero-cta-group {
    flex-direction: column;
    align-items: center;
  }
}
</style>
