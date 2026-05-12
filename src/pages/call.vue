<script setup lang="ts">
import Video from '@/components/Video.vue'
import { useCall } from '@/composables/useCall'
import { onMounted } from 'vue'
import { router } from '@/routing/routes'

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

function endCall() {
    Object.keys(calls.value).forEach((id) => {
        const call = calls.value[id]
        call.mediaConnection.close()
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
        <button
            id="deny"
            class="py-1 cursor-pointer px-8 border rounded-lg border-rose-800 text-rose-800 bg-rose-200"
            @click="endCall"
        >
            <i class="fa-solid fa-phone-slash"></i> End call
        </button>
    </div>
</template>
