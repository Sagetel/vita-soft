<template>
  <div class="main">
    <post-form @create="createPost" />
    <posts-list :posts="$store.state.posts" />
  </div>
</template>
<script>
import PostsList from "@/components/PostsList";
import PostForm from "@/components/PostForm";
import { mapMutations } from "vuex";
export default {
  components: {
    PostsList,
    PostForm,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapMutations(["addNewPost"]),
    createPost(post) {
      this.addNewPost(post);
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  padding: 20px;
}
</style>