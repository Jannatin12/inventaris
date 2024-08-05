<template>
    <div>
        <label for="namaBarang" class="form-label me-4">Nama Jenis Barang</label>
        <input type="text" id="namaBarang" class="form-control">
    </div>

    <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-danger" type="button" @click="closeModal">Kembali</button>
        <button class="btn btn-primary text-white" type="button">Simpan</button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    closeModal: Function
});
</script>

<style scoped></style>