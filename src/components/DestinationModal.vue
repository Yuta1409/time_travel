<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen && destination"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="'modal-title-' + destination.id"
      @click.self="$emit('close')"
      @keydown.esc="$emit('close')"
    >
      <div class="modal-container">
        <button class="modal-close" aria-label="Fermer" @click="$emit('close')">
          ×
        </button>

        <div class="modal-inner">
          <!-- Hero -->
          <div class="modal-hero" :style="{ background: destination.gradient }">
            <div class="modal-hero-content">
              <span class="modal-era-badge">{{ destination.era }}</span>
              <h2 :id="'modal-title-' + destination.id" class="modal-title">
                {{ destination.title }}
              </h2>
              <p class="modal-subtitle">{{ destination.subtitle }}</p>
            </div>
          </div>

          <!-- Info bar -->
          <div class="modal-info-bar">
            <div class="modal-info-item">
              <span class="modal-info-label">Destination</span>
              <span class="modal-info-value">{{ destination.location }}</span>
            </div>
            <div class="modal-info-item">
              <span class="modal-info-label">Durée</span>
              <span class="modal-info-value">{{ destination.duration }}</span>
            </div>
            <div class="modal-info-item">
              <span class="modal-info-label">À partir de</span>
              <span class="modal-info-value">{{
                destination.priceDisplay
              }}</span>
            </div>
          </div>

          <p class="modal-description">{{ destination.description }}</p>

          <div class="modal-sections">
            <div>
              <h3 class="modal-section-title">Points forts</h3>
              <ul class="modal-list">
                <li v-for="h in destination.highlights" :key="h">{{ h }}</li>
              </ul>
            </div>
            <div>
              <h3 class="modal-section-title">Inclus dans le voyage</h3>
              <ul class="modal-list">
                <li v-for="inc in destination.includes" :key="inc">
                  {{ inc }}
                </li>
              </ul>
            </div>
          </div>

          <div class="modal-cta-bar">
            <div class="modal-price-display">
              <span class="modal-price-from">Tarif par voyageur</span>
              <span class="modal-price-amount">{{
                destination.priceDisplay
              }}</span>
            </div>
            <button
              class="modal-btn-reserve"
              @click="$emit('reserve', destination)"
            >
              Demander une réservation
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { DESTINATIONS } from "../data/destinations.js";
import { computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  destination: String,
});

defineEmits(["close", "reserve"]);

const destination = computed(() =>
  props.destination ? DESTINATIONS[props.destination] : null,
);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-container {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: sticky;
  top: 0.75rem;
  float: right;
  margin: 0.75rem 0.75rem 0 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 1.4rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-inner {
  padding: 0;
}

.modal-hero {
  padding: 3rem 2rem 2rem;
  border-radius: 18px 18px 0 0;
  min-height: 200px;
  display: flex;
  align-items: flex-end;
}

.modal-hero-content {
  width: 100%;
}

.modal-era-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 0.4rem;
}

.modal-subtitle {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.95rem;
}

.modal-info-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
}

.modal-info-item {
  flex: 1;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-right: 1px solid var(--color-border);
}

.modal-info-item:last-child {
  border-right: none;
}

.modal-info-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.modal-info-value {
  font-size: 0.95rem;
  color: var(--color-text);
  font-weight: 500;
}

.modal-description {
  padding: 1.5rem 2rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  border-bottom: 1px solid var(--color-border);
}

.modal-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
}

.modal-sections > div {
  padding: 1.5rem 2rem;
}

.modal-sections > div:first-child {
  border-right: 1px solid var(--color-border);
}

.modal-section-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
}

.modal-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-list li {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  padding-left: 1.2rem;
  position: relative;
}

.modal-list li::before {
  content: "✦";
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-size: 0.6rem;
  top: 0.2rem;
}

.modal-cta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  gap: 1rem;
}

.modal-price-display {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.modal-price-from {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-price-amount {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-gold);
}

.modal-btn-reserve {
  background: var(--color-gold);
  color: #0a0800;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.2s;
  white-space: nowrap;
}

.modal-btn-reserve:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.96) translateY(12px);
}

@media (max-width: 640px) {
  .modal-sections {
    grid-template-columns: 1fr;
  }
  .modal-sections > div:first-child {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
  .modal-info-bar {
    flex-wrap: wrap;
  }
  .modal-cta-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
