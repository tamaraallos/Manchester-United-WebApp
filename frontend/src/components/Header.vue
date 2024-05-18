<template>
<!-- Used bootstrap template to construct this header -->
  <div>
    <div class="header-divider">
      <nav class="py-2 border-bottom fixed-top" style="top: 47.5px; background-color: rgb(199,1,1)">
        <div class="container d-flex flex-wrap" >
          <ul class="nav me-auto">
            <li class="nav-item">
              <router-link to="/home" class="nav-link px-2 active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/players" class="nav-link px-2 active">Players</router-link>
            </li>
             <li class="nav-item">
              <router-link to="/forum" class="nav-link px-2 active">Forum</router-link>
            </li>
          </ul>
          <ul class="nav">
            <li class="nav-item" v-if="!username">
                <router-link to="/login" class="nav-link px-2">Login</router-link>
            </li>
            <li class="nav-item" v-if="!username">
                <router-link to="/register" class="nav-link px-2">Sign up</router-link>
            </li>
            <li class="nav-item" v-if="username">
                <button @click="logout" class="nav-link px-2">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <header class="py-3 mb-4 border-bottom fixed-top" style="top: 101px; background-color: rgb(255,255,255);">
        <div class="container d-flex flex-wrap"> 
          <a class="navbar-brand">
            <img src="/logoo.png" alt="">
          </a>        
          <router-link to="/home" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32"> <use xlink:href="#bootstrap"/></svg>
            <span class="fs-4"> {{ headerMsg }} </span>
          </router-link>
          <form class="col-12 col-lg-auto mb-3 mb-lg-0">
            <input type="search" class="form-control" placeholder="Search for a Page..." aria-label="Search" @input="getSearch">
          </form>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
   components: {
    RouterLink
  },
  data() {
    return {
      headerMsg: "Manchester United Fan Club",
      username: localStorage.getItem('username')
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
    getSearch(page) {
      const userSearch = page.target.value.toLowerCase();
      if (userSearch === 'home') {
        this.$router.push('/home');
      } else if (userSearch === 'players') {
        this.$router.push('/players');
      } else if (userSearch === 'forum') {
        this.$router.push('/forum');
      } else if (userSearch === 'login' || userSearch === 'log in') {
        this.$router.push('/login');
      } else if (userSearch === 'signup' || userSearch === 'sign up' || userSearch === 'register') {
        this.$router.push('/register');
      }
    } 
  }
};
</script>

<style scoped>
.nav-item .nav-link {
  font-size: 20px;
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  color: white;
}

.header-divider {
  background-color: rgb(31, 29, 28);
  height: 3rem;
  width: 100%;
  border: solid rgba(0, 0, 0, 0.1);
  border-width: 1px 0; 
  position: fixed; 
  top: 0; 
  left: 0; 
  z-index: 1000; 
  box-sizing: border-box; 
}

.navbar-brand img {
  position: absolute; 
  top: 0; 
  left: 0;
  max-width: 10%;
  max-height: 100%;
  height: auto;
}
</style>