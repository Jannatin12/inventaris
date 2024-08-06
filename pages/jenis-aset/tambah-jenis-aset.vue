<template>
    <div>
        <div class="d-flex align-content-start mb-3">
            <h2>Tambah Jenis Aset</h2>
        </div>

        <form @submit.prevent="saveData" class="d-flex flex-column">
            <div class="mb-3 row">
                <label for="namaBarang" class="col-sm-3 col-form-label">Nama Jenis Barang</label>
                <div class="col-sm-9">
                    <input type="text" id="namaBarang" class="form-control" v-model="newTypeAsset.nama">
                </div>
            </div>
        </form>

        <div class="d-flex justify-content-between my-2">
            <button type="button" class="btn btn-danger">
                <NuxtLink to="/jenis-aset" class="btn-back text-white">
                    <font-awesome-icon :icon="['fas', 'caret-left']" /> Kembali
                </NuxtLink>
            </button>
            <button type="submit" class="btn btn-primary text-white" @click="$emit('save')">
                <font-awesome-icon :icon="['fas', 'floppy-disk']" /> Simpan
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const typeAsset = ref([
    { nama: 'Laptop' },
    { nama: 'Handphone' },
    { nama: 'Proyektor' },
]);

const newTypeAsset = ref({
    nama: '',
});

const emit = defineEmits(['close', 'save']);

const resetForm = () => {
  newTypeAsset.value = {
    nama: '',
  };
};

const saveData = () => {
    typeAsset.value.push({ ...newTypeAsset.value });
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