<template>
  <div id="app">
    <div class="section">
      <div class="container">
        <!-- posts -->
        <article class="message" v-for="post in posts" :key="post.id">
          <div class="message-header">
            <p>{{post.title}}</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            {{post.body}}
            <!-- post buttons -->
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <a class="button is-small" @click="createdComment = post.id" :disabled="editedPost === post.id ? true : false">add comments</a>
              </div>
              <div class="control">
                <a class="button is-small" @click="showComments(post.id)" :disabled="editedPost === post.id ? true : false">{{ commentsInPost ? 'hide' : 'show'}} comments</a>
              </div>
              <div class="control">
                <a class="button is-small" @click="editedPost = post.id">edit</a>
              </div>
            </div>
            <!-- post edit form -->
            <div class="box" v-if="editedPost === post.id">
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
                  <a class="button is-small" @click="editPost(post.id)">save</a>
                </div>
                <div class="control">
                  <a class="button is-small" @click="editedPost = 0">cancel</a>
                </div>
              </div>
            </div>
            <!-- comments -->
            <div class="box" v-if="commentsInPost === post.id">
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
            <!-- comment add form -->
            <div class="box" v-if="createdComment === post.id">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" v-model="currentUser.email">
                </div>
              </div>
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
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data: () => ({
    posts: [],
    currentPost: {
      title: '',
      body: ''
    },
    currentComment: {
      name: '',
      body: ''
    },
    comments: [],
    editedPost: 0,
    commentsInPost: 0,
    createdComment: 0,
    currentUser: {
      email: ''
    },
    API: {
      baseUrl: 'https://jsonplaceholder.typicode.com',
      page: 1,
      postsPerPage: 5
    }
  }),

  methods: {
    getPosts () {
      axios.get(this.API.baseUrl + '/posts?_page=' + this.API.page + '&_limit=' + this.API.postsPerPage)
      .then(response => {
        this.posts = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },

    showComments (postId) {
      if (!this.commentsInPost) {
        axios.get(this.API.baseUrl + '/posts/' + postId + '/comments')
        .then(response => {
          this.comments = response.data
          this.commentsInPost = postId
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.commentsInPost = 0
      }
    },

    editPost (postId) {
      axios.patch(this.API.baseUrl + '/posts/' + postId, this.currentPost)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
      this.editedPost = 0
    },

    addComment (postId) {
      Object.assign(this.currentComment, this.currentUser, {'postId': postId})
      axios.post(this.API.baseUrl + '/posts/' + postId + '/comments', this.currentComment)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
      this.createdComment = postId
    }
  },

  mounted () {
    this.getPosts()
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
