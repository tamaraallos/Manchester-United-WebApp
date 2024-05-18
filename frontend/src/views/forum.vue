<script setup>
    import Header from '../components/Header.vue'
    import Create from '../components/Create.vue'
    import DisplayPosts from '../components/DisplayPosts.vue'
    const username = localStorage.getItem('username'); // retrieve username of session
</script>

<template>
  <Header :username="username" />
  <div class="container">
    <div class="row">
      <div class="col">
        <Create v-if="username" :username="username"/> <!--hidden feature for logged in users-->
      </div>
    </div>
    <div clas="row">
      <div class="col">
        <DisplayPosts :username="username" /> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 70px; 
}

</style>