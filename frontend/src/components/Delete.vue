<template>
  <div v-if="isUser">
    <button class="button" @click="deletePost">Delete</button>
  </div>
</template>

<script>
export default {
    name: 'Delete',
    props: ['post'],
    data() {
        return {
        isUser: false,
        username: localStorage.getItem('username') // stores user session
        };
    },
    mounted() {
        this.checkIfUser(); // verified user
    },
    methods: {
        async checkIfUser() {
        this.isUser = this.post.username === this.username;
        },
        async deletePost() {
        try {
            // HTTP delete request to back end, using post id
            await fetch(`http://localhost:8000/posts/${this.post.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            location.reload(true);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
        },
    },
};
</script>

<style scoped>
.button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(240, 52, 27);
    color: white;
    border: none;
    cursor: pointer;
}

.button:hover {
  background-color: rgb(255, 0, 0);
}
</style>