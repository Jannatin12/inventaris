<template>
  <header>
    <div class="container">
      <h1 class="mt-3">Halo, {{ user }}</h1>
      <hr class="custom-hr">
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: String,
      required: true
    }
  }
}
</script>
