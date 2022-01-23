<template>
  <router-view></router-view>
</template>

<script>
// import Home from "@/views/Home";
export default {
  created() {
    this.$store.dispatch('createStompClient')
  }
}
</script>

<style>
</style>
