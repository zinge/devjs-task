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
          <a class="button is-small" @click="editCurrentPost">save</a>
        </div>
        <div class="control">
          <a class="button is-small" @click="closeEditPost">cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { posts } from '@/http'

export default {
  name: 'EditPost',

  props: ['postId'],

  data: () => ({
    currentPost: {}
  }),

  methods: {
    editCurrentPost () {
      let config = {
        data: this.currentPost,
        method: 'patch'
      }

      posts(config, this.postId)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },

    initCurrentPostData () {
      posts({
        params: {
          id: this.postId
        }
      })
      .then(response => {
        this.currentPost = response.data[0]
      })
      .catch(err => {
        console.log(err)
      })
    },

    closeEditPost () {
      this.$emit('closeEditPost', false)
    }
  },

  mounted () {
    if (this.postId) {
      this.initCurrentPostData()
    }
  }
}
</script>

<style>

</style>
