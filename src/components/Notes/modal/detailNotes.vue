<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h5 text-red"> Detail</v-card-title>
        <v-card-text class="text-center">
          {{ detail }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="blue-grey"
            prepend-icon="mdi-close"
            class="ma-2"
            @click="close"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { watch } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  detail: {
    type: Array,
    required: true,
  },
});
watch(() => props.open);

const emit = defineEmits(["toggle"]);

const close = () => {
  emit("toggle");
};
</script>
