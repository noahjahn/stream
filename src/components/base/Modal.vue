<script setup lang="ts"></script>

<template>
    <div
        class="fixed inset-0 z-999 grid h-screen w-screen place-items-center bg-opacity-90 backdrop-blur-sm transition-opacity duration-300"
    >
        <div
            class="relative p-8 w-3/10 rounded-lg -top-20 shadow-sm grid gap-4 border bg-zinc-100 border-zinc-400 shadow-zinc-500 dark:border-zinc-950 dark:bg-zinc-900 dark:text-white dark:shadow-zinc-950"
        >
            <slot />
        </div>
    </div>
</template>
