<template>
  <div class="error-modal">
    <div class="error-content">
      <span class="exit" @click="closeFunction">&#xD7;</span>
      <h1 style="color: red;">Error</h1>
      <p>{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMsg',
  props: {
    errorMsg: {
      type: String
    },
    closeFunction: {
      type: Function
    }
  },
};
</script>

<style scoped>
.error-modal {
  display: block;
  position: fixed;
  padding: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1050; 
}

.error-content {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin: 14% auto;
  padding: 30px;
  border: 0.5px solid rgb(211, 211, 211);
  max-width: 100%;
  width: 900px;
  position: relative; 
}

.exit {
  color: rgb(90, 81, 81);
  position: absolute; 
  top: 5px; 
  right: 5px; 
  font-size: 30px;
  font-weight: bold;
}
</style>