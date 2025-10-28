<template>
  <section class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg text-zinc-200">
    <h2 class="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-3">Ingresar nuevo piloto</h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="nombre">Nombre</label>
        <input
          v-model="form.nombre"
          id="nombre"
          type="text"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="apellido">Apellido</label>
        <input
          v-model="form.apellido"
          id="apellido"
          type="text"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="numero">Número de piloto</label>
        <input
          v-model.number="form.numero"
          id="numero"
          type="number"
          min="0"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="escuderia">Escudería</label>
        <input
          v-model="form.escuderia"
          id="escuderia"
          type="text"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="recordVuelta"
          >Récord de vuelta (mm:ss:mmss)</label
        >
        <input
          v-model="form.recordVuelta"
          id="recordVuelta"
          type="text"
          placeholder="0"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition-all"
      >
        Agregar Piloto
      </button>

      <!-- Mensajes de estado -->
      <p v-if="successMessage" class="text-emerald-400 text-center mt-4">
        {{ successMessage }}
      </p>

      <p v-if="store.error" class="text-red-400 text-center mt-2">
        {{ store.error }}
      </p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRacersStore } from '@/stores/libroStore'
import type { Racer } from '@/models/libro'

const store = useRacersStore()

const form = ref<Racer>({
  nombre: '',
  apellido: '',
  numero: 0,
  escuderia: '',
  recordVuelta: '0',
})

const successMessage = ref('')

const resetForm = () => {
  form.value = {
    nombre: '',
    apellido: '',
    numero: 0,
    escuderia: '',
    recordVuelta: '0',
  }
}

const handleSubmit = () => {
  store.addRacer({ ...form.value })
  if (!store.error) {
    successMessage.value = '✅ Piloto agregado correctamente'
    resetForm()
    setTimeout(() => (successMessage.value = ''), 3000)
  }
}
</script>
