<template>
  <Header />

  <router-view />

  <Footer />
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
body {
  margin: 0;
  font-family: "Source Serif Pro", serif;
  background: white;
}
</style>
