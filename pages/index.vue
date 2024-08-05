<template>
      <div class="container mt-4">
        <h1>{{ welcomeMessage }}</h1>
      </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  
  const welcomeMessage = ref('Beranda');
  
  onMounted(() => {
    console.log(welcomeMessage.value);
  });
  </script>
  
  <style scoped>
  </style>
  