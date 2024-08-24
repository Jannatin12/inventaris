<template>
  <div>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <slot name="table-head"></slot>
        </thead>
        <tbody>
          <slot name="table-body"></slot>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        Menampilkan {{ paginatedEntries.length }} dari {{ totalEntries }} entri
      </div>
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
              Previous
            </a>
          </li>
          <li class="page-item" :class="{ active: page === currentPage }" v-for="page in totalPages" :key="page">
            <a class="page-link" href="#" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  entries: {
    type: Array,
    default: () => [],
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  entriesToShow: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(['changePage']);

const paginatedEntries = computed(() => {
  if (!Array.isArray(props.entries)) {
    return [];
  }
  const start = (props.currentPage - 1) * props.entriesToShow;
  return props.entries.slice(start, start + props.entriesToShow);
});


const totalEntries = computed(() => props.entries.length);
const totalPages = computed(() => Math.ceil(totalEntries.value / props.entriesToShow));

function changePage(page: number) {
  if (page > 0 && page <= totalPages.value) {
    emit('changePage', page);
  }
}
</script>

<style scoped></style>