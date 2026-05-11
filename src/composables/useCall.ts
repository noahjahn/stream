import { ref } from 'vue'
import type { MediaConnection } from 'peerjs'

export interface Call {
    id: string
    mediaConnection: Omit<MediaConnection, 'provider'>
    mediaStreams: Array<MediaStream>
    isAnswered?: boolean
}

const calls = ref<Record<string, Call>>({})

export function useCall() {
    return calls
}
