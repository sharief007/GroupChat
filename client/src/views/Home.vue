<template>
  <b-container fluid>
    <b-row style="height: 100vh">
      <b-col class="d-flex" sm="12" md="6"><JoinRoom/></b-col>
      <b-col class="d-flex" sm="12" md="6"><CreateRoom/></b-col>
    </b-row>
  </b-container>
</template>


<script>
import JoinRoom from "@/components/JoinRoom";
import CreateRoom from "@/components/CreateRoom";
export default {
  name: 'Home',
  components: {
    JoinRoom,
    CreateRoom
  }
}
</script>
