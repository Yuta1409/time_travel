<template>
  <main>
    <!-- ===== PAGE HERO ===== -->
    <section class="page-hero res-hero">
      <div class="page-hero-content" data-aos="fade-up">
        <span class="section-label">Votre voyage vous attend</span>
        <h1 class="page-hero-title">
          Réservez votre <span class="hero-accent">voyage temporel</span>
        </h1>
        <p class="page-hero-subtitle">
          Remplissez le formulaire ci-dessous. Notre équipe vous contacte sous
          48h pour finaliser votre voyage.
        </p>
      </div>
    </section>

    <!-- ===== SECTION RÉSERVATION ===== -->
    <section class="reservation-section">
      <div class="container">
        <div class="reservation-layout">
          <!-- Sidebar destinations -->
          <aside class="res-sidebar" data-aos="fade-right">
            <h2 class="res-sidebar-title">Nos destinations</h2>
            <div class="res-dest-cards">
              <button
                v-for="dest in destinations"
                :key="dest.id"
                class="res-dest-card"
                :class="{ selected: form.destination === dest.id }"
                type="button"
                @click="selectDestinationFromSidebar(dest.id)"
              >
                <div class="res-dest-image-wrap">
                  <div
                    class="res-dest-fallback"
                    :style="{ background: dest.gradient }"
                  ></div>
                </div>
                <div class="res-dest-info">
                  <span class="res-dest-era">{{ dest.era }}</span>
                  <span class="res-dest-name"
                    >{{ dest.location.split(",")[0] }} —
                    {{ dest.subtitle.split(" — ")[1] || dest.title }}</span
                  >
                  <span class="res-dest-price"
                    >Dès {{ dest.priceDisplay }} · {{ dest.duration }}</span
                  >
                </div>
                <span class="res-dest-select-icon">→</span>
              </button>
            </div>

            <div class="res-trust-signals">
              <div class="trust-item">
                <span class="trust-icon">🛡️</span
                ><span>Retour garanti à 100%</span>
              </div>
              <div class="trust-item">
                <span class="trust-icon">⭐</span
                ><span>1 200+ voyageurs satisfaits</span>
              </div>
              <div class="trust-item">
                <span class="trust-icon">📞</span><span>Réponse sous 48h</span>
              </div>
            </div>
          </aside>

          <!-- Formulaire -->
          <div class="res-form-wrap" data-aos="fade-left">
            <!-- Indicateur étapes -->
            <div class="res-steps">
              <div v-for="(step, i) in stepLabels" :key="i">
                <div
                  class="res-step"
                  :class="{
                    active: currentStep === i + 1,
                    done: currentStep > i + 1,
                  }"
                >
                  <span class="step-number">{{
                    currentStep > i + 1 ? "✓" : i + 1
                  }}</span>
                  <span class="step-label">{{ step }}</span>
                </div>
                <div
                  v-if="i < stepLabels.length - 1"
                  class="res-step-line"
                ></div>
              </div>
            </div>

            <!-- Step 1 -->
            <div v-if="currentStep === 1" class="form-step">
              <h3 class="form-step-title">Choisissez votre destination</h3>

              <div class="form-group">
                <label class="form-label" for="res-destination"
                  >Destination *</label
                >
                <select
                  id="res-destination"
                  v-model="form.destination"
                  class="form-input form-select"
                  :class="{ error: errors.destination }"
                  @change="clearError('destination')"
                >
                  <option value="">— Sélectionner une destination —</option>
                  <option
                    v-for="dest in destinations"
                    :key="dest.id"
                    :value="dest.id"
                  >
                    {{ dest.location.split(",")[0] }} {{ dest.era }} —
                    {{ dest.title }} (dès {{ dest.priceDisplay }} ·
                    {{ dest.duration }})
                  </option>
                </select>
                <span v-if="errors.destination" class="form-error">{{
                  errors.destination
                }}</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="res-date"
                    >Date de départ souhaitée *</label
                  >
                  <input
                    id="res-date"
                    v-model="form.departureDate"
                    type="date"
                    class="form-input"
                    :class="{ error: errors.departureDate }"
                    :min="minDate"
                    @change="clearError('departureDate')"
                  />
                  <span v-if="errors.departureDate" class="form-error">{{
                    errors.departureDate
                  }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="res-travelers"
                    >Nombre de voyageurs *</label
                  >
                  <input
                    id="res-travelers"
                    v-model.number="form.travelers"
                    type="number"
                    class="form-input"
                    :class="{ error: errors.travelers }"
                    min="1"
                    max="10"
                    placeholder="2"
                    @input="clearError('travelers')"
                  />
                  <span v-if="errors.travelers" class="form-error">{{
                    errors.travelers
                  }}</span>
                </div>
              </div>

              <!-- Prix dynamique -->
              <div v-if="priceRecap" class="price-recap">
                <span class="price-recap-label">Estimation</span>
                <span class="price-recap-value">{{ priceRecap }}</span>
              </div>

              <div class="form-step-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="goToStep2"
                >
                  Continuer →
                </button>
              </div>
            </div>

            <!-- Step 2 -->
            <div v-if="currentStep === 2" class="form-step">
              <h3 class="form-step-title">Vos coordonnées</h3>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="res-name">Nom complet *</label>
                  <input
                    id="res-name"
                    v-model="form.name"
                    type="text"
                    class="form-input"
                    :class="{ error: errors.name }"
                    placeholder="Jean Dupont"
                    autocomplete="name"
                    @input="clearError('name')"
                  />
                  <span v-if="errors.name" class="form-error">{{
                    errors.name
                  }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="res-email"
                    >Adresse email *</label
                  >
                  <input
                    id="res-email"
                    v-model="form.email"
                    type="email"
                    class="form-input"
                    :class="{ error: errors.email }"
                    placeholder="jean@exemple.com"
                    autocomplete="email"
                    @input="clearError('email')"
                  />
                  <span v-if="errors.email" class="form-error">{{
                    errors.email
                  }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="res-message"
                  >Message ou demandes spéciales</label
                >
                <textarea
                  id="res-message"
                  v-model="form.message"
                  class="form-input form-textarea"
                  rows="4"
                  placeholder="Anniversaire, allergie, accessibilité, questions particulières..."
                  maxlength="500"
                ></textarea>
                <span class="form-helper">Optionnel — max 500 caractères</span>
              </div>

              <!-- Récap réservation -->
              <div
                v-if="bookingRecap"
                class="booking-recap"
                v-html="bookingRecap"
              ></div>

              <div class="form-step-footer">
                <button
                  type="button"
                  class="btn btn-ghost"
                  @click="currentStep = 1"
                >
                  ← Retour
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  :disabled="isSubmitting"
                  @click="submitForm"
                >
                  <span v-if="!isSubmitting">Envoyer ma demande</span>
                  <span v-else>Envoi en cours...</span>
                </button>
              </div>
            </div>

            <!-- Step 3 : Succès -->
            <div v-if="currentStep === 3" class="res-success">
              <div class="success-animation">
                <div class="success-circle">✓</div>
              </div>
              <h3 class="success-title">Demande envoyée !</h3>
              <p class="success-message">{{ successData.message }}</p>
              <p class="success-ref">
                Référence : <strong>{{ successData.id }}</strong>
              </p>
              <p class="success-next">
                Notre équipe vous contactera à l'adresse indiquée sous 48h pour
                confirmer votre voyage.
              </p>
              <div class="success-actions">
                <button class="btn btn-ghost" @click="resetForm">
                  Faire une nouvelle réservation
                </button>
                <RouterLink to="/destinations" class="btn btn-primary"
                  >Explorer d'autres destinations</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { DESTINATIONS_LIST, DESTINATIONS } from "../data/destinations.js";
import { useAOS } from "../composables/useAOS.js";

useAOS();

const route = useRoute();
const destinations = DESTINATIONS_LIST;
const currentStep = ref(1);
const isSubmitting = ref(false);
const stepLabels = ["Destination", "Vos infos", "Confirmation"];

const form = ref({
  destination: "",
  departureDate: "",
  travelers: "",
  name: "",
  email: "",
  message: "",
});

const errors = ref({});
const successData = ref({ message: "", id: "" });

// Date min = demain
const minDate = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
});

// Prix dynamique
const priceRecap = computed(() => {
  const dest = DESTINATIONS[form.value.destination];
  const travelers = parseInt(form.value.travelers) || 1;
  if (!dest) return null;
  const total = dest.price * travelers;
  return `Dès ${total.toLocaleString("fr-FR")}€ pour ${travelers} voyageur${travelers > 1 ? "s" : ""}`;
});

// Récap réservation step 2
const bookingRecap = computed(() => {
  const dest = DESTINATIONS[form.value.destination];
  if (!dest || !form.value.departureDate) return null;
  const date = new Date(form.value.departureDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const travelers = parseInt(form.value.travelers) || 1;
  const total = dest.price * travelers;
  return `<strong>Récapitulatif :</strong><br>
    Destination : <strong>${dest.title}</strong><br>
    Départ : <strong>${date}</strong> · Durée : <strong>${dest.duration}</strong><br>
    Voyageurs : <strong>${travelers}</strong> · Estimation : <strong>Dès ${total.toLocaleString("fr-FR")}€</strong>`;
});

function selectDestinationFromSidebar(id) {
  form.value.destination = id;
  clearError("destination");
}

function clearError(field) {
  errors.value = { ...errors.value, [field]: "" };
}

function validateStep1() {
  const e = {};
  if (!form.value.destination)
    e.destination = "Veuillez choisir une destination";
  if (!form.value.departureDate) {
    e.departureDate = "Date requise";
  } else if (new Date(form.value.departureDate) <= new Date()) {
    e.departureDate = "La date doit être dans le futur";
  }
  const t = parseInt(form.value.travelers);
  if (!form.value.travelers || isNaN(t) || t < 1 || t > 10) {
    e.travelers = "Entre 1 et 10 voyageurs";
  }
  errors.value = e;
  return Object.keys(e).length === 0;
}

function validateStep2() {
  const e = {};
  if (!form.value.name || form.value.name.trim().length < 2)
    e.name = "Nom requis (min 2 caractères)";
  if (!form.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
    e.email = "Email invalide";
  errors.value = e;
  return Object.keys(e).length === 0;
}

function goToStep2() {
  if (validateStep1()) currentStep.value = 2;
}

async function submitForm() {
  if (!validateStep2()) return;

  isSubmitting.value = true;
  const payload = {
    destination: form.value.destination,
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    travelers: parseInt(form.value.travelers),
    departureDate: form.value.departureDate,
    ...(form.value.message && { message: form.value.message.trim() }),
  };

  try {
    const res = await fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      successData.value = { message: data.message, id: data.id };
      currentStep.value = 3;
    } else {
      if (data.field) {
        errors.value = { [data.field]: data.error };
        if (
          ["destination", "departureDate", "travelers"].includes(data.field)
        ) {
          currentStep.value = 1;
        }
      } else {
        alert(data.error || "Une erreur est survenue");
      }
    }
  } catch {
    alert("Erreur de connexion. Réessayez dans quelques instants.");
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  form.value = {
    destination: "",
    departureDate: "",
    travelers: "",
    name: "",
    email: "",
    message: "",
  };
  errors.value = {};
  currentStep.value = 1;
}

onMounted(() => {
  const dest = route.query.destination;
  if (dest && DESTINATIONS[dest]) {
    form.value.destination = dest;
  }
});
</script>

<style scoped>
/* ── Page Hero ── */
.page-hero {
  min-height: 320px;
  display: flex;
  align-items: flex-end;
  padding: 6rem 2rem 3rem;
  text-align: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
  background:
    linear-gradient(to bottom, rgba(8, 6, 18, 0) 0%, var(--color-bg) 100%),
    radial-gradient(
      ellipse at 50% 0%,
      rgba(201, 169, 110, 0.1) 0%,
      transparent 70%
    );
}

.page-hero-content {
  max-width: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--color-text);
  line-height: 1.15;
}

.hero-accent {
  color: var(--color-gold);
  font-style: italic;
}

.page-hero-subtitle {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ── Reservation layout ── */
.reservation-section {
  padding: 5rem 0;
}

.reservation-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 4rem;
  align-items: start;
}

/* ── Sidebar ── */
.res-sidebar {
  position: sticky;
  top: 144px;
}

.res-sidebar-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

.res-dest-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.res-dest-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  width: 100%;
}

.res-dest-card:hover {
  border-color: rgba(201, 169, 110, 0.4);
}

.res-dest-card.selected {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 1px var(--color-gold);
}

.res-dest-image-wrap {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
}

.res-dest-fallback {
  position: absolute;
  inset: 0;
}

.res-dest-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.res-dest-era {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-gold);
  text-transform: uppercase;
}

