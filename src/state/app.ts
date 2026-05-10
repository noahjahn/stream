import { ref } from 'vue'

import { Peer } from 'peerjs'
import { v4 as uuid } from 'uuid'

type App = {
    id: string
    peer: Peer
    connectedPeers: string[]
}

function init(): App {
    const id = uuid()

    return {
        id,
        peer: new Peer(id),
        connectedPeers: [],
    }
}

export function useApp() {
    return ref(init())
}

export type { App }
