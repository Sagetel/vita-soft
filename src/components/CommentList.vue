<template>
  <div class="comments">
    <div class="comments__title">
      Комментарии: {{ comments?.length ? comments.length : 0 }}
    </div>
    <div class="comments__list">
      <comment-item v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>
<script>
import CommentItem from "@/components/CommentItem.vue";
export default {
  components: {
    CommentItem,
  },
  props: {
    comments: {
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
.comments {
  padding: 20px;
  &__title {
    font-size: 24px;
    margin-bottom: 20px;
  }
}
</style>