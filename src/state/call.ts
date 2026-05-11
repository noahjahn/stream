import { ref } from 'vue'
import type { MediaConnection } from 'peerjs'

type Call = {
    id: string
    mediaConnection: MediaConnection
    mediaStreams: Array<MediaStream>
    isAnswered?: boolean
}

type CallIndex = {
    [x: string]: Call
}

const calls = ref<CallIndex>({})

export function useCall() {
    return calls
}

export type { Call }
