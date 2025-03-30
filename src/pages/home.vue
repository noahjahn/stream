<script setup lang="ts">
import { Peer } from "peerjs";
import { Button } from "components/ui/button";
import { v4 as uuid } from "uuid";
import { useMounted } from "@vueuse/core";

const isMounted = useMounted();

const manager = {
  peer: undefined as Peer | undefined,
  clientPeerId: uuid(),
  remotePeerId: undefined as string | undefined,
};

const init = () => {
  manager.peer = new Peer(manager.clientPeerId);
  (document.getElementById("client-peer-id") as HTMLInputElement).value =
    manager.clientPeerId;

  manager.peer.on("call", (call) => {
    call.answer();
    call.on("stream", (remoteStream) => {
      if (
        confirm(
          `You are receiving a stream from ${call.peer}, do you want to view their stream (only accept someone you trust)?`,
        )
      ) {
        const videoElement = document.getElementById(
          "video",
        ) as HTMLMediaElement;

        videoElement.srcObject = remoteStream;
        videoElement.play();
      }
    });
  });
};

const debounce = (callback: Function, wait: number) => {
  let timeoutId: number | undefined = undefined;
  return (...args: unknown[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const handleInputChanges = (event: Event) => {
  const id = (event?.target as HTMLInputElement).value;
  manager.remotePeerId = id;
};

const handleInputChangesWithDebounce = debounce(handleInputChanges, 600);

const remotePeerIdElement = document.getElementById("remote-peer-id");
remotePeerIdElement?.addEventListener("keyup", handleInputChangesWithDebounce);
remotePeerIdElement?.addEventListener("change", handleInputChangesWithDebounce);

const startCall = async () => {
  try {
    const captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "browser",
      },
    });

    manager.peer?.call(manager.remotePeerId!, captureStream);

    return captureStream;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const startCallWithDebounce = debounce(startCall, 600);

if (isMounted.value) {
  const callButton = document.getElementById("call");
  callButton?.addEventListener("click", startCallWithDebounce);
}
</script>

<template>
  <main>
    <div>
      <h1 class="pb-8 text-4xl dark:text-white">P2P screen sharing</h1>

      <p class="py-4 text-lg dark:text-white">
        <strong>Instructions for sharing your screen</strong>: Enter the peer ID
        of the person you want to send your stream to, then click the button
        below to start sending your stream. You will be prompted which window or
        screen to share.
      </p>

      <p class="py-4 text-lg dark:text-white">
        <strong>Instructions for receiving a stream</strong>: You will be
        prompted to accept the incoming stream. Only accept streams from people
        you trust. You <i>do not</i> have to enter a peer ID to receive a
        stream.
      </p>
    </div>

    <div class="flex flex-col mb-4 md:flex-row md:space-x-4 max-md:space-y-4">
      <div class="w-full md:w-8/12">
        <label
          for="client-peer-id"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your ID</label
        >
        <input
          id="client-peer-id"
          type="text"
          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          disabled
          autocomplete="off"
        />
      </div>
      <div class="w-full md:w-8/12">
        <label
          for="remote-peer-id"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Peer ID</label
        >
        <input
          id="remote-peer-id"
          type="text"
          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          autocomplete="off"
        />
      </div>
    </div>
    <div class="w-full md:w-8/12">
      <Button
        id="call"
        class="px-8 py-1 m-auto border rounded-lg dark:bg-green-600 dark:border-green-500 dark:text-white"
      >
        Send Stream
      </Button>
    </div>
    <video id="video"></video>
  </main>
</template>

<style lang="css" scoped>
main {
  margin: auto;
  padding: 1rem;
  width: 800px;
  max-width: calc(100% - 2rem);
  color: white;
  font-size: 20px;
  line-height: 1.6;
}
.astro-a {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translatex(-50%);
  width: 220px;
  height: auto;
  z-index: -1;
}
h1 {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  margin-bottom: 1em;
}
.text-gradient {
  background-image: var(--accent-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  background-position: 0%;
}
.instructions {
  margin-bottom: 2rem;
  border: 1px solid rgba(var(--accent-light), 25%);
  background: linear-gradient(
    rgba(var(--accent-dark), 66%),
    rgba(var(--accent-dark), 33%)
  );
  padding: 1.5rem;
  border-radius: 8px;
}
.instructions code {
  font-size: 0.8em;
  font-weight: bold;
  background: rgba(var(--accent-light), 12%);
  color: rgb(var(--accent-light));
  border-radius: 4px;
  padding: 0.3em 0.4em;
}
.instructions strong {
  color: rgb(var(--accent-light));
}
.link-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
  gap: 2rem;
  padding: 0;
}
img:hover {
  cursor: pointer;
}
</style>
