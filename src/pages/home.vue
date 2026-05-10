<script setup lang="ts">
import { ref, onMounted } from 'vue'
import debounce from '@/utils/debounce'
import { useClipboard } from '@vueuse/core'
import { useApp } from '@/state/app'
import type { MediaConnection } from 'peerjs'
import ReceivingCall from '@/components/ReceivingCall.vue'
import MissingValueError from '@/errors/missing-value-error'
import MissingCallerError from '@/errors/missing-caller-error'
import Media from '@/components/Media.vue'

const app = useApp()

const remotePeerIds = ref('')

const errorMessage = ref('')

const receivingCall = ref(false)
const incomingCallPeerId = ref('')
const incomingMediaStream = ref<MediaStream | undefined>()
const incomingCall = ref<MediaConnection | undefined>()

const displayVideo = ref(false)

async function startCall() {
    try {
        if (!remotePeerIds.value) {
            throw new MissingValueError('Peer ID')
        }

        // TODO: this variable is a lie, right now it could be potential peers as well, not just connected peers
        app.value.connectedPeers = remotePeerIds.value.split(',')

        const captureStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                displaySurface: 'browser',
            },
        })

        app.value.connectedPeers.forEach((peer) => {
            app.value.peer?.call(peer, captureStream, {
                metadata: {
                    id: app.value.id,
                },
            })
        })

        return captureStream
    } catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message
        }
        console.error(`Error: ${error}`)
    }
}

function answerCall(call: MediaConnection) {
    call.answer()
    call.on('stream', function (mediaStream) {
        displayVideo.value = true
        incomingMediaStream.value = mediaStream
    })
}

function handleApprove() {
    receivingCall.value = false

    if (!incomingCall.value) {
        throw new MissingCallerError()
    }

    answerCall(incomingCall.value)
}

function handleDeny() {
    receivingCall.value = false
    incomingCall.value = undefined
    displayVideo.value = false
    incomingMediaStream.value = undefined
}

onMounted(() => {
    app.value.peer.on('call', (call: MediaConnection) => {
        incomingCallPeerId.value = call.metadata?.id
        receivingCall.value = true
        incomingCall.value = call
    })

    // TODO: use vue @click event
    document.getElementById('call')?.addEventListener(
        'click',
        debounce(() => {
            startCall()
        }, 600),
    )
})

const { copy } = useClipboard({ source: app.value.id })
</script>

<template>
    <main>
        <div>
            <h1 class="text-4xl pb-8 dark:text-white">P2P screen sharing</h1>

            <p class="text-lg py-4 dark:text-white">
                <strong>Instructions for sharing your screen</strong>: Enter the peer ID(s) of the
                person(s) you want to send your stream to, then click the "Send Stream" button to
                start sending your stream. You will be prompted which window or screen to share.
                <i>Multiple IDs can be entered, separated by a comma (,)</i>
            </p>

            <p class="text-lg py-4 dark:text-white">
                <strong>Instructions for receiving a stream</strong>: You will be prompted to accept
                the incoming stream. Only accept streams from people you trust. You
                <i>do not</i> have to enter a peer ID to receive a stream.
            </p>
        </div>

        <div class="flex flex-col md:flex-row md:space-x-4 max-md:space-y-4 mb-4">
            <div class="w-full md:w-8/12">
                <label for="thisClientId" class="block mb-2 text-sm font-medium dark:text-white"
                    >Your ID</label
                >
                <!-- TODO: the mouse event won't fire on most browsers because the input is disabled. Create a separate copy button instead -->
                <input
                    v-model="app.id"
                    type="text"
                    class="w-full bg-zinc-100 border border-zinc-400 text-sm rounded-lg block p-2.5 cursor-not-allowed dark:bg-zinc-900 dark:border-zinc-400 dark:placeholder-gray-400 dark:text-white"
                    disabled
                    autocomplete="off"
                    @mousedown="copy(app.id)"
                />
            </div>
            <div class="w-full md:w-8/12">
                <label
                    for="remotePeerIds"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Peer IDs</label
                >
                <input
                    v-model="remotePeerIds"
                    type="text"
                    class="w-full bg-zinc-50 border border-zinc-400 text-sm rounded-lg block p-2.5 dark:bg-zinc-950 dark:border-zinc-400 dark:placeholder-gray-400 dark:text-white"
                    required
                    autocomplete="off"
                />
            </div>
        </div>
        <div class="w-full">
            <button
                id="call"
                class="py-1 px-8 m-auto border border-foreground rounded-lg dark:text-white dark:border-white"
            >
                Send stream
            </button>
        </div>
        <div
            v-if="errorMessage"
            class="my-4 rounded-2xl border-2 border-rose-800 bg-rose-200 text-rose-800 p-4"
        >
            <p class="font-bold">An error occurred. Here are the details:</p>
            <p>{{ errorMessage }}</p>
        </div>
        <Media v-if="displayVideo" :id="incomingCallPeerId" :src-object="incomingMediaStream" />
        <ReceivingCall
            v-if="receivingCall"
            :remote-peer-id="incomingCallPeerId"
            @approve="handleApprove"
            @deny="handleDeny"
        />
    </main>
</template>
