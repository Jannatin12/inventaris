<template>
  <div class="container mt-4">
    <div class="row mb-3 d-flex justify-content-between">
      <h1 class="col-sm-4">Rincian Disposisi</h1>
      <div class="col-sm-6 text-end">
        <button class="btn btn-primary">
          <NuxtLink to="/form-disposisi" class="btn-add text-white">
            <font-awesome-icon :icon="['fas', 'plus']" class="me-2" /> Tambah
          </NuxtLink>
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center my-3">
      <div class="d-flex align-items-center">
        <label for="entries" class="me-2">Tampilkan entri</label>
        <select id="entries" class="form-select" style="width: auto;" v-model="entriesToShow" @change="updateEntries">
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
          <input type="text" id="search" class="form-control">
        </div>
      </div>
    </div>

    <Table>
      <template #table-head>
        <tr>
          <th>No.</th>
          <th>Nama Sekolah</th>
          <th>Nama Barang</th>
          <th>Aksi</th>
        </tr>
      </template>
      <template #table-body>
        <tr v-for="(disposisi, index) in currentEntries" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ disposisi.namaSekolah }}</td>
          <td>{{ disposisi.namaBarang }}</td>
          <td>
            <button class="btn btn-info btn-sm me-2">
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
            <button class="btn btn-danger btn-sm">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const searchQuery = ref('');
const entriesToShow = ref(10);
const currentPage = ref(1);

const disposisi = ref([
  { namaSekolah: 'SMK Telkom Bandung', namaBarang: 'Laptop'},
  { namaSekolah: 'SMP Telkom Bandung', namaBarang: 'Proyektor'},
  { namaSekolah: 'SMP Telkom Bandung', namaBarang: 'Meja'},
]);

const totalEntries = computed(() => filteredAssets.value.length);
const totalPages = computed(() => Math.ceil(totalEntries.value / entriesToShow.value));

const currentEntries = computed(() => {
  const start = (currentPage.value - 1) * entriesToShow.value;
  const end = start + entriesToShow.value;
  return filteredAssets.value.slice(start, end);
});

const filteredAssets = computed(() => {
  if (!searchQuery.value) return disposisi.value;
  return disposisi.value.filter(disp =>
    Object.values(disp).some(value => value.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const updateEntries = () => {
  currentPage.value = 1;
};
</script>

<style></style>