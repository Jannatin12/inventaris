<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <h1 class="col-sm-2">Jenis Aset</h1>
      <div class="col-sm-10 text-end">
        <button class="btn btn-primary">
          <NuxtLink to="/jenis-aset/tambah-jenis-aset" class="btn-add text-white">
            <font-awesome-icon :icon="['fas', 'plus']" class="me-2" /> Tambah
          </NuxtLink>
        </button>
      </div>
    </div>

    <Notification :message="notificationState.message" :type="notificationState.type" />

    <EntriesSelector v-model:entriesToShow="entriesToShow" v-model:searchQuery="searchQuery"
      @resetCurrentPage="resetCurrentPage" />

    <Table :entries="filteredAssets" :currentPage="currentPage" :entriesToShow="entriesToShow" @changePage="changePage">
      <template #table-head>
        <tr>
          <th>No.</th>
          <th>Jenis Barang</th>
          <th>Pengaturan</th>
        </tr>
      </template>
      <template #table-body>
        <tr v-for="(aset, index) in filteredAssets" :key="index">
          <td>{{ index + 1 + (currentPage - 1) * entriesToShow }}</td>
          <td>{{ aset.nama }}</td>
          <td>
            <NuxtLink :to="{
              path: '/jenis-aset/tambah-jenis-aset',
              query: { index: index }
            }" class="btn btn-info btn-sm me-2">Ubah
            </NuxtLink>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(index)">Hapus</button>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useTypeAssetStore } from '~/stores/typeAssetStore';
import EntriesSelector from '~/components/EntriSelector.vue';

const searchQuery = ref('');
const entriesToShow = ref(10);
const currentPage = ref(1);
const notificationState = ref({ message: '', type: '' });

const typeAssetStore = useTypeAssetStore();
const typeAssets = computed(() => typeAssetStore.getTypeAssets());

const filteredAssets = computed(() => {
  if (!searchQuery.value) return typeAssets.value;
  return typeAssets.value.filter(asset =>
    asset.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const changePage = (page: number) => {
  if (page >= 1 && page <= Math.ceil(filteredAssets.value.length / entriesToShow.value)) {
    currentPage.value = page;
  }
};

const resetCurrentPage = () => {
  currentPage.value = 1;
};

const confirmDelete = (index: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
    typeAssetStore.deleteTypeAsset(index);
    notificationState.value = { message: 'Jenis Aset berhasil dihapus!', type: 'success' };
    setTimeout(() => {
      notificationState.value.message = '';
    }, 1500);
  }
};
</script>

<style scoped></style>
