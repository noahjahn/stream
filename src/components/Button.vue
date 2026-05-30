<script setup lang="ts">
import { ref } from 'vue'
export type ButtonState = 'default' | 'success' | 'failure' | 'error'

interface ButtonProps {
    state?: ButtonState
}

const { state = 'default' } = defineProps<ButtonProps>()

const classes = ref('')

switch (state as ButtonState) {
    case 'success':
        classes.value = 'border-emerald-800 text-emerald-800 bg-emerald-200'
        break
    case 'failure':
    case 'error':
        classes.value = 'border-rose-800 text-rose-800 bg-rose-200'
        break
    default:
        classes.value = 'dark:text-white dark:border-zinc-300'
}
</script>

<template>
    <button class="py-1 cursor-pointer px-8 border rounded-lg" :class="classes">
        <slot />
    </button>
</template>
