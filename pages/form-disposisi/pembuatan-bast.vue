<template>
  <div>
    <div class="d-flex align-content-start mb-3">
      <h2>Pembuatan Berita Acara Serah Terima (BAST)</h2>
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
        <label for="namaPengirim" class="col-sm-3 col-form-label">Nama Pengirim</label>
        <div class="col-sm-9">
          <select id="namaPengirim" class="form-select">
            <option selected></option>
            <option value="Bapak">Bapak</option>
            <option value="Ibu">Ibu</option>
            <option value="Yayasan">Yayasan</option>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="jabatanPengirim" class="col-sm-3 col-form-label">Jabatan Pengirim</label>
        <div class="col-sm-9">
          <input type="text" id="jabatanPengirim" class="form-control">
        </div>
      </div>

      <div class="mb-3 row">
        <label for="namaPenerima" class="col-sm-3 col-form-label">Nama Penerima</label>
        <div class="col-sm-9">
          <select id="namaPenerima" class="form-select">
            <option selected></option>
            <option value="Bapak">Bapak</option>
            <option value="Ibu">Ibu</option>
            <option value="Yayasan">Yayasan</option>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label for="jabatanPenerima" class="col-sm-3 col-form-label">Jabatan Penerima</label>
        <div class="col-sm-9">
          <input type="text" id="jabatanPenerima" class="form-control">
        </div>
      </div>

      <div class="d-flex justify-content-between my-2">
        <button type="submit" class="btn btn-danger">
          <NuxtLink to="/form-disposisi/form-konfirmasi" class="btn-back text-white">
            <font-awesome-icon :icon="['fas', 'caret-left']" /> Kembali
          </NuxtLink>
        </button>
        <button type="button" class="btn btn-primary">
          <NuxtLink to="" class="btn-back text-white" @click="$emit('save')">
            <font-awesome-icon :icon="['fas', 'caret-right']" /> Cetak
          </NuxtLink>
        </button>
      </div>
    </form>

    <Table>
      
    </Table>

  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>