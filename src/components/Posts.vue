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

  methods: {
    getAllPosts () {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.postPool = response.data
      })
      .catch(err => {
        this.error.push(err)
      })
    }
  },

  mounted () {
    this.getAllPosts()
  }
}
</script>
