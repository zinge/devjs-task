<template>
  <div id="app">
    <div class="section">
      <div class="container">
        <post v-for="post in posts" :key="post.id" :post="post"></post>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from './http'

import Post from './components/Post.vue'

export default {
  name: 'app',

  data: () => ({
    posts: [],

    page: {
      currentPage: 1,
      postsPerPage: 5
    }
  }),

  components: {
    Post
  },

  mounted () {
    this.getPosts()
  },

  methods: {
    getPosts () {
      HTTP.get('https://jsonplaceholder.typicode.com/posts?_page=' + this.page.currentPage + '&_limit=' + this.page.postsPerPage)
      .then(response => {
        this.posts = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
