<template>
    <div class="d-flex justify-content-between align-items-center my-3">
        <div class="d-flex align-items-center">
            <label for="entries" class="me-2">Tampilkan entri</label>
            <select id="entries" class="form-select" style="width: auto;" v-model="localEntriesToShow"
                @change="updateEntriesToShow">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>
        </div>
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <label for="search" class="col-form-label">Cari</label>
            </div>
            <div class="col-auto">
                <input type="text" id="search" class="form-control" v-model="localSearchQuery"
                    @input="updateSearchQuery" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    entriesToShow: {
        type: Number,
        required: true
    },
    searchQuery: {
        type: String,
        required: true
    }
});

const localEntriesToShow = ref(props.entriesToShow);
const localSearchQuery = ref(props.searchQuery);

const emit = defineEmits(['update:entriesToShow', 'update:searchQuery', 'resetCurrentPage']);

watch(localEntriesToShow, (newValue) => {
    emit('update:entriesToShow', newValue);
});

watch(localSearchQuery, (newValue) => {
    emit('update:searchQuery', newValue);
});

function updateEntriesToShow() {
    emit('resetCurrentPage');
}

function updateSearchQuery() {
    emit('resetCurrentPage');
}
</script>

<style scoped></style>
