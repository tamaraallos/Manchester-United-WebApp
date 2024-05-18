<template>
  <div>
    <!-- iterate over posts, display posts -->
    <h2>Posts</h2>
    <div class="posts-container row" v-if="displayPages.length > 0">
      <div class="post col-md-6 col-lg-4" v-for="(post) in displayPages" :key="post.id">
        <div class="post-header">
          <h3>{{ post.title }}</h3>
        </div>
        <div class="post-body">
          <p>{{ post.body }}</p>
          <div class="other-display">
            <strong>{{ post.category }}</strong>
            <p>{{ post.username }}</p>
            <PostRating v-if="username" :post="post"/>
          </div>
        </div>
        <div class="action-btn-container">
          <Delete :post="post" />  
          <Update :post="post" />
        </div>
      </div>
    </div>
    <p v-else>No posts available</p>
    <!-- pagination  -->
    <div class="pagination">
        <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': page === 1 }">
                <button type="button" class="page-link" @click="prevPage" :disabled="page === 1">
                    Prev Page
                </button>
            </li>
            <li class="page-item" v-for="pageNumber in pageCount" :key="pageNumber" :class="{ 'active': pageNumber === page }">
                <button type="button" class="page-link" @click="clickCallback(pageNumber)">
                    {{ pageNumber }}
                </button>
            </li>
            <li class="page-item" :class="{ 'disabled': page === pageCount }">
                <button type="button" class="page-link" @click="nextPage" :disabled="page === pageCount">
                    Next Page
                </button>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Delete from './Delete.vue';
import PostRating from './PostRating.vue';
import Update from './Update.vue';

export default {
  name: 'DisplayPosts',
  components: { Delete, Update, PostRating },
  data() {
    return {
      posts: [],
      page: Number(localStorage.getItem('currentPage')) || 1, // retrieve current page or go to 1
      perPage: 5,
      username: localStorage.getItem("username"),
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
      // api request
    async fetchPosts() {
      try {
        // HTTP request. 
        const response = await fetch('http://localhost:8000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();
        if (response.ok) {
          this.posts = responseData.posts;
        } else {
          console.error('Error fetching posts:', responseData.message); // testing
        }
      } catch (error) {
        console.error('Error fetching posts:', error); // testing
      }
    },
    // pagination
    clickCallback(pageNum) {
      this.page = pageNum;
      localStorage.setItem('currentPage', pageNum);
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        localStorage.setItem('currentPage', this.page);
      }
    },
     nextPage() {
        if(this.page < this.pageCount) {
          this.page++;
          localStorage.setItem('currentPage', this.page);
        }
     }
  },
  // pagination
  computed: {
    displayPages() {
      const start = this.perPage * (this.page - 1);
      const end = start + this.perPage;
      return this.posts.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.posts.length / this.perPage);
    }
  }
};
</script>

<style scoped>
h2 {
  text-transform: uppercase;
  text-align: center;
  margin-top: 30px; 
  border-bottom: 1px solid rgb(207, 207, 207); 
  color: rgb(51, 51, 51); 
  font-size: 28px; 
  font-weight: bold; 
  padding-bottom: 10px; 
  padding: 50px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px; 
}

.post {
  background-color: rgb(248, 249, 250);
  border-radius: 5px;
  box-shadow: 2px 8px 8px rgb(199, 199, 199);
  margin: 20px auto; 
  padding: 10px;
  width: 900px; 
}

.other-display {
  display: flex;
  margin: 10px;
}

/* spacing between category and username */
.other-display strong {
  margin-right: 5px; 
}

.action-btn-container {
  display: flex;
  justify-content: space-between;
  width: 100%; 
}
</style>