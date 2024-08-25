<template>
    <div class="container mt-4">
        <div class="d-flex align-content-start mb-3">
            <h2>{{ assetIndex >= 0 ? 'Edit' : 'Tambah' }} Jenis Aset</h2>
        </div>

        <Notification :message="notificationState.message" :type="notificationState.type" />

        <form @submit.prevent="saveData" class="d-flex flex-column">
            <div class="mb-3 row">
                <label for="namaBarang" class="col-sm-3 col-form-label">Nama Jenis Barang</label>
                <div class="col-sm-9">
                    <input type="text" id="namaBarang" class="form-control" v-model="typeAssetBeingEdited.nama">
                </div>
            </div>
            <div class="d-flex justify-content-between my-2">
                <button type="button" class="btn btn-danger" @click="navigateBack">
                    <font-awesome-icon :icon="['fas', 'caret-left']" /> Kembali
                </button>
                <button type="submit" class="btn btn-primary text-white">
                    <font-awesome-icon :icon="['fas', 'floppy-disk']" /> Simpan
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTypeAssetStore } from '~/stores/typeAssetStore';

const route = useRoute();
const router = useRouter();
const typeAssetStore = useTypeAssetStore();

const assetIndex = ref(route.query.index ? parseInt(route.query.index as string) : -1);
const typeAssetBeingEdited = ref({ nama: '' });
const notificationState = ref({ message: '', type: '' });

watchEffect(() => {
  if (assetIndex.value >= 0) {
    const asset = typeAssetStore.getTypeAssets()[assetIndex.value];
    typeAssetBeingEdited.value = { ...asset };
  } else {
    typeAssetBeingEdited.value = { nama: '' };
  }
});

const saveData = () => {
  const { nama } = typeAssetBeingEdited.value;

  if (nama.trim()) {
    if (assetIndex.value >= 0) {
      typeAssetStore.editTypeAsset(assetIndex.value, { ...typeAssetBeingEdited.value });
      notificationState.value = { message: 'Jenis Aset berhasil diubah!', type: 'success' };
    } else {
      typeAssetStore.addTypeAsset({ ...typeAssetBeingEdited.value });
      notificationState.value = { message: 'Jenis Aset berhasil ditambahkan!', type: 'success' };
    }

    setTimeout(() => {
      router.push('/jenis-aset');
    }, 1500);
  } else {
    notificationState.value = { message: 'Jenis Aset tidak boleh kosong!', type: 'danger' };
  }
};

const navigateBack = () => {
  router.push('/jenis-aset');
};
</script>

<style scoped></style>