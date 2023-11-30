<template>
  <the-header></the-header>
  <router-view></router-view>
</template>
  
<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
};
</script>
  
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700');

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Noto Sans', sans-serif;
  }

  body {
    margin: 0;
    color: rgb(42, 42, 42);
  }

  /* 
  yellow-green (#BAFF39)
  dim grey (#6E6E6E) 
  white (#FFFFFF) 
    */
</style>