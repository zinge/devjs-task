<template>
  <div class="add-comment">
    <div class="box">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="currentComment.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <textarea class="textarea" v-model="currentComment.body"></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-small" @click="addComment(post.id)">save</a>
        </div>
        <div class="control">
          <a class="button is-small" @click="createdComment = 0">cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/http'

export default {
  name: 'AddComment',

  props: ['post'],

  data: () => ({
    currentComment: {
      name: '',
      body: ''
    },

    createdComment: 0
  }),

  methods: {
    addComment (postId) {
      Object.assign(this.currentComment, this.currentUser, {'postId': postId})
      api.post('/posts/' + postId + '/comments', this.currentComment)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
      // this.createdComment = postId
    }
  }

}
</script>

<style>

</style>
