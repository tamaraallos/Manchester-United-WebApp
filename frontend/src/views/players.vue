<script setup>
    import Header from '../components/Header.vue'
    import ListPlayers from '../components/ListPlayers.vue'
    const username = localStorage.getItem('username');
</script>

<template>
  <Header />
  <div class="container">
    <div class="row">
      <div class="body">
        <h1>Players</h1> 
        <ListPlayers />
      </div>
    </div> 
  </div>
</template>

<style scoped>
  .container {
    margin-top: 200px; 
    display: flex;
    justify-content: center;
  }
</style>