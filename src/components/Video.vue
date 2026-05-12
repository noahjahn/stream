<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue'

const { mediaStream } = defineProps({
    mediaStream: MediaStream,
})

const video = useTemplateRef('video')

watchEffect(() => {
    if (!mediaStream) {
        return
    }

    if (!video.value) {
        return
    }

    const videoElement = video.value as HTMLVideoElement

    videoElement.srcObject = mediaStream
    if ('srcObject' in videoElement) {
        videoElement.srcObject = mediaStream
    } else {
        // @ts-expect-error MDN recommends supporting old browsers like this. See: [Supporting fallback to the src property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject#supporting_fallback_to_the_src_property)
        ;(videoElement as HTMLVideoElement).src = URL.createObjectURL(mediaStream)
    }

    videoElement.play()
})
</script>

<template>
    <video ref="video" class="w-full my-4 rounded-xl border-2 shadow-md"></video>
</template>
