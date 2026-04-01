<template>
  <article
    class="destination-card"
    tabindex="0"
    @click="$emit('open', destination.id)"
    @keydown.enter.prevent="$emit('open', destination.id)"
    @keydown.space.prevent="$emit('open', destination.id)"
  >
    <div class="card-image-wrap">
      <div
        class="card-image-fallback"
        :style="{ background: destination.gradient }"
      ></div>
      <img
        v-if="destination.image"
        class="card-image"
        :src="destination.image"
        :alt="destination.title"
        loading="lazy"
      />
      <span class="card-era-badge">{{ destination.era }}</span>
    </div>

    <div class="card-body">
      <div class="card-location">
        <span class="location-icon">{{ destination.locationIcon }}</span>
        {{ destination.location }}
      </div>
      <h3 class="card-title">{{ destination.title }}</h3>
      <p class="card-excerpt">{{ destination.excerpt }}</p>
      <div class="card-meta">
        <span class="card-duration">⏳ {{ destination.duration }}</span>
        <span class="card-price">Dès {{ destination.priceDisplay }}</span>
      </div>
      <button
        class="btn btn-card-detail"
        @click.stop="$emit('open', destination.id)"
      >
        Découvrir
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  destination: Object,
});
defineEmits(["open"]);
</script>

<style scoped>
.destination-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.destination-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 169, 110, 0.4);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.destination-card:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 4px;
}

.card-image-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image-fallback {
  position: absolute;
  inset: 0;
}

.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.destination-card:hover .card-image {
  transform: scale(1.04);
}

.card-era-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 169, 110, 0.4);
  color: var(--color-gold);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
}

.card-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-location {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-text);
  line-height: 1.2;
}

.card-excerpt {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.25rem;
}

.card-duration {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.card-price {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gold);
}

.btn-card-detail {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.65rem;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.btn-card-detail:hover {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: #0a0800;
}
</style>
