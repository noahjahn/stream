<script setup lang="ts">
import { ref, onMounted } from 'vue'
import app from '../services/app'
import type { Manager } from '../services/app'
import debounce from '../utils/debounce'

const thisPeerId = ref('')
const remotePeerIds = ref('')

async function startCall(manager: Manager) {
  try {
    if (!remotePeerIds.value) {
      alert('Please enter at least one peer ID')
      return
    }

    // TODO: this variable is a lie, right now it could be potential peers as well, not just connected peers
    manager.connectedPeers = remotePeerIds.value.split(',')

    const captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'browser',
      },
    })

    manager.connectedPeers.forEach((peer) => {
      manager.peer?.call(peer, captureStream)
    })

    return captureStream
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

onMounted(() => {
  const manager = app().setup((mediaStream) => {
    const videoElement = document.getElementById('video') as HTMLMediaElement

    videoElement.srcObject = mediaStream
    videoElement.play()
  })

  thisPeerId.value = manager.id

  document.getElementById('call')?.addEventListener(
    'click',
    debounce(() => {
      startCall(manager)
    }, 600),
  )
})
</script>

<template>
  <main>
    <div>
      <h1 class="text-4xl pb-8 dark:text-white">P2P screen sharing</h1>

      <p class="text-lg py-4 dark:text-white">
        <strong>Instructions for sharing your screen</strong>: Enter the peer ID(s) of the person(s)
        you want to send your stream to, then click the "Send Stream" button to start sending your
        stream. You will be prompted which window or screen to share.
        <i>Multiple IDs can be entered, separated by a comma (,)</i>
      </p>

      <p class="text-lg py-4 dark:text-white">
        <strong>Instructions for receiving a stream</strong>: You will be prompted to accept the
        incoming stream. Only accept streams from people you trust. You <i>do not</i> have to enter
        a peer ID to receive a stream.
      </p>
    </div>

    <div class="flex flex-col md:flex-row md:space-x-4 max-md:space-y-4 mb-4">
      <div class="w-full md:w-8/12">
        <label for="thisClientId" class="block mb-2 text-sm font-medium dark:text-white"
          >Your ID</label
        >
        <input
          v-model="thisPeerId"
          type="text"
          class="w-full bg-zinc-100 border border-zinc-400 text-sm rounded-lg block p-2.5 cursor-not-allowed dark:bg-zinc-900 dark:border-zinc-400 dark:placeholder-gray-400 dark:text-white"
          disabled
          autocomplete="off"
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
    <div class="w-full md:w-8/12">
      <button
        id="call"
        class="py-1 px-8 m-auto border border-foreground rounded-lg dark:text-white dark:border-white"
      >
        Send stream
      </button>
    </div>
    <video id="video"></video>
  </main>
</template>
