<template>
    <div v-if="$route.path !== '/login'" class="d-flex">
        <Sidebar />
        <div class="main-content flex-grow-1 d-flex">
            <main class="flex-grow-1 px-0 mx-4">
                <Header class="text-header" user="Elnath Sampurno" />
                <slot />
            </main>
        </div>
    </div>
    <div v-else>
        <slot />
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.main-content {
    margin-left: 250px;
}

.text-header {
    text-align: left;
}
</style>
