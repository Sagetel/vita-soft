<template >
  <form class="create" @submit.prevent>
    <h1 class="create__title">Создание поста</h1>
    <input
      v-model="title"
      class="create__input"
      type="text"
      name="head"
      placeholder="Название поста"
      :maxlength="50"
    />
    <textarea
      v-model="subDesc"
      class="create__input"
      name="shortDescription"
      placeholder="Краткое описание"
      :maxlength="100"
    ></textarea>
    <textarea
      v-model="desc"
      class="create__input"
      placeholder="Текст"
      :maxlength="255"
    ></textarea>
    <button class="create__btn" @click="createPost()">Создать пост</button>
  </form>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: {},
  data() {
    return {
      title: "",
      subDesc: "",
      desc: "",
    };
  },
  methods: {
    ...mapMutations(["addNewPost"]),
    createPost() {
      if (!this.title) {
        alert("Напишите название поста");
        return;
      } else if (!this.subDesc) {
        alert("Необходимо указать краткое описание");
        return;
      }
      
      const currentDate = new Date();
      const newPost = {
        id: String(Date.now()),
        date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
        title: this.title,
        subDesc: this.subDesc,
        desc: this.desc,
        comments: [],
      };
      this.$emit("create", newPost);
      [this.title, this.subDesc, this.desc] = "";
    },
  },
};
</script>
<style lang="scss" croped>
.create {
  display: flex;
  flex-direction: column;
  &__title {
    font-size: 28px;
    margin-bottom: 20px;
  }
  &__input {
    padding: 10px;
    font-size: 28px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  &__btn {
    cursor: pointer;
    padding: 20px;
    background-color: #1ed760;
    border: none;
    color: #181818;
    font-weight: 800;
    font-size: 24px;
    &:active {
      background-color: #42e47b;
    }
  }
}
</style>