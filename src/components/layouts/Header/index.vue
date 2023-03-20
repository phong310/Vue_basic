<template>
  <v-tabs v-model="tab" bg-color="purple" center-active>
    <v-tab value="Notes" to="/">Notes</v-tab>
    <v-tab value="Users" to="/user">Users</v-tab>
    <v-tab value="Select" to="/send-notify">Send</v-tab>
    <v-tab>Four</v-tab>
    <v-tab>Five</v-tab>
    <v-tab>Six</v-tab>
    <v-tab>Seven</v-tab>
    <v-tab>Eight</v-tab>
    <v-tab>Nine</v-tab>
    <v-tab>Ten</v-tab>
    <v-tab>Eleven</v-tab>
    <v-tab>Twelve</v-tab>
    <v-tab>Thirteen</v-tab>
    <v-tab>Fourteen</v-tab>
    <v-tab>Fifteen</v-tab>
    <v-tab>Sixteen</v-tab>
    <v-tab>Seventeen</v-tab>
    <v-tab>Eighteen</v-tab>
    <v-tab>Nineteen</v-tab>
    <v-tab>Twenty</v-tab>
  </v-tabs>
  <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="Notes">
        <router-view />
      </v-window-item>

      <v-window-item value="Users">
        <router-view />
      </v-window-item>

      <v-window-item value="Select"> <router-view /> </v-window-item>
    </v-window>
  </v-card-text>
</template>
<script>
import Notes from "@/components/Notes/index.vue";
import { defineComponent, ref } from "vue";
import Users from "@/components/Users/index.vue";
import Selects from "@/components/Select/index.vue";
// import SideBar from "@/components/layouts/sidebar.vue";
export default defineComponent({
  components: {
    Notes,
    Users,
    Selects,
  },

  setup() {
    const tab = ref();

    return {
      tab,
    };
  },
});
</script>

<style></style>
