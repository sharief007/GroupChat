<template>
  <div class="m-auto">
    <b-form  @submit="onSubmit">
      <b-form-group id="input-group-2"
                    label="Enter Room Name"
                    description="This will be used as your Group chat title"
                    label-for="input-2"
                    class="mt-2">
        <b-form-input
            id="input-2"
            v-model="roomName"
            placeholder="Room name"
            required
            class="mt-1"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success" class="mt-2" :disabled="disableCreateBtn">Create Room</b-button>
    </b-form>
    <b-modal no-close-on-esc no-close-on-backdrop scrollable
              ok-title="copy" ok-only @ok="copy" :id="roomModal"
              hide-header-close centered title="Room Id">
      <span class="mx-1" style="word-break: break-all;" v-text="roomId"></span>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "CreateRoom",
  data() {
    return {
      roomModal: 'roomModal',
      roomName: '',
      roomId: '',
      disableCreateBtn: false
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      this.disableCreateBtn = true;
      let response =  await fetch('http://localhost:1111/api/rooms/create',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({roomName : this.roomName})
          })
      this.roomId = await response.text()
      this.disableCreateBtn = false;
      this.$bvModal.show(this.roomModal)
    },
    copy() {
      navigator.clipboard.writeText(this.roomId)
    }
  }
}
</script>
