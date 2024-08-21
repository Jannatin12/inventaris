<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <h1 class="col-sm-2">Aset</h1>
      <div class="col-sm-10 text-end">
        <NuxtLink to="/aset/tambah-aset" class="btn btn-primary text-white">
          <font-awesome-icon :icon="['fas', 'plus']" class="me-2" /> Tambah
        </NuxtLink>
      </div>
    </div>

    <div v-if="notificationState.message" :class="`alert alert-${notificationState.type} mt-3`">
      {{ notificationState.message }}
    </div>

    <div class="d-flex justify-content-between align-items-center my-3">
      <div class="d-flex align-items-center">
        <label for="entries" class="me-2">Tampilkan entri</label>
        <select id="entries" class="form-select" style="width: auto;" v-model="entriesToShow"
          @change="resetCurrentPage">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
      <div class="row g-2 align-items-center">
        <div class="col-auto">
          <label for="search" class="col-form-label">Cari</label>
        </div>
        <div class="col-auto">
          <input type="text" id="search" class="form-control" v-model="searchQuery" @input="resetCurrentPage" />
        </div>
      </div>
    </div>

    <Table>
      <template #table-head>
        <tr>
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
        <tr v-for="(aset, index) in currentEntries" :key="index">
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

    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        Menampilkan {{ currentEntries.length }} dari {{ totalEntries }} entri
      </div>
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
              Previous
            </a>
          </li>
          <li class="page-item" :class="{ active: page === currentPage }" v-for="page in totalPages" :key="page">
            <a class="page-link" href="#" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAsetStore } from '~/stores/asetStore';

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
