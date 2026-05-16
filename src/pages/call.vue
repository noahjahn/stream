<script setup lang="ts">
import Video from '@/components/Video.vue'
import { useCall } from '@/composables/useCall'
import { onMounted } from 'vue'
import { router } from '@/routing/routes'
import Button from '@/components/Button.vue'

const calls = useCall()

onMounted(() => {
    Object.keys(calls.value).forEach((id) => {
        const call = calls.value[id]

        if (!call.isAnswered) {
            call.mediaConnection?.answer()
        }

        call.mediaConnection?.on('stream', (mediaStream) => {
            call.mediaStreams.push(mediaStream)
        })
    })
})

function endCall() {
    Object.keys(calls.value).forEach((id) => {
        const call = calls.value[id]
        call.mediaConnection?.close()
        call.dataConnection?.close()
    })

    router.push({ name: 'home' })
}
</script>

<template>
    <div ref="videos" class="grid grid-cols-2 gap-4">
        <Video
            v-for="id in Object.keys(calls)"
            :key="id"
            :media-stream="calls[id].mediaStreams[0]"
        />
    </div>
    <div class="flex justify-center">
        <Button state="failure" @click="endCall">
            <i class="fa-solid fa-phone-slash"></i> End call
        </Button>
    </div>
</template>
