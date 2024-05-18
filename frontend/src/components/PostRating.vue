<template>
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-md-6">
        <div class="post-ratings-container">
          <div class="row">
            <div class="col-sm-6">
              <div class="post-rating" :class="{ 'post-rating-selected': selectedRating === 'like' }" @click="sendLikeType('like')">
                <span class="post-rating-button material-icons">thumb_up_alt</span>
                <span class="post-rating-count">{{ post.likes.length }}</span>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="post-rating" :class="{ 'post-rating-selected': selectedRating === 'dislike' }" @click="sendLikeType('dislike')">
                <span class="post-rating-button material-icons">thumb_down_alt</span>
                <span class="post-rating-count">{{ post.dislikes.length }}</span>
              </div>
            </div>
          </div>
        </div>
         <ErrorMsg :errorMsg="errorMessage" :closeFunction="closeError" v-if="errorMessage" />        
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMsg from './ErrorMsg.vue';

export default {
  name: 'PostRating.vue',
  components: { ErrorMsg },
  props: {
      post: {
          type: Object,
          required: true
      },
  },
  data() {
      return {
          username: localStorage.getItem("username"),
          userInteracted: false,
          selectedRating: null, // changing color css
          errorMessage: '',
      }
  },
  methods: {
    async sendLikeType(likeType) {
      if (!this.userInteracted) {
        try {
          // HTTP request to backend. sends necessary data such as username/like/dislike and postid
          const response = await fetch(`http://localhost:8000/posts/likeType/${this.post.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.username, likeType })
          });
          if (!response.ok) {
            throw new Error('failed to update /like/dislike');
          }

          const data = await response.json();
          if(data.success) {
            if (likeType === 'like') {
              this.post.likes.push(this.username);
              this.selectedRating = 'like';
            } else if (likeType === 'dislike') {
              this.post.dislikes.push(this.username);
              this.selectedRating = 'dislike';
            }
            this.userInteracted = true;
          }
        } catch (error) {
          this.errorMessage = 'You can only interact with a post one. You have already reacted to this post!'
        }
      }
    },
    closeError() {
      this.errorMessage = '';
    }
  }
};
</script>

<style scoped>
/* positioning */
.post-ratings-container {
  display: flex;
  justify-content: end;
}

/* alignment of items */
.post-rating {  
  display: flex;
  align-items: center;
  cursor: default;
}

.post-rating-selected >.post-rating-button, 
.post-rating-selected >.post-rating-count {
  color: red;
}

/* spacing in between */
.post-rating:not(:last-child) {
  margin-right: 12px;
}

.post-rating-button {
  margin-right: 6px; 
  cursor: pointer;
  color: rgb(119, 119, 119);
}
/* Choose any post rating not selected */
.post-rating:not(.post-rating-selected) >.post-rating-button:hover {
  color: rgb(66, 66, 66); 
}

/* Reference:
This feature, ESPECIALLY the styling was referenced from 
https://www.youtube.com/watch?v=20tJJAI6_oA <-- Link
*/

</style>