<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    srcObject: MediaStream,
})

onMounted(() => {
    if (!props.srcObject) {
        return
    }
    const video = document.getElementById(props.id) as HTMLMediaElement
    video.srcObject = props.srcObject
    video.play()
})
</script>

<template>
    <video :id="id" class="my-4 rounded-xl"></video>
</template>
