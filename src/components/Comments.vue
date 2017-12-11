<template>
  <div class="comments">
    <div class="box">
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-small" @click="changeAddCommentState">{{ showAddComment ? 'hide comment form' : 'add new comment' }}</a>
        </div>
      </div>
      <add-comment
        v-if="showAddComment"
        :postId="postId"
        v-on:closeAddComment="emitCloseAddComment"
      ></add-comment>
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

import AddComment from './AddComment.vue'

export default {
  name: 'Comments',

  props: ['postId'],

  components: {
    AddComment
  },

  data: () => ({
    comments: [],
    showAddComment: false
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
    },

    changeAddCommentState () {
      this.showAddComment = !this.showAddComment
    },

    emitCloseAddComment (state) {
      this.showAddComment = state
    }
  },

  mounted () {
    this.getComments()
  }
}
</script>

<style>

</style>
