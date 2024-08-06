<template>
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
</template>

<script setup lang="ts">
</script>

<style scoped></style>