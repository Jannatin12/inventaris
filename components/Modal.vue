<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header my-2">
        <button class="back bg-white" @click="close" aria-label="Close">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <hr>
      <div class="modal-body">
        <slot></slot>
      </div>
      <hr>
      <div class="modal-footer my-2">
        <button type="button" class="btn btn-danger" @click="close">
          <font-awesome-icon :icon="['fas', 'times']" /> Kembali
        </button>
        <button type="submit" class="btn btn-primary text-white" @click="$emit('save')">
          <font-awesome-icon :icon="['fas', 'floppy-disk']" /> Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: Boolean,
  title: String
});

const emit = defineEmits(['close', 'save']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: start;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

.text-danger {
  color: red;
}

.back {
  margin-right: 15px;
  outline: none;
  border: none;
}
</style>
