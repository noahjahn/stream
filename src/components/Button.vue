<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
export type ButtonState = 'success' | 'failure' | 'error'

const props = defineProps({
    state: {
        type: String as PropType<ButtonState>,
    },
})

const { state } = props

const classes = ref('')

switch (state as ButtonState) {
    case 'success':
        classes.value = 'border-emerald-800 text-emerald-800 bg-emerald-200'
        break
    case 'failure':
    case 'error':
        classes.value = 'border-rose-800 text-rose-800 bg-rose-200'
        break
}
</script>

<template>
    <button
        class="py-1 cursor-pointer px-8 border rounded-lg dark:text-white dark:border-zinc-300"
        :class="classes"
    >
        <slot />
    </button>
</template>
