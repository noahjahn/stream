import { ref } from 'vue'
import { Peer } from 'peerjs'
import { v4 as uuid } from 'uuid'
import type { Call } from './call'

type App = {
    id: string
    peer: Peer
    connectedPeers: string[]
    incomingCall?: Call
}

function init(): App {
    const id = uuid()

    return {
        id,
        peer: new Peer(id),
        connectedPeers: [],
    }
}

const app = ref(init())

export function useApp() {
    return app
}

export type { App }
