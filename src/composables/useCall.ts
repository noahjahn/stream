import { ref } from 'vue'
import type { DataConnection, MediaConnection } from 'peerjs'

export interface Call {
    id: string
    mediaConnection?: Omit<MediaConnection, 'provider'>
    dataConnection?: Omit<DataConnection, 'provider'>
    mediaStreams: Array<MediaStream>
    isAnswered?: boolean
}

const calls = ref<Record<string, Call>>({})

export function useCall() {
    return calls
}
