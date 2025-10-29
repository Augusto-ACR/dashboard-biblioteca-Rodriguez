<script setup lang="ts">
import { ref } from 'vue'
import { useBibliotecaStore } from '@/stores/libroStore'
import type { Libro } from '@/models/libro'

const store = useBibliotecaStore()



const form = ref<Libro>({
  id: 0,
  titulo: '',
  autor: '',
  paginas: 0,
  disponible: true,
})

const successMessage = ref('')

const resetForm = () => {
  form.value = {
  id: 0,
  titulo: '',
  autor: '',
  paginas: 0,
  disponible: true,
  }
}

const handleSubmit = () => {
  store.addLibro({ ...form.value })
  if (!store.error) {
    successMessage.value = '✅ Libro agregado correctamente'
    resetForm()
    setTimeout(() => (successMessage.value = ''), 3000)
  }
}
</script>
<template>
  <section class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg text-zinc-200">
    <h2 class="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-3">Ingresar nuevo piloto</h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="titulo">Titulo del libro</label>
        <input
          v-model="form.titulo"
          id="titulo"
          type="text"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="autor">Autor del libro</label>
        <input
          v-model="form.autor"
          id="autor"
          type="text"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-zinc-400 text-lg mb-1" for="paginas">Número de paginas</label>
        <input
          v-model.number="form.paginas"
          id="paginas"
          type="number"
          min="0"
          class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition-all"
      >
        Agregar Libro
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


