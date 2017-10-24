<template>
  <div class="posts">
    {{postPool}}
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Posts',

  data: () => ({
    postPool: [],
    error: []
  }),

  mounted: {
    getAllPosts () {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.postPool = response.data
      })
      .catch(err => {
        this.error.push(err)
      })
    }
  }
}
</script>
