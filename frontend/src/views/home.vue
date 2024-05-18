<script setup>
    import Header from '../components/Header.vue'
    const username = localStorage.getItem('username'); // retrieve username of session
</script>

<template>
  <Header />
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Welcome Red Devils</h1>
        <br><br>
        <p>This is a forum, dedicated to the best football club in the world.</p>
        <p v-if="username">Hello, {{username }}! Glad you made it. Please feel free to interact with features in the forum page.<br></p>
        <p v-else>Please login to unlock interacting features!</p>
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