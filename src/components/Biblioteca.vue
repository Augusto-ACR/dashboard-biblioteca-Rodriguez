<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBibliotecaStore } from '@/stores/libroStore'

const store = useBibliotecaStore()

onMounted(() => {
  if (store.isLoading) store.fetchInitialData()
})

const disponibles = computed(() => store.data.filter((l) => l.disponible))
const prestados = computed(() => store.data.filter((l) => !l.disponible))
const total = computed(() => store.data.length)

const toggleEstado = (id: number) => {
  const libro = store.data.find((l) => l.id === id)
  if (!libro) return
  store.updateEstado(id, !libro.disponible)
}
</script>

<template>
  <section class="space-y-6">
    <!-- Resumen -->
    <div class="flex gap-4">
      <div class="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-center w-1/3">
        <p class="text-sm text-zinc-400">Total de libros</p>
        <p class="text-2xl font-bold">{{ total }}</p>
      </div>

      <div class="bg-zinc-800 border border-emerald-700 rounded-xl p-4 text-center w-1/3">
        <p class="text-sm text-zinc-400">Disponibles</p>
        <p class="text-2xl font-bold text-emerald-400">{{ disponibles.length }}</p>
      </div>

      <div class="bg-zinc-800 border border-red-700 rounded-xl p-4 text-center w-1/3">
        <p class="text-sm text-zinc-400">Prestados</p>
        <p class="text-2xl font-bold text-red-400">{{ prestados.length }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Disponibles -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Libros disponibles</h3>
        <ul class="space-y-3">
          <li
            v-for="libro in disponibles"
            :key="libro.id"
            class="bg-zinc-800 border border-emerald-700 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p class="font-medium">#{{ libro.id }} — {{ libro.titulo }}</p>
              <p class="text-sm text-zinc-400">
                Autor: {{ libro.autor }} · {{ libro.paginas }} pág.
              </p>
            </div>

            <button
              class="rounded-xl px-4 py-2 bg-red-600 hover:bg-red-500 text-white"
              @click="toggleEstado(libro.id)"
            >
              Prestar
            </button>
          </li>
        </ul>
      </div>

      <!-- Prestados -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Libros prestados</h3>
        <ul class="space-y-3">
          <li
            v-for="libro in prestados"
            :key="libro.id"
            class="bg-zinc-800 border border-red-700 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p class="font-medium">#{{ libro.id }} — {{ libro.titulo }}</p>
              <p class="text-sm text-zinc-400">
                Autor: {{ libro.autor }} · {{ libro.paginas }} pág.
              </p>
            </div>

            <button
              class="rounded-xl px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white"
              @click="toggleEstado(libro.id)"
            >
              Devolver
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
