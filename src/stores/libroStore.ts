// Guarda de datos de los libros
import type { Libro } from '@/models/libro'
import { defineStore } from 'pinia'

interface useBibliotecaState {
  isLoading: boolean
  data: Libro[]
  error: string | null
}

export const useBibliotecaStore = defineStore('libros', {
  state: (): useBibliotecaState => ({
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
      // Ignoramos el id que venga del formulario y asignamos un id incremental
      // id = max(id existente) + 1 (comienza en 1 si no hay libros)
      const maxId = this.data.reduce((max, l) => Math.max(max, l.id), 0)
      const newId = maxId + 1

      const libroToAdd: Libro = { ...libro, id: newId }

      // Inicializamos páginas en "0" si no viene definido
      if (!libroToAdd.paginas) libroToAdd.paginas = 0

      this.data.push(libroToAdd)
      this.error = null
      console.log(`✅ Libro agregado (ID ${newId}): ${libroToAdd.titulo} ${libroToAdd.autor}`)
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
