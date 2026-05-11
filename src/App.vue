<script setup lang="ts">
import { onMounted } from 'vue'
import { useApp } from '@/state/app'
import type { MediaConnection } from 'peerjs'
import ReceivingCall from './components/ReceivingCall.vue'
import { router } from './routing/routes'
import { useCall, type Call } from './state/call'
import MissingCallerError from './errors/missing-caller-error'

const app = useApp()
const call = useCall()

function handleApprove() {
    if (!app.value.incomingCall) {
        throw new MissingCallerError()
    }

    const { id } = app.value.incomingCall

    // TODO: why do I have to explicity define the type here?
    call.value[id] = app.value.incomingCall as Call

    app.value.incomingCall = undefined
    router.push('call')
}

function handleDeny() {
    app.value.incomingCall = undefined
}

onMounted(() => {
    app.value.peer.on('call', (call: MediaConnection) => {
        const id = call.metadata?.id as string
        app.value.incomingCall = {
            id,
            mediaConnection: call,
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
