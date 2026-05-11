<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
    mediaStream: {
        type: MediaStream,
        required: true,
    },
})

const video = ref()

onMounted(() => {
    const videoElement = video.value as HTMLVideoElement

    videoElement.srcObject = props.mediaStream
    if ('srcObject' in videoElement) {
        videoElement.srcObject = props.mediaStream
    } else {
        // @ts-expect-error MDN recommends supporting old browsers like this. See: [Supporting fallback to the src property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject#supporting_fallback_to_the_src_property)
        ;(videoElement as HTMLVideoElement).src = URL.createObjectURL(props.mediaStream)
    }

    videoElement.play()
})
</script>

<template>
    <video ref="video" class="w-full my-4 rounded-xl border-2 shadow-md"></video>
</template>
