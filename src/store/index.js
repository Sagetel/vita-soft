import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    getPosts: (state) => state.posts,
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id == id)
    }
  },
  mutations: {
    addNewPost(state, post) {
      state.posts.push(post);
      this.commit('setPosts', state.posts);
    },
    addComment(state, payload) {
      const indexOfPost = state.posts.findIndex(post => post.id === payload.postId);
      if (indexOfPost !== -1) {
        state.posts[indexOfPost].comments.push(payload.comment);
        this.commit('setPosts', state.posts);
      }
    },
    deleteComment(state, payload) {
      const indexOfPost = state.posts.findIndex(post => post.id === payload.postId);
      if (indexOfPost !== -1) {
        state.posts[indexOfPost].comments = state.posts[indexOfPost].comments.filter(item => item.id != payload.commentId);
        this.commit('setPosts', state.posts);
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(item => item.id != postId)
      this.commit('setPosts', state.posts);
    },

    editPost(state, post) {
      state.posts = state.posts.filter(item => item.id != post.id)
      this.commit('addNewPost', (state, post));
    },

    getPosts(state) {
      const postsString = localStorage.getItem('Posts');
      if (postsString) {
        state.posts = JSON.parse(postsString);
      }
    },
    setPosts(state, posts) {
      state.posts = posts;
      localStorage.setItem('Posts', JSON.stringify(posts));
    }
  },

  actions: {
    loadPosts({ commit }) {
      commit('getPosts');
    }
  }
});