<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="error-container">
          <ErrorMsg :closeFunction="errorMsgCloseFunction" :errorMsg="errorMessage" v-if="showError" />
        </div>
        <div class="card">
          <div class="card-body p-5">
            <h2 class="text-uppercase text-center mb-5">Log in</h2>
            <form @submit.prevent="submitForm" ref="loginForm">
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" v-model="formData.username" class="form-control form-control-lg" placeholder="Username">
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" v-model="formData.password" class="form-control form-control-lg" placeholder="Password">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" data-mdb-button-init data-mdb-ripple-init class="rounded-pill btn btn-success btn-lg ">Log In</button>
              </div>
              <p class="text-center text-muted mt-4 mb-0"> Not registered yet? 
                <router-link to="/register" class="fw-bold text-body">
                  <u>Create an account</u>
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <span class="exit" @click="redirectHome">&times;</span>
      </div>
    </div>
  </div>
</template>
<script>

import ErrorMsg from '../components/ErrorMsg.vue';
import axios from 'axios';

export default {
  components: { ErrorMsg },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      showError: false,
      errorMessage: '',
    };
  },
  methods: {
    // home if exit button clicked
    redirectHome() {
      this.$router.push('/home');
    },
    // close pop up error
    errorMsgCloseFunction() {
      this.errorMessage = ''
      this.showError = false
    },
    validateForm() {
      this.showError = false;
      let errors = [];
      if (!this.formData.username || !this.formData.password) {
        errors.push("Please enter Username or Password.");
      }
      this.errorMessage = errors.join(', ');
      this.showError = errors.length > 0;
      return errors.length === 0;
    },
    async submitForm() {
      try {
        if (!this.validateForm()) {
          this.showError = true;
          return;
        }
        // create HTTP post request to backend server
        const response = await axios.post('http://localhost:8000/login', {
          username: this.formData.username,
          password: this.formData.password
        });

        if (response.data.success) {
          localStorage.setItem('username', this.formData.username);
          this.$router.push('/home');
        } else {
          // login error
          this.errorMessage = response.data.message;
          this.showError = true;
        }
      } catch (error) {
        console.error('Login failed', error); // testing
        this.errorMessage = 'Username or password is incorrect. Please try again!';
        this.showError = true;
      }
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 35px;
  width: 700px; 
  height: 650px; 
  position: absolute;
  align-items: center;
  transform: translate(-50%, -50%);
}

.form-outline {
  padding: 15px; 
  width: 550px; 
}

.exit {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 40px;
}

.d-grid .btn {
  font-weight: 500;
  border: none;
  background: rgb(199,1,1);
}
</style>