<template>
    <div class="img-fuild">
        <div class="col-12 position-relative">
            <img class="img-fluid w-100 header-image" src="https://via.placeholder.com/1200x200" alt="Header Image">
            <div class="text-overlay">IT INVENTORY</div>
        </div>
    </div>
    <div class="container-fluid mt-4">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-4">
                <div class="card p-4">
                    <h3 class="card-title text-center mb-4">Silakan Masuk</h3>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="nip" v-model="nip"
                                placeholder="Nomor Induk Pegawai" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="password" v-model="password"
                                placeholder="Kata Sandi" required>
                        </div>
                        <button type="submit" class="btn btn-primary text-white mb-3 w-100">Masuk</button>
                    </form>
                </div>
            </div>
            <div class="col-md-6 text-center">
                <img src="https://via.placeholder.com/600x400" alt="Gambar (Ilustrasi)" class="img-fluid">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nip = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
    console.log('NIP:', nip.value);
    console.log('Password:', password.value);

    if (nip.value === '123' && password.value === '123') {
        router.push('/beranda');
    } else {
        alert('NIP atau Password salah!');
    }
};
</script>

<style scoped>
.container-fluid {
    padding: 0;
}

.header-image {
    height: 200px;
    object-fit: cover;
}

.text-overlay {
    position: absolute;
    bottom: 10px;
    left: 20px;
    color: white;
    background-color: transparent;
    padding: 10px;
    border-radius: 5px;
    font-size: 48px;
}

.card {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    box-shadow: none;
}

.card-title {
    font-weight: bold;
}

.btn {
    font-size: 16px;
}

.img-fluid {
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.vh-100 {
    height: 100vh;
}
</style>