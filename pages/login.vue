<template>
    <div class="vh-100 d-flex flex-column align-items-center">
        <div class="header-box w-100 d-flex justify-content-between align-items-center">
            <h1 class="text-white ms-4">YPT <br>IT Inventory</h1>
            <img class="logo me-4" src="https://ucarecdn.com/ff27ae2d-daf7-4293-975c-a9647543b529/examplekeithhardy.jpg" alt="Logo">
        </div>
        <div class="flex-grow-1 d-flex justify-content-center align-items-center w-100">
            <div class="login-box">
                <h3 class="card-title text-center mb-4">Silakan Masuk / Log in</h3>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="nip" v-model="nip" placeholder="Nomor Induk Pegawai" required>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control" id="password" v-model="password" placeholder="Kata Sandi" required>
                    </div>
                    <button type="submit" class="btn btn-primary text-white w-100">Masuk</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/authStore';

const store = useAuthStore();
const nip = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
    console.log('NIP:', nip.value);
    console.log('Password:', password.value);

    if (nip.value === '123' && password.value === '123') {
        store.login(nip.value, password.value);
        router.push('/');
    } else {
        alert('NIP atau Password salah!');
    }
};
</script>

<style scoped>
.header-box {
    background: linear-gradient(90deg, #2F3645 0%, #303e63 100%);
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.header-box h1 {
    margin: 0;
    font-size: 36px;
}

.logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.flex-grow-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.login-box {
    background-color: white;
    border-radius: 28px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    max-width: 600px;
    width: 100%;
    margin-top: -100px;
}

.card-title {
    font-weight: bold;
    font-size: 18px;
}

.btn {
    font-size: 16px;
    background-color: #87A2FB;
    border: none;
}
</style>
