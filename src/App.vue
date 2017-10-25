<template>
  <div id="app">
    <div class="section">
      <div class="container">
        <div class="field is-grouped is-grouped-centered" v-if="!userSelected">
          <div class="control">
            <div class="select">
              <select v-model="userSelected">
                <option disabled value="false">who are you? please select</option>
                <option v-for="user in userPool" :key="user.id" :value="user.id">{{user.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-right" v-if="userSelected">
          <div class="control">
            <a class="button" @click="changeUser">You {{currentUser.name}}, change?</a>
          </div>
        </div>
        <div class="wrapper" v-if="userSelected">
          <article class="message" v-for="post in postPool" :key="post.id">
            <div class="message-header">
              <strong>{{post.id + ': ' +post.title}}</strong>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              {{post.body}}<br>
              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <a class="button" @click="getComments(post.id)" :disabled="editedPost[post.id]">{{ showComments[post.id] ? 'hide' : 'show' }} comments</a>
                </div>
                <div class="control">
                  <a class="button" @click="editPost(post.id)" :disabled="post.userId === currentUser.id ? false : true" >{{ editedPost[post.id] ? 'close' : 'edit' }}</a>
                </div>
              </div>
              <div class="box" v-if="showComments[post.id]">
                <article class="message" v-for="comment in comments[post.id]" :key="comment.id">
                  <div class="message-header">
                    <p>{{comment.email}}</p>
                    <button class="delete" aria-label="delete"></button>
                  </div>
                  <div class="message-body">
                    {{comment.body}}
                  </div>
                </article>
              </div>
              <div class="box" v-if="editedPost[post.id]">
                <div class="field">
                  <label class="label">Title</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="title input">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Comment</label>
                  <div class="control">
                    <textarea class="textarea" placeholder="comment input"></textarea>
                  </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                  <div class="control">
                    <a class="button">save</a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data: () => ({
    userPool: [],
    postPool: [],
    userSelected: false,
    currentUser: {},
    error: [],
    comments: [false],
    showComments: [false],
    editedPost: [false],
    editComment: [false]
  }),

  watch: {
    userSelected () {
      if (this.userSelected) {
        let url = 'https://jsonplaceholder.typicode.com/users/' + this.userSelected
        axios.get(url)
        .then(response => {
          this.currentUser = response.data
        })
        .catch(err => {
          this.error.push(err)
        })
      } else {
        this.currentUser = {}
      }
    }
  },

  methods: {
    getAllPosts () {
      axios.get('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5')
      .then(response => {
        this.postPool = response.data
      })
      .catch(err => {
        this.error.push(err)
      })
    },

    getComments (postId) {
      if (this.showComments[postId]) {
        this.showComments.splice(postId, 1, false)
      } else {
        let url = 'https://jsonplaceholder.typicode.com/posts/' + postId + '/comments'
        axios.get(url)
        .then(response => {
          this.comments[postId] = response.data
          this.showComments.splice(postId, 1, true)
        })
        .catch(err => {
          this.error.push(err)
        })
      }
    },

    editPost (postId) {
      if (this.editedPost[postId]) {
        this.editedPost.splice(postId, 1, false)
      } else {
        if (this.editedPost.length < postId) {
          this.editedPost.splice(postId)
        }
        this.editedPost.splice(postId, 1, true)
        this.showComments.splice(postId, 1, false)
      }
    },

    getAllUsers () {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.userPool = response.data
      })
      .catch(err => {
        this.error.push(err)
      })
    },

    changeUser () {
      this.userSelected = false
    }
  },

  mounted () {
    this.getAllUsers()
    this.getAllPosts()
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
