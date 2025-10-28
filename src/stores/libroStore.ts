// Guarda de datos de los libros
import type { Libro } from '@/models/libro'
import { defineStore } from 'pinia'

interface useBibliotecaStore {
  isLoading: boolean
  data: Libro[]
  error: string | null
}

export const useRacersStore = defineStore('racers', {
  state: (): useBibliotecaStore => ({
    isLoading: true,
    data: [],
    error: null,
  }),

  actions: {
    async fetchInitialData() {
      this.isLoading = true
      try {
        // Simulación de carga
        await new Promise((r) => setTimeout(r, 300))
        this.data = []
        this.error = null
      } catch (err) {
        this.error = 'Error al cargar los datos iniciales'
      } finally {
        this.isLoading = false
      }
    },

    //  Agregar un nuevo libro
    addLibro(libro: Libro) {
      const exists = this.data.some((l) => l.id === libro.id)
      if (exists) {
        this.error = `El libro con ID ${libro.id} ya existe`
        return
      }

      // Inicializamos páginas en "0" si no viene definido
      if (!libro.paginas) libro.paginas = 0

      this.data.push(libro)
      this.error = null
      console.log(`✅ Libro agregado: ${libro.titulo} ${libro.autor}`)
    },

    // Modificar el estado del libro
    updateEstado(id: number, nuevoEstado: boolean) {
      const libro = this.data.find((l) => l.id === id)
      if (!libro) {
        this.error = `No se encontró el libro con ID ${id}`
        return
      }

      libro.disponible = nuevoEstado
      this.error = null
      console.log(`Nuevo estado para ${libro.titulo}: ${nuevoEstado}`)
    },
  },

  getters: {
    // 🔹 Ordenar por nombre de libro (ascendente)
    sortedByTitulo: (state): Libro[] => {
      return [...state.data].sort((a, b) => a.titulo.localeCompare(b.titulo))
    },

    // 🔹 Ordenar alfabéticamente por autor
    sortedByAutor: (state): Libro[] => {
      return [...state.data].sort((a, b) => a.autor.localeCompare(b.autor))
    },

    // 🔹 Ordenar por cantidad de páginas (de menor a mayor).
    sortedByPaginas: (state): Libro[] => {
      return [...state.data].sort((a, b) => a.paginas - b.paginas)
    },

  },
})
