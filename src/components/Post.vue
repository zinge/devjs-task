<template>
  <div class="post">
    <article class="message">
        <div class="message-header">
          <p>{{post.title}}</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          {{post.body}}
          <!-- post menu -->
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <a class="button is-small" @click="changeCommentsState" >{{ showComments ? 'hide' : 'show'}} comments</a>
            </div>
            <div class="control">
              <a class="button is-small" @click="changePostEditState">edit</a>
            </div>
          </div>
          <!-- comments -->
          <comments v-if="showComments" :postId="post.id"></comments>
          <edit-post v-if="editPost" :post="post" v-on:closeEditForm="(state) => {this.editPost = state}"></edit-post>
        </div>
    </article>
  </div>
</template>

<script>
import Comments from './Comments.vue'
import EditPost from './EditPost.vue'

export default {
  name: 'Post',

  data: () => ({
    showComments: false,
    editPost: false
  }),

  props: ['post'],

  components: {
    Comments, EditPost
  },

  methods: {
    changeCommentsState () {
      this.showComments = !this.showComments
      if (this.showComments) {
        this.editPost = false
      }
    },

    changePostEditState () {
      this.editPost = !this.editPost
      if (this.editPost) {
        this.showComments = false
      }
    }
  }
}
</script>

<style>

</style>
