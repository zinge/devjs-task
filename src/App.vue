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
import { posts } from '@/http'

import Post from './components/Post.vue'

export default {
  name: 'app',

  data: () => ({
    posts: [],

    params: {
      _limit: 5,
      _page: 1
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
      let config = {
        params: this.params
      }

      posts(config)
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
