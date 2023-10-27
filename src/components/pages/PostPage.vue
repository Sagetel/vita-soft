<template>
  <div v-if="post">
    <div class="post">
      <div class="post__information">
        Дата публикации: {{ post.date.split("-").reverse().join(".") }}
        {{
          post.editDate &&
          `ред. ${post.editDate.split("-").reverse().join(".")}`
        }}
      </div>
      <form @submit.prevent class="post__form">
        <input
          v-model="post.title"
          :disabled="!editMode"
          class="create__input"
          type="text"
          name="head"
          placeholder="Название поста"
          :maxlength="50"
        />
        <textarea
          v-model="post.subDesc"
          :disabled="!editMode"
          class="create__input"
          name="shortDescription"
          placeholder="Краткое описание"
          :maxlength="100"
        ></textarea>
        <textarea
          v-model="post.desc"
          :disabled="!editMode"
          class="create__input"
          placeholder="Текст"
          rows="5"
          :maxlength="255"
        ></textarea>
        <div class="post__btns">
          <button @click="delPost()" class="post__btn">Удалить пост</button>
          <button @click="changeMode()" class="post__btn">
            {{ editMode ? "Сохранить изменения" : "Режим редактирования" }}
          </button>
        </div>
      </form>
    </div>
    <comment-list :comments="post.comments" />
    <comment-form :postId="post.id" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
export default {
  components: {
    CommentForm,
    CommentList,
  },
  created() {
    this.getPostById(this.$route.params.id);
  },

  data() {
    return {
      editMode: false,
    };
  },

  computed: {
    ...mapGetters(["getPostById"]),
    post() {
      return this.getPostById(this.$route.params.id);
    },
  },

  methods: {
    ...mapMutations(["editPost", "deletePost"]),
    changeMode() {
      if (!this.editMode) {
        this.editMode = !this.editMode;
      } else {
        if (!this.post.title) {
          alert("Напишите название поста");
          return;
        } else if (!this.post.subDesc) {
          alert("Необходимо указать краткое описание");
          return;
        }
        const currentDate = new Date();
        this.post.editDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
        this.editPost(this.post);
        this.editMode = !this.editMode;
      }
    },
    delPost() {
      this.$router.push("/");
      this.deletePost(this.post.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  padding: 20px;
  margin: 20px;
  border: 5px solid #1ed760;
  &__information {
    font-size: 14px;
    color: #484848;
  }
  &__item {
    font-size: 28px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  input,
  textarea {
    &:disabled {
      background: none;
      border: 0;
      color: black;
    }
  }
  textarea {
    resize: vertical;
    max-height: 300px;
    min-height: 50px;
  }

  &__btns {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    align-self: flex-end;
    font-size: 22px;
  }
  &__btn {
    cursor: pointer;
    background: #1ed760;
    padding: 20px;
    border: 0;
  }
}
</style>