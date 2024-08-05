<template>
    <div class="container mt-4">
      <div class="row mb-3">
        <h1 class="col-sm-4">Unggah BAST</h1>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Sekolah</th>
              <th>Nama Barang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(aset, index) in filteredAssets" :key="index">
              <td>{{ index + 1 + (currentPage - 1) * entriesToShow }}</td>
              <td>{{ aset.namaSekolah }}</td>
              <td>{{ aset.namaBarang }}</td>
              <td>
                <button class="btn btn-info btn-sm me-2">
                 Unggah BAST
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

const userName = ref('Elnath Sampurno');
const searchQuery = ref('');
const entriesToShow = ref(10);
const currentPage = ref(1);

const assets = ref([
  { namaSekolah: 'SMP Telkom Bandung', namaBarang: 'Laptop'},
  { namaSekolah: 'SMP Telkom Bandung', namaBarang: 'Handphone'},
  { namaSekolah: 'SMP Telkom Bandung', namaBarang: 'Proyektor'},
]);

const totalEntries = computed(() => filteredAssets.value.length);
const totalPages = computed(() => Math.ceil(totalEntries.value / entriesToShow.value));

const currentEntries = computed(() => {
  const start = (currentPage.value - 1) * entriesToShow.value;
  const end = start + entriesToShow.value;
  return filteredAssets.value.slice(start, end);
});

const filteredAssets = computed(() => {
  if (!searchQuery.value) return assets.value;
  return assets.value.filter(asset =>
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

<style scoped>
.alert-success {
  border-radius: 20px;
  text-align: center;
}

.table-responsive {
  overflow-x: auto;
}

.table th,
.table td {
  vertical-align: middle;
}

.table thead th {
  background-color: #f8f9fa;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.form-select {
  width: auto;
  display: inline-block;
}

.form-control {
  display: inline-block;
  width: auto;
}
</style>