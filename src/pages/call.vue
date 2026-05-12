<script setup lang="ts">
import Video from '@/components/Video.vue'
import { useCall } from '@/composables/useCall'
import { onMounted, createApp, useTemplateRef } from 'vue'

const calls = useCall()
const videos = useTemplateRef('videos')

onMounted(() => {
    Object.keys(calls.value).forEach((id) => {
        const call = calls.value[id]

        if (!call.isAnswered) {
            call.mediaConnection.answer()
        }

        call.mediaConnection.on('stream', (mediaStream) => {
            call.mediaStreams.push(mediaStream)

            // TODO: I'm not happy with this, but is required for a race condition!
            const VideoComponent = createApp(Video, {
                mediaStream,
            })

            if (!videos.value) return

            VideoComponent.mount(videos.value)
        })
    })
})
</script>

<template>
    <div ref="videos" class="grid grid-cols-2 gap-4" />
</template>
