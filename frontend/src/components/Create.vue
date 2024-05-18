<template>
    <div class="container">
        <div class="col-lg-6">
             <div class="btn-container">
                <button type="button" @click="showForm = true">Create</button>
             </div>
        </div>
        <div class="continer-form" v-if="showForm">
            <div class="form-content">
                <span class="exit" @click="showForm = false">&#xD7;</span>
                <form class="form" @submit.prevent="submitForm">
                    <h3>Fill in Post Template</h3>
                    <p>What do you want to say!</p> <br>
                    <input type="text" v-model="title" class="form-control form-control-lg" placeholder="Enter Title..."><br>
                    <label for="category">Select Category of Post:</label>
                    <select v-model="category" class="form-control  form-control-lg" id="category">
                        <option>General</option>
                        <option>Clubs</option>
                        <option>Players</option>
                        <option>News</option>
                    </select><br>
                    <textarea class="form-control form-control-lg" v-model="body" id="body" placeholder="Body of Text..."></textarea><br>
                    <div class="form-btn">
                        <button type="submit">Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Create',
  props: {
      username: {
          type: String,
          required: true,
          default: ''
      }
  },
  data() {
    return {
      showForm: false,
      title: '',
      body: '',
      category: ''
    };
  },
  methods: {
      async submitForm() {
          // remove white space and check if fields empty
          if (this.title.trim() === '' || this.body.trim() === '') {
               alert('Title and body fields can not be empty. Please fill it in');
               return;
           }
            // construct post data in dictonary
            try {
                 const postData = {
                    title: this.title,
                    body: this.body,
                    category: this.category,
                    username: this.username
                };
                // HTTP request submit post to backend
                await axios.post('http://localhost:8000/forum', postData);
                // sucess 
                // clear fields
                this.title = '';
                this.body = '';
                this.category = '';
                this.showForm = false; // close
                location.reload(true); // refresh
            } catch (error) {
                // error msg
                console.error('Error occured while creating the post.', error);
            }
       },
   }

};

</script>

<style scope>
.continer-form {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1050; 
}

.form-content {
    background-color: #ffffff;
    border-radius: 10px;
    margin: 19% auto;
    padding: 15px;
    border: 0.5px solid rgb(0, 0, 0);
    width: 75%;
}

.btn-container {  
    padding: 55px;
    position: absolute;
    left: 80%;
    transform: translateX(-50%);
    top: 200px;
}

.form-btn {
  display: flex;
  flex-direction: column;
}

input[type="text"], textarea, .category {
    margin-bottom: 10px;
    padding: 8px;
}

.exit {
    color: rgb(90, 81, 81);
    float: right;
    font-size: 30px;
    font-weight: bold;
}
</style>
