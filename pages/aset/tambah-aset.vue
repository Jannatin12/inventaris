<template>
  <div>
    <div class="d-flex align-content-start mb-3">
      <h2>{{ assetIndex >= 0 ? 'Edit' : 'Tambah' }} Aset</h2>
    </div>

    <Notification :message="notificationState.message" :type="notificationState.type" />

    <form @submit.prevent="saveData" class="d-flex flex-column">
      <div class="mb-3 row">
        <label for="namaBarang" class="col-sm-3 col-form-label">Nama Aset</label>
        <div class="col-sm-9">
          <select id="namaBarang" class="form-select" v-model="assetBeingEdited.nama">
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
          <input type="text" id="merekBarang" class="form-control" v-model="assetBeingEdited.merek">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="tipeBarang" class="col-sm-3 col-form-label">Tipe</label>
        <div class="col-sm-9">
          <input type="text" id="tipeBarang" class="form-control" v-model="assetBeingEdited.tipe">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="serialNumber" class="col-sm-3 col-form-label">Serial Number</label>
        <div class="col-sm-9">
          <input type="text" id="serialNumber" class="form-control" v-model="assetBeingEdited.serialNumber">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="kondisiBeli" class="col-sm-3 col-form-label">Kondisi Pembelian</label>
        <div class="col-sm-9">
          <select id="kondisiBeli" class="form-select" v-model="assetBeingEdited.kondisiPembelian">
            <option selected></option>
            <option value="Baru">Baru</option>
            <option value="Bekas">Bekas</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="tanggal" class="col-sm-3 col-form-label">Tanggal Pembelian</label>
        <div class="col-sm-9">
          <input type="date" id="tanggal" class="form-control" v-model="assetBeingEdited.tanggalPembelian">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="kondisiBarang" class="col-sm-3 col-form-label">Kondisi Barang</label>
        <div class="col-sm-9">
          <input type="text" id="kondisiBarang" class="form-control" v-model="assetBeingEdited.kondisiBarang">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="awalGaransi" class="col-sm-3 col-form-label">Masa Garansi</label>
        <div class="col-sm-4">
          <input type="date" id="awalGaransi" class="form-control" v-model="assetBeingEdited.awalGaransi">
        </div>
        <label for="akhirGaransi" class="col-sm-1 col-form-label text-center">Sampai</label>
        <div class="col-sm-4">
          <input type="date" id="akhirGaransi" class="form-control" v-model="assetBeingEdited.akhirGaransi">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="umurBarang" class="col-sm-3 col-form-label">Umur Barang</label>
        <div class="col-sm-9">
          <input type="text" id="umurBarang" class="form-control" v-model="assetBeingEdited.umurBarang">
        </div>
      </div>
      <div class="mb-3 row">
        <label for="keterangan" class="col-sm-3 col-form-label">Keterangan (Opsional)</label>
        <div class="col-sm-9">
          <textarea id="keterangan" class="form-control" v-model="assetBeingEdited.keterangan"></textarea>
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
import { useAsetStore } from '~/stores/asetStore';

const route = useRoute();
const router = useRouter();
const asetStore = useAsetStore();

const assetIndex = ref(
  route.query.index !== undefined ? parseInt(route.query.index as string) : -1
);

const assetBeingEdited = ref({
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

const notificationState = ref({ message: '', type: '' });

watchEffect(() => {
  if (assetIndex.value >= 0) {
    const asset = asetStore.getAssets()[assetIndex.value];
    assetBeingEdited.value = { ...asset };
  } else {
    assetBeingEdited.value = {
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
  }
});

const saveData = () => {
  const asset = assetBeingEdited.value;
  if (
    asset.nama &&
    asset.merek &&
    asset.tipe &&
    asset.serialNumber &&
    asset.kondisiPembelian &&
    asset.tanggalPembelian &&
    asset.kondisiBarang &&
    asset.awalGaransi &&
    asset.akhirGaransi &&
    asset.umurBarang
  ) {
    if (assetIndex.value >= 0) {
      asetStore.editAsset(assetIndex.value, { ...asset });
      notificationState.value = {
        message: 'Aset berhasil diubah!',
        type: 'success',
      };
    } else {
      asetStore.addAsset({ ...asset });
      notificationState.value = {
        message: 'Aset berhasil ditambahkan!',
        type: 'success',
      };
    }

    setTimeout(() => {
      router.push('/aset');
    }, 1500);
  } else {
    notificationState.value = {
      message: 'Mohon lengkapi semua field yang wajib diisi!',
      type: 'danger',
    };
  }
};

const navigateBack = () => {
  router.push('/aset');
};
</script>

<style scoped></style>
