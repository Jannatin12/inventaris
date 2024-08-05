<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <h1 class="col-sm-2">Aset</h1>
      <div class="col-sm-10 text-end">
        <button class="btn btn-primary text-white" @click="showModal = true">
          <font-awesome-icon :icon="['fas', 'plus']" class="me-2" /> TAMBAH
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center my-3">
      <div class="d-flex align-items-center">
        <label for="entries" class="me-2">Tampilkan</label>
        <select id="entries" class="form-select" style="width: auto;" v-model="entriesToShow" @change="updateEntries">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <label class="ms-2">Entri</label>
      </div>
      <div>
        <label for="" class="me-2">Cari</label>
        <input type="text" class="form-control" placeholder="Ketik Kata kunci" v-model="searchQuery" />
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Barang</th>
            <th>Merek</th>
            <th>Tipe</th>
            <th>Serial Number</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(aset, index) in currentEntries" :key="index">
            <td>{{ index + 1 + (currentPage - 1) * entriesToShow }}</td>
            <td>{{ aset.nama }}</td>
            <td>{{ aset.merek }}</td>
            <td>{{ aset.tipe }}</td>
            <td>{{ aset.serialNumber }}</td>
            <td>
              <button class="btn btn-info btn-sm me-2">
                <font-awesome-icon :icon="['fas', 'search']" />
              </button>
              <button class="btn btn-danger btn-sm">
                <font-awesome-icon :icon="['fas', 'trash']" />
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

    <Modal :isVisible="showModal" @close="closeModal" title="Tambah Aset" @save="saveData">
      <form @submit.prevent="saveData" class="d-flex flex-column">
        <div class="mb-3 row">
          <label for="namaBarang" class="col-sm-3 col-form-label">Nama Aset</label>
          <div class="col-sm-9">
            <select id="namaBarang" class="form-select" v-model="newAsset.nama">
              <option selected></option>
              <option value="Laptop">Laptop</option>
              <option value="Handphone">Handphone</option>
              <option value="Proyektor">Proyektor</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="merekBarang" class="col-sm-3 col-form-label">Merek</label>
          <div class="col-sm-9">
            <input type="text" id="merekBarang" class="form-control" v-model="newAsset.merek">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="tipeBarang" class="col-sm-3 col-form-label">Tipe</label>
          <div class="col-sm-9">
            <input type="text" id="tipeBarang" class="form-control" v-model="newAsset.tipe">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="serialNumber" class="col-sm-3 col-form-label">Serial Number</label>
          <div class="col-sm-9">
            <input type="text" id="serialNumber" class="form-control" v-model="newAsset.serialNumber">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="kondisiBeli" class="col-sm-3 col-form-label">Kondisi Pembelian</label>
          <div class="col-sm-9">
            <select id="kondisiBeli" class="form-select" v-model="newAsset.kondisiPembelian">
              <option selected></option>
              <option value="Baru">Baru</option>
              <option value="Bekas">Bekas</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="tanggal" class="col-sm-3 col-form-label">Tanggal Pembelian</label>
          <div class="col-sm-9">
            <input type="date" id="tanggal" class="form-control" v-model="newAsset.tanggalPembelian">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="kondisiBarang" class="col-sm-3 col-form-label">Kondisi Barang</label>
          <div class="col-sm-9">
            <input type="text" id="kondisiBarang" class="form-control" v-model="newAsset.kondisiBarang">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="awalGaransi" class="col-sm-3 col-form-label">Masa Garansi</label>
          <div class="col-sm-4">
            <input type="date" id="awalGaransi" class="form-control" v-model="newAsset.awalGaransi">
          </div>
          <label for="akhirGaransi" class="col-sm-1 col-form-label text-center">Sampai</label>
          <div class="col-sm-4">
            <input type="date" id="akhirGaransi" class="form-control" v-model="newAsset.akhirGaransi">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="umurBarang" class="col-sm-3 col-form-label">Umur Barang</label>
          <div class="col-sm-9">
            <input type="text" id="umurBarang" class="form-control" v-model="newAsset.umurBarang">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="keterangan" class="col-sm-3 col-form-label">Keterangan (Opsional)</label>
          <div class="col-sm-9">
            <textarea id="keterangan" class="form-control" v-model="newAsset.keterangan"></textarea>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-danger" type="button" @click="closeModal">Kembali</button>
          <button class="btn btn-primary text-white" type="submit">Simpan</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Modal from '~/components/Modal.vue';

const searchQuery = ref('');
const entriesToShow = ref(10);
const currentPage = ref(1);
const showModal = ref(false);

const assets = ref([
  { nama: 'Laptop', merek: 'Asus', tipe: 'Vivobook Pro 14x OLED', serialNumber: 'VF7LQLDT' },
  { nama: 'Handphone', merek: 'Apple', tipe: 'Iphone 13 Pro Max 256 GB', serialNumber: '85309958349058908345908' },
  { nama: 'Proyektor', merek: 'In Focus', tipe: 'IN112', serialNumber: 'P120Y3K7012' },
]);

const newAsset = ref({
  nama: '',
  merek: '',
  tipe: '',
  serialNumber: '',
  kondisiPembelian: '',
  tanggalPembelian: '',
  kondisiBarang: '',
  awalGaransi: '',
  akhirGaransi: '',
  umurBarang: '',
  keterangan: '',
});

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

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  newAsset.value = {
    nama: '',
    merek: '',
    tipe: '',
    serialNumber: '',
    kondisiPembelian: '',
    tanggalPembelian: '',
    kondisiBarang: '',
    awalGaransi: '',
    akhirGaransi: '',
    umurBarang: '',
    keterangan: '',
  };
};

const saveData = () => {
  assets.value.push({ ...newAsset.value });
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    width: 900px;
}

.modal-header {
  display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    padding: 1rem;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #dee2e6;
    padding: 1rem;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
</style>