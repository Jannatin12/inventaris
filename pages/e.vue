<template>
  <aside class="sidebar d-flex flex-column bg-sidebar p-3">
    <div class="user-info text-center mb-4">
      <img src="https://ucarecdn.com/939b4cdc-2a7d-45f2-befc-dcda35fa088c/examplezdenekmachacek.jpg"
           alt="User Avatar" class="rounded-circle mb-2" width="80" height="80">
      <h5>{{ userName }}</h5>
      <p>{{ userRole }}</p>
    </div>
    <hr class="custom-hr">
    <nav class="nav flex-column flex-grow-1">
      <NuxtLink to="/beranda" class="nav-link d-flex align-items-center"
                :class="{ active: isActive('/beranda') }">
        <font-awesome-icon :icon="['fas', 'home']" class="me-2" /> Beranda
      </NuxtLink>
      
      <div class="nav-link mt-2" @click="toggleSection('dataMaster')" style="cursor: pointer;">
        <label>
          <font-awesome-icon :icon="['fas', 'table']" class="me-2" /> Data Master
        </label>
        <div class="divider"></div>
      </div>
      <div v-show="sections.dataMaster">
        <NuxtLink to="/jenis-aset" class="nav-link d-flex align-items-center ms-4"
                  :class="{ active: isActive('/jenis-aset') }">
          <font-awesome-icon :icon="['fas', 'clipboard-list']" class="me-2" /> Jenis Aset
        </NuxtLink>
        <NuxtLink to="/aset" class="nav-link d-flex align-items-center ms-4" :class="{ active: isActive('/aset') }">
          <font-awesome-icon :icon="['fas', 'laptop']" class="me-2" /> Aset
        </NuxtLink>
      </div>

      <div class="nav-link mt-2" @click="toggleSection('disposisi')" style="cursor: pointer;">
        <label>
          <font-awesome-icon :icon="['fas', 'envelope-open-text']" class="me-2" /> Disposisi
        </label>
        <div class="divider"></div>
      </div>
      <div v-show="sections.disposisi">
        <NuxtLink to="/form-disposisi" class="nav-link d-flex align-items-center ms-4"
                  :class="{ active: isActive('/form-disposisi') }">
          <font-awesome-icon :icon="['fas', 'file-alt']" class="me-2" /> Form Disposisi
        </NuxtLink>
        <NuxtLink to="/unggah-bast" class="nav-link d-flex align-items-center ms-4"
                  :class="{ active: isActive('/unggah-bast') }">
          <font-awesome-icon :icon="['fas', 'upload']" class="me-2" /> Unggah BAST
        </NuxtLink>
        <NuxtLink to="/rincian-disposisi" class="nav-link d-flex align-items-center ms-4"
                  :class="{ active: isActive('/rincian-disposisi') }">
          <font-awesome-icon :icon="['fas', 'clipboard-check']" class="me-2" /> Rincian Disposisi
        </NuxtLink>
      </div>

      <NuxtLink to="/login" class="nav-link d-flex mt-auto align-items-center text-danger">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="me-2" /> Keluar
      </NuxtLink>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userName = ref('Elnath Sampurno');
const userRole = ref('Admin IT');

const sections = ref<{ [key: string]: boolean }>({
  dataMaster: false,
  disposisi: false
});

const isActive = (path: string) => {
  return route.path === path;
};

const toggleSection = (section: keyof typeof sections.value) => {
  sections.value[section] = !sections.value[section];
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.user-info h5,
.user-info p {
  margin: 0;
}

.nav-link {
  color: #000;
  font-weight: 500;
  margin: 4px 0;
  transition: color 0.3s, border-bottom 0.3s;
}

.nav-link:hover {
  color: #6558F5;
}

.nav-link.active {
  color: #6558F5;
  border-left: 2px solid #6558F5;
}

.nav-link.text-danger {
  color: #dc3545;
}

.nav-link.active.text-danger {
  color: #dc3545;
  border-bottom: 2px solid #dc3545;
}

.label-divider {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.label-divider label {
  margin-right: 0.5rem;
}

.label-divider .divider {
  flex-grow: 1;
  height: 2px;
  background-color: #9EADBA;
}
</style>
