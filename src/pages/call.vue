<script setup lang="ts">
import Video from '@/components/Video.vue'
import { useCall } from '@/state/call'
import { onMounted, createApp, ref } from 'vue'

const calls = useCall()
const videos = ref()

onMounted(() => {
    Object.keys(calls.value).forEach((id) => {
        const call = calls.value[id]

        if (!call.isAnswered) {
            call.mediaConnection.answer()
        }

        call.mediaConnection.on('stream', function (mediaStream) {
            call.mediaStreams.push(mediaStream)

            // TODO: I'm not happy with this, but is required for a race condition!
            const MediaComponent = createApp(Video, {
                mediaStream,
            })

            MediaComponent.mount(videos.value)
        })
    })
})
</script>

<template>
    <div ref="videos" class="grid grid-cols-2 gap-4"></div>
</template>
