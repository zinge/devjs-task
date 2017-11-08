<template>
  <div class="edit-post">
    <div class="box">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" type="text" v-model="currentPost.title">
        </div>
      </div>
      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <textarea class="textarea" v-model="currentPost.body"></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-small" @click="edit">save</a>
        </div>
        <div class="control">
          <a class="button is-small" @click="closeEditForm">cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../http'

export default {
  name: 'EditPost',

  props: ['post'],

  data: () => ({
    currentPost: {}
  }),

  methods: {
    edit () {
      HTTP.patch('https://jsonplaceholder.typicode.com/posts/' + this.currentPost.id, this.currentPost)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },

    initCurrentPostData () {
      this.currentPost = this.post
    },

    closeEditForm () {
      this.$emit('closeEdit', false)
    }
  },

  mounted () {
    this.initCurrentPostData()
  }
}
</script>

<style>

</style>
