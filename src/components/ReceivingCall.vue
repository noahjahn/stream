<script setup lang="ts">
import Modal from './base/Modal.vue'
import Button from './Button.vue'

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
            <Button state="failure" @click="$emit('deny')"> Deny </Button>
            <Button state="success" @click="$emit('approve')"> Approve </Button>
        </div>
    </Modal>
</template>
