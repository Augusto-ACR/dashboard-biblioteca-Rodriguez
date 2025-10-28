<script setup lang="ts">
import { ref, type Ref } from 'vue';


interface Section {
    name: string,
    route: string,
    isActive: boolean
}


const sections: Ref<Section[]> = ref<Section[]>([
    { name: 'Libros', route: '/libros/nuevo', isActive: false },
    { name: 'biblioteca', route: '/libros', isActive: false }
]);


</script>
<template>

<div class="w-full h-[100px] overflow-hidden relative rounded-md ">
    <img src="@/assets/128dbd88-1fe3-4528-8955-5e920a006fa4.png" alt="libro abierto"
        class="w-full h-full object-cover object-center">
</div>



    <!-- Navegación -->
    <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink v-for="(section, index) in sections" :key="index" :to="section.route" class="flex items-center px-4 py-2.5 rounded-lg border border-transparent text-sm font-medium transition-colors duration-200
               hover:bg-zinc-800 hover:border-zinc-700 hover:text-zinc-100"
            :class="{ 'bg-zinc-800 border-zinc-700 text-white': section.isActive }">
            <!-- Puedes agregar íconos aquí si lo deseas -->
            <span class="ml-1">{{ section.name }}</span>
        </RouterLink>
    </nav>

    <!-- Pie de barra lateral -->
    <div class="border-t border-zinc-700/60 px-4 py-3 text-xs text-zinc-500">
        © 2025 Augusto Rodirguez para FronEnd
    </div>

</template>

<style scoped></style>