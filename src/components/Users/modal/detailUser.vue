<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h5 text-red border-title-dialog">
          <v-row class="pa-2 justify-space-between" align="center">
            Detail user
            <v-btn
              class="ma-2"
              variant="text"
              icon="mdi-close"
              @click="cancel"
            ></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center my-10"> {{ data }}</v-card-text>
        <v-card-actions class="border-action-dialog mt-5">
          <v-spacer></v-spacer>
          <v-btn
            color="blue-grey"
            variant="flat"
            class="ma-2"
            prepend-icon="mdi-close"
            @click="cancel"
          >
            close
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
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits("toggle");

const cancel = () => {
  emit("toggle");
};
</script>
