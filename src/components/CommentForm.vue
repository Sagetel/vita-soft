<template >
  <form class="form" @submit.prevent>
    <input
      v-model="comment.name"
      type="text"
      placeholder="Имя"
      :maxlength="50"
    />
    <input
      v-model="comment.email"
      type="email"
      placeholder="Email"
      :maxlength="50"
    />
    <textarea
      v-model="comment.text"
      name="comment"
      cols="30"
      rows="10"
      placeholder="Комментарий...."
      :maxlength="255"
    ></textarea>
    <button @click="sendComment" class="form__btn">Отправить</button>
  </form>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comment: { id: "", name: "", email: "", text: "" },
    };
  },
  methods: {
    ...mapMutations(["addComment"]),
    sendComment() {
      if (!this.comment.name) {
        alert("Укажите имя");
        return;
      } else if (!this.comment.text) {
        alert("Напишите что-нибудь в комментарий");
        return;
      }
      if (!this.isValidEmail) {
        alert("Некорректный email");
        return;
      }
      const currentDate = new Date();
      const comment = {
        id: String(Date.now()),
        date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
        name: this.comment.name,
        email: this.comment.email,
        text: this.comment.text,
      };
      this.addComment({ postId: this.postId, comment: comment });
      this.comment = { id: "", name: "", email: "", text: "" };
    },
  },
  computed: {
    isValidEmail() {
      console.log("isValidEmail");
      return this.comment.email.match(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
      );
    },
  },
};
</script>
<style lang="scss" scroped>
.form {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  input {
    margin-bottom: 10px;
  }
  input,
  textarea {
    padding: 10px;
    font-size: 20px;
  }
  &__btn {
    cursor: pointer;
    margin: 20px 0;
    border: 0;
    font-size: 20px;
    padding: 20px;
    background-color: #1ed760;
  }
}
</style>