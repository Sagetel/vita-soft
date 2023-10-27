<template >
  <div class="post">
    <div class="post__information">
      Дата: {{ post.date.split("-").reverse().join(".") }}
      {{
        post.editDate && `ред. ${post.editDate.split("-").reverse().join(".")}`
      }}
    </div>
    <div class="post__item">Название: {{ post.title }}</div>
    <div class="post__item">Краткое описание: {{ post.subDesc }}</div>
    <div class="post__comments">
      Комментарии: {{ post.comments ? post.comments.length : 0 }}
    </div>
    <button @click="$router.push(`/post/${post.id}`)" class="post__btn">
      Перейти
    </button>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 15px;
  border: 2px solid #1ed760;
  &__information {
    font-size: 14px;
    color: #484848;
  }
  &__item {
    font-size: 28px;
    word-break: break-all;
  }
  &__btn {
    cursor: pointer;
    margin-top: 20px;
    align-self: flex-end;
    background: #1ed760;
    padding: 20px;
    font-size: 22px;
    border: 0;
  }
  &__comments {
    align-self: flex-end;

  }
  &__comments {
    font-size: 20px;
    color: #313131;
  }
}
</style>