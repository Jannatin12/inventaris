<template>
    <div class="container-fluid">
        <img :src="imageSrc" alt="Image">
        <div class="text-overlay">{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.container-fluid {
    position: relative;
    width: 100%;
    padding: 0;
}

.container-fluid img {
    width: 100%;
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
</style>