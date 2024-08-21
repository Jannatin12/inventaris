<template>
  <div>
    <div class="d-flex align-content-start mb-3">
      <h2>Form Disposisi Aset</h2>
    </div>

    <form @submit.prevent="" class="d-flex flex-column">
      <div class="mb-3 row">
        <label for="namaSekolah" class="col-sm-3 col-form-label">Nama Sekolah</label>
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
        <label for="namaPengiriman" class="col-sm-3 col-form-label">Nama Pengiriman</label>
        <div class="col-sm-9">
          <input type="text" id="namaPengiriman" class="form-control">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="tanggalKirim" class="col-sm-3 col-form-label">Tanggal Pengiriman</label>
        <div class="col-sm-9">
          <input type="date" id="tanggalKirim" class="form-control">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="buktiKirim" class="col-sm-3 col-form-label">Bukti Foto</label>
        <div class="col-sm-9">
          <input type="file" id="buktiKirim" class="form-control">
        </div>
      </div>
    </form>

    <div class="d-flex justify-content-between my-2">
      <button type="submit" class="btn btn-danger text-white disabled">
        <font-awesome-icon :icon="['fas', 'caret-left']" /> Kembali
      </button>
      <button type="button" class="btn btn-primary">
        <NuxtLink to="/form-disposisi/form-konfirmasi" class="btn-back text-white" @click="$emit('save')">
          <font-awesome-icon :icon="['fas', 'caret-right']" /> Berikutnya
        </NuxtLink>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const formPengiriman = ref([
])
</script>

<style></style>