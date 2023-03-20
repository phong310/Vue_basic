<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h5 text-red"> Delete notes</v-card-title>
        <v-card-text class="text-center">
          Bạn có chắc chắn muốn xóa ghi chú số
          <span class="text-red font-weight-bold">{{ id }}</span> này ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="blue-grey"
            prepend-icon="mdi-check"
            class="ma-2"
            @click="deleteNotes"
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
import { watch } from "vue";
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
watch(() => props.open);

const emit = defineEmits(["toggle"]);

const cancel = () => {
  emit("close");
};

const deleteNotes = () => {
  emit("toggle");
};
</script>
