<template>
    <div class="img-fluid mb-3">
        <ImageWithText imageSrc="https://ucarecdn.com/ff27ae2d-daf7-4293-975c-a9647543b529/examplekeithhardy.jpg"
            text="IT Inventory"
        />
    </div>
    <div class="container-fluid">
        <div class="row g-2 content-center">    
            <div class="col-md-4 mx-2">
                <div class="card card-login p-4 mx-4">
                    <h3 class="card-title">Silakan Masuk</h3>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="nip" v-model="nip" placeholder="Nomor Induk Pegawai" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="password" v-model="password" placeholder="Kata Sandi" required>
                        </div>
                        <button type="submit" class="btn btn-primary text-white mb-3 w-100">Masuk</button>
                    </form>
                </div>
            </div>
            <div class="col-md-6 flex-fill align-items-center justify-content-center">
                <img src="https://ucarecdn.com/939b4cdc-2a7d-45f2-befc-dcda35fa088c/examplezdenekmachacek.jpg"
                    alt="Gambar (Ilustrasi)" class="img-fluid image">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ImageWithText from '~/components/ImageOverlay.vue';

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
.image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.card-login {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
</style>