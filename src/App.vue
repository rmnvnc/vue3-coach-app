<template>
    <the-header></the-header>
    <router-view></router-view>
  </template>
  
  <script>
  import TheHeader from './components/nav/TheHeader.vue';
  
  export default {
    components: {
      TheHeader
    },
  };
  </script>
  
  <style>
  * {
    box-sizing: border-box;
  }
  
  html {
    font-family: 'Trebuchet MS', sans-serif;
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