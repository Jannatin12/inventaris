<template>
  <div class="container">
    <div class="row mb-3">
      <h1 class="col">Disposisi Aset</h1>
    </div>

    <div v-if="notificationState.message" :class="`alert alert-${notificationState.type} mt-3`">
      {{ notificationState.message }}
    </div>

    <div class="button d-flex justify-content-evenly">
      <NuxtLink to="/form-disposisi/penerimaan-barang" class="btn btn-primary btn-lg text-white">
        <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />Tambah Penerimaan
      </NuxtLink>
      <NuxtLink to="/form-disposisi/pengiriman-barang" class="btn btn-primary btn-lg text-white">
        <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />Tambah Pengiriman
      </NuxtLink>
    </div>

    <EntriesSelector v-model:entriesToShow="entriesToShow" v-model:searchQuery="searchQuery"
      @resetCurrentPage="resetCurrentPage" />

    <Table :entries="currentEntries" :entriesToShow="entriesToShow" :currentPage="currentPage" @changePage="changePage">
      <template #table-head>
        <tr>
          <th>Jenis Disposisi</th>
          <th>Asal/Tujuan</th>
          <th>Tanggal</th>
          <th>Aksi</th>
        </tr>
      </template>
      <template #table-body>
        <tr v-for="(disposisi) in currentEntries" :key="disposisi.id">
          <td>{{ disposisi.jenis }}</td>
          <td>{{ disposisi.asalTujuan }}</td>
          <td>{{ disposisi.tanggal }}</td>
          <td>
            <button class="button is-small is-danger is-rounded">Hapus</button>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useDisposisiStore } from '@/stores/disposisiStore';
import EntriesSelector from '~/components/EntriSelector.vue';

interface Disposisi {
  id: number;
  jenis: string;
  asalTujuan: string;
  tanggal: string;
}

export default defineComponent({
  components: {
    EntriesSelector,
  },
  setup() {
    const disposisiStore = useDisposisiStore();
    const searchQuery = ref('');
    const entriesToShow = ref(10);
    const currentPage = ref(1);
    const notificationState = ref({ message: '', type: '' });

    const filteredDisposisi = computed(() => {
      if (!searchQuery.value) return disposisiStore.disposisiList;
      return disposisiStore.disposisiList.filter((disposisi: Disposisi) =>
        Object.values(disposisi)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    const totalEntries = computed(() => filteredDisposisi.value.length);
    const totalPages = computed(() =>
      Math.ceil(totalEntries.value / entriesToShow.value)
    );

    const currentEntries = computed(() => {
      const start = (currentPage.value - 1) * entriesToShow.value;
      const end = start + entriesToShow.value;
      return filteredDisposisi.value.slice(start, end);
    });

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const resetCurrentPage = () => {
      currentPage.value = 1;
    };

    return {
      disposisiStore,
      searchQuery,
      entriesToShow,
      currentPage,
      notificationState,
      filteredDisposisi,
      totalEntries,
      totalPages,
      currentEntries,
      changePage,
      resetCurrentPage,
    };
  },
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.table {
  margin-top: 20px;
  border: 1px solid #ddd;
}
</style>
