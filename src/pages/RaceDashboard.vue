<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue';

const route = useRoute()
const routeRef = ref(route)

function pageTitle(): string {
    const pathSegment = routeRef.value.path.replace('/', '')
    if (pathSegment === 'racers') {
        return 'Pilotos'
    } else {
        return 'Telemetria'
    }

}

</script>

<template>
    <div class="min-h-screen flex bg-zinc-900 text-zinc-200 font-sans">
        <!-- Sidebar -->
        <aside class="w-64 border-r border-zinc-700/60 bg-zinc-950 p-4">
            <Sidebar />
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col">
            <!-- Header -->
            <header class="h-16 border-b border-zinc-700/60 bg-zinc-900 flex items-center justify-between px-6">
                <h1 class="text-2xl font-semibold tracking-wide">{{ pageTitle() }}</h1>
                <div class="flex items-center gap-4">
                    <!-- Ejemplo: avatar o botones -->
                    <button
                        class="px-3 py-1.5 text-sm bg-zinc-800 rounded-md border border-zinc-700 hover:bg-zinc-700 transition">
                        Configuración
                    </button>
                </div>
            </header>

            <!-- Content Area -->
            <section class="flex-1 p-6 overflow-y-auto bg-zinc-900">
                <RouterView />
            </section>
        </main>
    </div>

</template>


<style scoped></style>