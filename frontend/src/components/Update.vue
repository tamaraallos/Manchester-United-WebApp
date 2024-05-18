<template>
  <div v-if="isUser">
    <button class="button" @click="openModal">Edit</button>
    <div v-if="showModal" class="modal">
       <div class="modal-content">
            <span class="exit" @click="closeModal">&times;</span>
            <h3>Update Post</h3>
            <form @submit.prevent="updatePost">
                <label for="title">Title:</label> 
                <input type="text" id="title" class="form-control  form-control-lg" v-model="updatedPost.title"><br>
                <label for="category">Category:</label>
                <select v-model="updatedPost.category" class="form-control  form-control-lg" id="category">
                 <option value="General">General</option>
                 <option value="Clubs">Clubs</option>
                 <option value="Players">Players</option>
                 <option value="News">News</option>
                </select>
                <label for="body">Body:</label>
                <textarea class="form-control form-control-lg" id="body" v-model="updatedPost.body"></textarea><br>
                <div class="form-btn">
                  <button type="submit">Update</button>
                </div>
            </form>
       </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Update',
    props: ['post'],
    data() {
        return {
        isUser: false,
        username: localStorage.getItem('username'), // retrieve username of session
        showModal: false,
        updatedPost: {
            id: this.post.id,
            title: this.post.title,
            category: this.post.category,
            body: this.post.body
            }
        };
    },
    mounted() {
      // check current user has permission
        this.checkIfUser();
    },
    methods: {
        async checkIfUser() {
            this.isUser = this.post.username === this.username; // checking if user created post is the same to the one to update
        },
        openModal() { // open form
            this.showModal = true;
        },
        closeModal() { // close form
            this.showModal = false;
        },
        async updatePost() {
        try {
            // create HTTP PUT request to back-end server to modify the POST
            await fetch(`http://localhost:8000/posts/update/${this.updatedPost.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.updatedPost)
            });
            this.closeModal();
        } catch (error) {
            console.error('Error updating post:', error);
        }
        location.reload(true); // update page with new update
        }
    },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1050; 
}

.modal-content {
  background-color: #ffffff;
  border-radius: 10px;
  margin: 19% auto;
  padding: 15px;
  border: 0.5px solid rgb(0, 0, 0);
  width: 75%;
}

.form-btn {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type="text"], textarea, select {
  margin-bottom: 10px;
  padding: 8px;
}

.exit {
  float: right;
  font-size: 30px;
  position: absolute; 
  top: 10px; 
  right: 10px; 
}

.button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(251, 225, 34);
  color: white;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(255, 220, 71);
}

button[type="submit"] {
  padding: 10px 10px;
  border-radius: 5px;
  background-color: rgb(251, 225, 34);
  color: white; 
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: rgb(255, 220, 71);
}
</style>