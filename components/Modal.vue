<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label">Asal/Tujuan</label>
            <div class="control">
              <input v-model="asalTujuan" class="input" type="text" placeholder="Masukkan asal/tujuan" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Tanggal</label>
            <div class="control">
              <input v-model="tanggal" class="input" type="date" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Bukti Foto</label>
            <div class="control">
              <input class="input" type="file" accept="image/*" @change="handleFileUpload" />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-success" type="submit">Simpan</button>
            </div>
            <div class="control">
              <button class="button is-light" type="button" @click="closeModal">Batal</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDisposisiStore } from '@/stores/disposisiStore';

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const disposisiStore = useDisposisiStore();
    const asalTujuan = ref('');
    const tanggal = ref('');
    const foto = ref<File | null>(null);

    const submitForm = () => {
      disposisiStore.addDisposisi({
        jenis: props.jenis,
        asalTujuan: asalTujuan.value,
        tanggal: tanggal.value,
        id: 0,
      });
      closeModal();
    };

    const closeModal = () => {
      emit('close');
    };

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      foto.value = target.files ? target.files[0] : null;
    };

    return {
      asalTujuan,
      tanggal,
      submitForm,
      closeModal,
      handleFileUpload,
    };
  },
});
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  width: 90%;
  max-width: 600px;
  border-radius: 8px;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-card-head {
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.modal-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.field {
  margin-bottom: 20px;
}

.button.is-light {
  background-color: #f5f5f5;
  color: #333;
}
</style>
