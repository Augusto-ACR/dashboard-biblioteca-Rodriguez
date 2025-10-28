<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRacersStore } from '@/stores/libroStore'

const store = useRacersStore()

onMounted(() => {
  if (store.isLoading) {
    store.fetchInitialData()
  }
})

const sortedRacers = computed(() => store.sortedByNumber)
const isLoading = computed(() => store.isLoading)
const totalRacers = computed(() => store.totalRacers)
</script>

<template>
  <section class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg text-zinc-200">
    <header class="mb-6 border-b border-zinc-700 pb-3 flex justify-between items-center">
      <h2 class="text-2xl font-semibold tracking-wide">Lista de Pilotos</h2>
      <span class="text-sm text-zinc-500"> Total: {{ totalRacers }} </span>
    </header>

    <div v-if="isLoading" class="text-center py-6 text-zinc-400">Cargando pilotos...</div>

    <div v-else-if="sortedRacers.length === 0" class="text-center py-6 text-zinc-500 italic">
      No hay pilotos registrados aún.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="racer in sortedRacers"
        :key="racer.numero"
        class="bg-zinc-800 border border-zinc-700 rounded-xl p-4 hover:bg-zinc-700 transition-colors flex justify-between items-center"
      >
        <div>
          <p class="text-lg font-medium">
            #{{ racer.numero }} — {{ racer.nombre }} {{ racer.apellido }}
          </p>
          <p class="text-sm text-zinc-400">Escudería: {{ racer.escuderia }}</p>
        </div>

        <div class="text-right">
          <p class="text-sm text-zinc-400">Récord de vuelta</p>
          <p
            class="text-lg font-semibold"
            :class="racer.recordVuelta === '0' ? 'text-zinc-500' : 'text-emerald-400'"
          >
            {{ racer.recordVuelta === '0' ? '—' : racer.recordVuelta }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
