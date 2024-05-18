<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="error-container">
          <ErrorMsg :closeFunction="errorMsgCloseFunction" :errorMsg="errorMessage" v-if="showError" />
        </div> 
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="card card-body p-5">
          <h2 class="text-uppercase text-center mb-5">Create an account</h2>
          <form @submit.prevent="submitForm">
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="text" v-model="formData.firstName" class="form-control form-control-lg"
              placeholder="First Name">
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="text" v-model="formData.lastName" class="form-control form-control-lg"
              placeholder="Last Name">
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="text" v-model="formData.username" class="form-control form-control-lg"
               placeholder="Username">
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="password" v-model="formData.password" class="form-control form-control-lg"
              placeholder="Password">
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="password" v-model="formData.confirmPassword" class="form-control form-control-lg"
              placeholder="Confirm Password">
            </div>
            <div class="form-check d-flex justify-content-center mb-4">
              <input class="form-check-input me-2" type="checkbox" value="t&c" v-model="agreedTC">
              <label class="form-check-label" for="t&c">
                I agree to all the non-existed statements in <u>Terms of service</u>
              </label> 
            </div>
            <div class="d-grid gap-2">
              <button type="submit" data-mdb-button-init data-mdb-ripple-init
              class="rounded-pill btn btn-success btn-lg ">Sign For United</button>
            </div>
            <p class="text-center text-muted mt-4 mb-0">Already have an account? <router-link to="/login"
            class="fw-bold text-body"><u>Login here</u></router-link></p>
          </form>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
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
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      validationRules: {
        firstName: {
          required: true,
          minLength: 3
        },
        lastName: {
          required: true,
          minLength: 3
        },
        username: {
          required: true,
          minLength: 5
        },
        password: {
          required: true,
          minLength: 8
        },
      },
      showError: false,
      errorMessage: '',
      agreedTC: false,
      showTC: false,
    };
  },
  methods: {
    errorMsgCloseFunction() {
      this.errorMessage = ''
      this.showError = false
    },
    validateForm() {
      let errors = '';
      // validating data to meet conditions, if it does not concatenate to error 
      if (!this.formData.firstName || this.formData.firstName.length < 3) {
        errors += 'First Name: First name must not be empty and contain at least three characters.\n';
      }
      if (!this.formData.lastName || this.formData.lastName.length < 3) {
        errors += 'Last Name: Last name must not be empty and contain at least three characters.\n';
      }
      if (!this.formData.username || this.formData.username.length < 5) {
        errors += 'Username: Username must not be empty and contain at least five characters.\n';
      }
      if (!this.formData.password || this.formData.password.length < 8) {
        errors += 'Password: Password must not be empty and contain at least eight characters.\n';
      }
      if (!this.formData.confirmPassword || this.formData.password !== this.formData.confirmPassword) {
        errors += 'Confirmed Password: Confirmed password must not be empty and must match the password field.\n';
      }
      if (!this.agreedTC) {
        errors += 'Terms of Conditions: You must agree to the terms of service to register!\n';
      }

      this.errorMessage = errors;
      return errors.length === 0; // return error
    },
    // redirect to homePage
    redirectHome() {
      this.$router.push('/home');
    },
    // handling form submission
    async submitForm() {
      this.errorMessage = '';
      if (!this.validateForm()) {
        this.showError = true;
        return;
      }
      try {
        // create HTTP POST request to back-end server // CHANGE TO POST REQUEST
        const response = await axios.post('http://localhost:8000/register', this.formData);
        if (response.status === 200) {
          this.$router.push('/login');
        } 
      } catch (error) {
        console.error('Reg failed', error); // testing
        this.errorMessage = 'Username already exists. Please try again!';
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
  height: 850px; 
  position: absolute;
  align-items: center;
  transform: translate(-50%, -50%);
}

.form-outline {
  padding: 15px; 
  width: 550px; 
}
/* .error-container {
  position: relative;
  z-index: 1;
} */

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