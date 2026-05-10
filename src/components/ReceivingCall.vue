<script setup lang="ts">
import Modal from './base/Modal.vue'
defineProps({
    remotePeerId: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <Modal>
        <p>Hello there! 🙇</p>
        <p>You are receiving a call from a peer with ID: {{ remotePeerId }}.</p>
        <p>Do you want to receive their stream?</p>
        <p>🔒 <i>Please, only accept calls from people you trust</i></p>
        <div class="flex justify-end-safe gap-2">
            <button
                id="deny"
                class="py-1 px-8 border rounded-lg border-rose-800 text-rose-800 bg-rose-200"
                @click="$emit('deny')"
            >
                Deny
            </button>
            <button
                id="approve"
                class="py-1 px-8 border rounded-lg border-emerald-800 text-emerald-800 bg-emerald-200"
                @click="$emit('approve')"
            >
                Approve
            </button>
        </div>
    </Modal>
</template>
