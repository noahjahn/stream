<script setup lang="ts">
import { onMounted } from 'vue'
import { useApp } from '@/composables/useApp'
import ReceivingCall from './components/ReceivingCall.vue'
import { router } from './routing/routes'
import { useCall } from '@/composables/useCall'
import type { Call } from '@/composables/useCall'
import MissingCallerError from './errors/missing-caller-error'

const app = useApp()
const call = useCall()

function handleApprove() {
    if (!app.value.incomingCall) {
        throw new MissingCallerError()
    }

    const { id } = app.value.incomingCall

    call.value[id] = app.value.incomingCall

    app.value.incomingCall = undefined
    router.push('call')
}

function handleDeny() {
    app.value.incomingCall = undefined
}

onMounted(() => {
    app.value.peer.on('call', (mediaConnection: Call['mediaConnection']) => {
        const id = mediaConnection.metadata?.id as string
        app.value.incomingCall = {
            id,
            mediaConnection,
            mediaStreams: [],
        }
    })
})
</script>

<template>
    <router-view></router-view>
    <ReceivingCall
        v-if="app.incomingCall"
        :remote-peer-id="app.incomingCall.id"
        @approve="handleApprove"
        @deny="handleDeny"
    />
</template>
