<script setup lang="ts">
import Video from '@/components/Video.vue'
import { useCall } from '@/composables/useCall'
import { onMounted } from 'vue'

const calls = useCall()

onMounted(() => {
    Object.keys(calls.value).forEach((id) => {
        const call = calls.value[id]

        if (!call.isAnswered) {
            call.mediaConnection.answer()
        }

        call.mediaConnection.on('stream', (mediaStream) => {
            call.mediaStreams.push(mediaStream)
        })
    })
})
</script>

<template>
    <div ref="videos" class="grid grid-cols-2 gap-4">
        <Video
            v-for="id in Object.keys(calls)"
            :key="id"
            :media-stream="calls[id].mediaStreams[0]"
        />
    </div>
</template>
