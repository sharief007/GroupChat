<template>
  <b-form class="m-auto" @submit="onSubmit">
    <b-form-group
        label="Enter your name:"
        label-for="input-1"
        description="This username will be used in the chat."
    >
      <b-form-input id="input-1"
                    v-model="form.name"
                    type="text"
                    placeholder="Username"
                    required
                    class="mt-1"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2"
                  label="Enter Room Id"
                  description="Paste your room id you got from your friend"
                  label-for="input-2"
                  class="mt-2">
      <b-form-input
          id="input-2"
          v-model="form.roomId"
          placeholder="Room Id"
          required
          class="mt-1"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" class="mt-2">Join Room</b-button>
  </b-form>
</template>

<script>
export default {
  name: "JoinRoom",
  data() {
    return {
      form: {
        name: '',
        roomId: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$router.push('/chat/'+this.form.roomId)
    }
  }
}
</script>