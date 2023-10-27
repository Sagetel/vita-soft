<template>
  <div class="comment">
    <div class="comment__information">
      Дата: {{ comment.date.split("-").reverse().join(".") }}
    </div>
    <div class="comment__item">Имя: {{ comment.name }}</div>
    <div class="comment__item">Почта: {{ comment.email }}</div>
    <div class="comment__item">Текст: {{ comment.text }}</div>
    <button @click="delComment()">Удалить бредятину</button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["deleteComment"]),
    delComment() {
      this.deleteComment({
        postId: this.$route.params.id,
        commentId: this.comment.id,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.comment {
  border: 3px solid rgb(107, 42, 176);
  padding: 20px;
  &__information {
    font-size: 14px;
    color: #484848;
  }
  &__item {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>