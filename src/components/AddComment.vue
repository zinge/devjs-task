<template>
  <div class="add-comment">
    <div class="box">
      <div class="field">
        <label class="label">You email address</label>
        <div class="control">
          <input class="input" type="text" v-model="currentComment.email">
        </div>
      </div>
      <div class="field">
        <label class="label">Comment name</label>
        <div class="control">
          <input class="input" type="text" v-model="currentComment.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Comment body</label>
        <div class="control">
          <textarea class="textarea" v-model="currentComment.body"></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-small" @click="addComment(postId)">save</a>
        </div>
        <div class="control">
          <a class="button is-small" @click="closeAddComment">cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { comments } from '@/http'

export default {
  name: 'AddComment',

  props: ['postId'],

  data: () => ({
    currentComment: {
      email: '',
      name: '',
      body: ''
    }
  }),

  methods: {
    addComment (postId) {
      let config = {
        data: this.currentComment,
        method: 'post'
      }
      comments(config, this.postId)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },

    closeAddComment () {
      this.$emit('closeAddComment', false)
    }
  }
}
</script>

<style>

</style>
