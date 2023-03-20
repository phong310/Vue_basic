<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h5 text-red border-title-dialog">
          <v-row class="pa-2 justify-space-between" align="center">
            Delete user
            <v-btn
              class="ma-2"
              variant="text"
              icon="mdi-close"
              @click="cancel"
            ></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center my-10">
          Bạn có chắc chắn muốn xóa người dùng số
          <span class="text-red font-weight-bold">{{ id }}</span> này ?
        </v-card-text>
        <v-card-actions class="border-action-dialog mt-5">
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="blue-grey"
            prepend-icon="mdi-check"
            class="ma-2"
            @click="deleteUser"
          >
            Delete
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            class="ma-2"
            prepend-icon="mdi-close"
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits("toggle");

const deleteUser = () => {
  emit("toggle");
};

const cancel = () => {
  emit("close");
};
</script>
