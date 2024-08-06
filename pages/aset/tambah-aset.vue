<template>
  <div>
    <div class="d-flex align-content-start mb-3">
        <h2>Tambah Aset</h2>
    </div>

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
      </form>

      <div class="d-flex justify-content-between my-2">
        <button type="button" class="btn btn-danger">
            <NuxtLink to="/aset" class="btn-back text-white">
                <font-awesome-icon :icon="['fas', 'caret-left']"/> Kembali
            </NuxtLink>
        </button>
        <button type="submit" class="btn btn-primary text-white" @click="$emit('save')">
          <font-awesome-icon :icon="['fas', 'floppy-disk']" /> Simpan
        </button>
      </div>
  </div>
</template>

<script lang="ts" setup>
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

const emit = defineEmits(['close', 'save']);

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
  emit('save');
  resetForm();
};
</script>

<style>
.back {
  margin-right: 15px;
  outline: none;
  border: none;
}
</style>