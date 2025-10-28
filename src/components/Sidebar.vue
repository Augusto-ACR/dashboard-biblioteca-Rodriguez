<script setup lang="ts">
import { ref, type Ref } from 'vue';


interface Section {
    name: string,
    route: string,
    isActive: boolean
}


const sections: Ref<Section[]> = ref<Section[]>([
    { name: 'Pilotos', route: '/racers', isActive: false },
    { name: 'Telemetria', route: '/telemetry', isActive: false }
]);


</script>
<template>

    <div class="w-full h-[100px] overflow-hidden relative rounded-md ">
        <img src="https://img.icons8.com/ios_filled/512/FFFFFF/formula-1.png" alt="f1 logo"
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
        © 2025 Matias Orellana para ITS
    </div>

</template>

<style scoped></style>