<script setup lang="ts">
import LibrosForm from './LibrosForm.vue';
import LibrosList from './LibrosList.vue';


</script>
<template>
    <div class="grid grid-cols-5 gap-6 w-full h-full">
        <!-- Columna izquierda: formulario -->
        <div class="col-span-3 bg-zinc-950 border border-zinc-700/60 rounded-2xl p-4 shadow-inner flex flex-col">
            <!-- Aquí se insertará el formulario más adelante -->
            <div class="flex-1flex items-center justify-start text-zinc-600 italic">
                <LibrosForm class="w-100" />
            </div>
        </div>

        <!-- Columna derecha: lista de corredores -->
        <div class="col-span-2 bg-zinc-950 border border-zinc-700/60 rounded-2xl p-6 shadow-inner flex flex-col">

            <!-- Aquí se insertará la lista de pilotos más adelante -->
            <LibrosList />
        </div>
    </div>
</template>

<style scoped></style>