.res-dest-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.res-dest-price {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.res-dest-select-icon {
  color: var(--color-text-muted);
  font-size: 1rem;
  flex-shrink: 0;
}

.res-trust-signals {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.trust-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

/* ── Étapes ── */
.res-steps {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.res-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex: 1;
  text-align: center;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: all 0.3s;
  background: var(--color-bg);
}

.res-step.active .step-number {
  border-color: var(--color-gold);
  color: var(--color-gold);
  box-shadow: 0 0 0 4px rgba(201, 169, 110, 0.15);
}

.res-step.done .step-number {
  border-color: var(--color-gold);
  background: var(--color-gold);
  color: #0a0800;
}

.step-label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.res-step.active .step-label {
  color: var(--color-gold);
}

.res-step-line {
  height: 1px;
  flex: 1;
  background: var(--color-border);
  margin-bottom: 1.4rem;
}

/* ── Formulaire ── */
.form-step {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
}

.form-step-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.form-input {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  font-size: 0.9rem;
  font-family: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.1);
}

.form-input.error {
  border-color: #e53e3e;
}

.form-select {
  appearance: none;
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-error {
  font-size: 0.78rem;
  color: #e53e3e;
}
.form-helper {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.price-recap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(201, 169, 110, 0.08);
  border: 1px solid rgba(201, 169, 110, 0.25);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
}

.price-recap-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-gold);
}

.price-recap-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.booking-recap {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.form-step-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

/* ── Succès ── */
.res-success {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(201, 169, 110, 0.15);
  border: 2px solid var(--color-gold);
  color: var(--color-gold);
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: success-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes success-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--color-text);
}

.success-message,
.success-next {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.success-ref {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
.success-ref strong {
  color: var(--color-gold);
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

@media (max-width: 900px) {
  .reservation-layout {
    grid-template-columns: 1fr;
  }
  .res-sidebar {
    position: static;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .form-step {
    padding: 1.5rem;
  }
}
</style>
