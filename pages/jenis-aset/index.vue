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
          <th>Jenis Barang</th>
          <th>Pengaturan</th>
        </tr>
      </template>
      <template #table-body>
        <tr v-for="(aset, index) in currentEntries" :key="index">
          <td>{{ index + 1 + (currentPage - 1) * entriesToShow }}</td>
          <td>{{ aset.nama }}</td>
          <td>
            <button class="btn btn-info btn-sm me-2">Ubah</button>
            <button class="btn btn-danger btn-sm">Hapus</button>
          </td>
        </tr>
      </template>
    </Table>

    <div class="d-flex justify-content-between align-items-center">
      <div>Menampilkan {{ currentEntries.length }} dari {{ totalEntries }} entri</div>
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li class="page-item" :class="{ active: page === currentPage }" v-for="page in totalPages" :key="page">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const searchQuery = ref('');
const entriesToShow = ref(10);
const currentPage = ref(1);

const typeAssets = ref([
  { nama: 'Laptop' },
  { nama: 'Handphone' },
  { nama: 'Proyektor' },
]);

const totalEntries = computed(() => filteredAssets.value.length);
const totalPages = computed(() => Math.ceil(totalEntries.value / entriesToShow.value));

const currentEntries = computed(() => {
  const start = (currentPage.value - 1) * entriesToShow.value;
  const end = start + entriesToShow.value;
  return filteredAssets.value.slice(start, end);
});

const filteredAssets = computed(() => {
  if (!searchQuery.value) return typeAssets.value;
  return typeAssets.value.filter(asset =>
    Object.values(asset).some(value => value.toLowerCase().includes(searchQuery.value.toLowerCase()))
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

<style scoped></style>
