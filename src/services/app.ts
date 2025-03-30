import { Peer } from 'peerjs';
import { v4 as uuid } from 'uuid';

type AcceptCallback = (mediaStream: MediaStream) => unknown;

type Manager = {
  id: string;
  peer: Peer | undefined;
  connectedPeers: string[];
  setup: (accept: AcceptCallback) => Manager;
};

function setup(this: Manager, accept: AcceptCallback): Manager {
  const manager = this! as Manager;
  this.peer?.on('call', (call) => {
    call.answer();
    call.on('stream', function (remoteStream) {
      if (
        confirm(
          `You are receiving a stream from ${call.peer}, do you want to view their stream (only accept someone you trust)?`
        )
      ) {
        accept(remoteStream);
      }
    });
  });
  return manager;
}

function init(): Manager {
  const id = uuid();
  return {
    id,
    peer: new Peer(id),
    connectedPeers: [],
    setup,
  };
}

function app(manager?: Manager | undefined) {
  return manager || init();
}

export default app;
