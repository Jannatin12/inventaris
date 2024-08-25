<template>
  <div class="container mt-4">
    <div class="d-flex align-content-start mb-3">
      <h2>Form Konfirmasi Penerimaan Aset</h2>
    </div>

    <form @submit.prevent="" class="d-flex flex-column">
      <div class="mb-3 row">
        <label for="namaSekolah" class="col-sm-3 col-form-label">Disposisi Aset</label>
        <div class="col-sm-9">
          <select id="namaSekolah" class="form-select">
            <option selected></option>
            <option value="SMP Telkom Bandung">SMP Telkom Bandung</option>
            <option value="SMA Telkom Bandung">SMA Telkom Bandung</option>
            <option value="SMK Telkom Bandung">SMK Telkom Bandung</option>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="tanggalTerima" class="col-sm-3 col-form-label">Tanggal Pengiriman</label>
        <div class="col-sm-9">
          <input type="date" id="tanggalTerima" class="form-control">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="buktiTerima" class="col-sm-3 col-form-label">Bukti Foto</label>
        <div class="col-sm-9">
          <input type="file" id="buktiTerima" class="form-control">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="kondisiTerima" class="col-sm-3 col-form-label">Kondisi barang yang diterima</label>
        <div class="col-sm-9">
          <input type="text" id="kondisiTerima" class="form-control">
        </div>
      </div>
    </form>

    <div class="d-flex justify-content-between my-2">
      <button type="submit" class="btn btn-danger">
        <NuxtLink to="/form-disposisi" class="btn-back text-white">
          <font-awesome-icon :icon="['fas', 'caret-left']" /> Kembali
        </NuxtLink>
      </button>
      <button type="button" class="btn btn-primary">
        <NuxtLink to="/form-disposisi/pembuatan-bast" class="btn-back text-white" @click="$emit('save')">
          <font-awesome-icon :icon="['fas', 'caret-right']" /> Berikutnya
        </NuxtLink>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>