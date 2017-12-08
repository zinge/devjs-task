<template>
  <div class="comments">
    <div class="box">
      <article class="message is-small" v-for="comment in comments" :key="comment.id">
        <div class="message-header">
          <p>{{comment.email}}</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          {{comment.body}}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { comments } from '@/http'

export default {
  name: 'Comments',

  props: ['postId'],

  data: () => ({
    comments: []
  }),

  methods: {
    getComments () {
      let config = {
        params: {
          postId: this.postId
        }
      }

      comments(config)
      .then(response => {
        this.comments = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

  mounted () {
    this.getComments()
  }
}
</script>

<style>

</style>
