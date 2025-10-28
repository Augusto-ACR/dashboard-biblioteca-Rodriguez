<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBibliotecaStore } from '@/stores/libroStore'

const store = useBibliotecaStore()
const orden = ref<'titulo' | 'autor' | 'paginas'>('titulo') // valor del select

onMounted(() => {
  if (store.isLoading) {
    store.fetchInitialData()
  }
})

// 🔹 Usa los getters del store según el select
const sortedlibros = computed(() => {
  if (orden.value === 'autor') return store.sortedByAutor
  if (orden.value === 'paginas') return store.sortedByPaginas
  return store.sortedByTitulo
})

const isLoading = computed(() => store.isLoading)

// Funciones auxiliares para devolver clases según el estado
const estadoClass = (disponible: boolean) =>
  disponible
    ? 'rounded-xl p-4 transition-colors flex justify-between items-center bg-zinc-800 border border-emerald-700 hover:bg-zinc-700'
    : 'rounded-xl p-4 transition-colors flex justify-between items-center bg-zinc-800 border border-red-700 hover:bg-zinc-700/80'

const badgeClass = (disponible: boolean) =>
  disponible
    ? 'text-xs font-semibold px-2 py-1 rounded-full bg-emerald-600 text-white'
    : 'text-xs font-semibold px-2 py-1 rounded-full bg-red-600 text-white'

const buttonClass = (disponible: boolean) =>
  disponible
    ? 'rounded-xl px-4 py-2 transition-colors text-sm font-medium bg-red-600 hover:bg-red-500 text-white'
    : 'rounded-xl px-4 py-2 transition-colors text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white'
</script>

<template>
  <section class="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg text-zinc-200">
    <header class="mb-6 border-b border-zinc-700 pb-3 flex justify-between items-center">
      <h2 class="text-2xl font-semibold tracking-wide">Lista de Pilotos</h2>

      <!-- 🔹 Selector de orden -->
      <select
        v-model="orden"
        name="orden"
        id="orden"
        class="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="titulo">Título</option>
        <option value="autor">Autor</option>
        <option value="paginas">Páginas</option>
      </select>
    </header>

    <!-- 🔹 Estado de carga -->
    <div v-if="isLoading" class="text-center py-6 text-zinc-400">Cargando libros...</div>

    <!-- 🔹 Si no hay libros -->
    <div v-else-if="sortedlibros.length === 0" class="text-center py-6 text-zinc-500 italic">
      No hay libros registrados aún.
    </div>

    <!-- 🔹 Lista de libros -->
    <ul v-else class="space-y-4">
      <template v-for="libro in sortedlibros" :key="libro.id">
        <!-- Variante cuando está disponible -->
        <li v-if="libro.disponible" :class="estadoClass(libro.disponible)">
          <div class="flex items-center gap-4">
            <div>
              <div class="flex items-center gap-3">
                <span :class="badgeClass(libro.disponible)">{{
                  libro.disponible ? 'Disponible' : 'Prestado'
                }}</span>

                <p class="text-lg font-medium">
                  #{{ libro.id }} — {{ libro.titulo }} ({{ libro.paginas }} pág.)
                </p>
              </div>

              <p class="text-sm text-zinc-400">Autor: {{ libro.autor }}</p>
            </div>
          </div>

          <button
            :class="buttonClass(libro.disponible)"
            @click="store.updateEstado(libro.id, !libro.disponible)"
          >
            {{ libro.disponible ? 'Prestar' : 'Devolver' }}
          </button>
        </li>

        <!-- Variante cuando está prestado -->
        <li v-else :class="estadoClass(libro.disponible)">
          <div class="flex items-center gap-4">
            <div>
              <div class="flex items-center gap-3">
                <span :class="badgeClass(libro.disponible)">{{
                  libro.disponible ? 'Disponible' : 'Prestado'
                }}</span>

                <p class="text-lg font-medium">
                  #{{ libro.id }} — {{ libro.titulo }} ({{ libro.paginas }} pág.)
                </p>
              </div>

              <p class="text-sm text-zinc-400">Autor: {{ libro.autor }}</p>
            </div>
          </div>

          <button
            :class="buttonClass(libro.disponible)"
            @click="store.updateEstado(libro.id, !libro.disponible)"
          >
            {{ libro.disponible ? 'Prestar' : 'Devolver' }}
          </button>
        </li>
      </template>
    </ul>
  </section>
</template>
