<template>
    <div v-if="message" :class="`alert alert-${type} mt-3`">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    message: String,
    type: {
        type: String,
        default: 'succes'
    }
});
</script>