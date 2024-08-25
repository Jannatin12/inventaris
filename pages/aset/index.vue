<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <h1 class="col-sm-2">Jenis Aset</h1>
      <div>
        <div class="d-flex justify-content-end align-items-center">
          <div class="me-2 w-100">
            <EntriesSelector v-model:entriesToShow="entriesToShow" v-model:searchQuery="searchQuery"
              @resetCurrentPage="resetCurrentPage" />
          </div>
          <button class="btn btn-primary d-flex align-items-center justify-content-center" style="width: 130px;">
            <NuxtLink to="/jenis-aset/tambah-jenis-aset"
              class="btn-add text-white w-100 h-100 d-flex align-items-center justify-content-center">
              <font-awesome-icon :icon="['fas', 'plus']" class="me-2" /> Tambah
            </NuxtLink>
          </button>
        </div>
      </div>
    </div>
    <div v-if="notificationState.message" :class="`alert alert-${notificationState.type} mt-3`">
      {{ notificationState.message }}
    </div>
    <Table :entries="currentEntries" :entriesToShow="entriesToShow" :currentPage="currentPage" @changePage="changePage">
      <template #table-head>
        <tr class="text-center">
          <th>No.</th>
          <th>Nama Barang</th>
          <th>Merek</th>
          <th>Tipe</th>
          <th>Serial Number</th>
          <th>Status Garansi</th>
          <th>Umur Barang</th>
          <th>Aksi</th>
        </tr>
      </template>
      <template #table-body>
        <tr v-for="(aset, index) in currentEntries" :key="index" class="text-center">
          <td>{{ index + 1 + (currentPage - 1) * entriesToShow }}</td>
          <td>{{ aset.nama }}</td>
          <td>{{ aset.merek }}</td>
          <td>{{ aset.tipe }}</td>
          <td>{{ aset.serialNumber }}</td>
          <td>{{ getStatusGaransi(aset.akhirGaransi) }}</td>
          <td>{{ aset.umurBarang }}</td>
          <td>
            <NuxtLink :to="{
              path: '/aset/tambah-aset',
              query: { index: getAssetIndex(aset) },
            }" class="btn btn-info btn-sm me-2">
              Ubah
            </NuxtLink>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(getAssetIndex(aset))">
              Hapus
            </button>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAsetStore } from '~/stores/asetStore';
import EntriesSelector from '~/components/EntriSelector.vue';

const searchQuery = ref('');
const entriesToShow = ref(10);
const currentPage = ref(1);
const notificationState = ref({ message: '', type: '' });

const asetStore = useAsetStore();
const assets = computed(() => asetStore.getAssets());

const filteredAssets = computed(() => {
  if (!searchQuery.value) return assets.value;
  return assets.value.filter((asset) =>
    Object.values(asset)
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});

const totalEntries = computed(() => filteredAssets.value.length);
const totalPages = computed(() =>
  Math.ceil(totalEntries.value / entriesToShow.value)
);

const currentEntries = computed(() => {
  const start = (currentPage.value - 1) * entriesToShow.value;
  const end = start + entriesToShow.value;
  return filteredAssets.value.slice(start, end);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const resetCurrentPage = () => {
  currentPage.value = 1;
};

const getAssetIndex = (asset: any) => {
  return assets.value.findIndex(
    (a) =>
      a.nama === asset.nama &&
      a.merek === asset.merek &&
      a.tipe === asset.tipe &&
      a.serialNumber === asset.serialNumber
  );
};

const confirmDelete = (index: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
    asetStore.deleteAsset(index);
    notificationState.value = {
      message: 'Aset berhasil dihapus!',
      type: 'success',
    };
    setTimeout(() => {
      notificationState.value.message = '';
    }, 1500);
    if (
      currentEntries.value.length === 1 &&
      currentPage.value > 1
    ) {
      currentPage.value--;
    }
  }
};

const getStatusGaransi = (akhirGaransi: string) => {
  const today = new Date();
  const endWarrantyDate = new Date(akhirGaransi);
  return endWarrantyDate >= today ? 'Aktif' : 'Kedaluwarsa';
};
</script>

<style scoped></style>
