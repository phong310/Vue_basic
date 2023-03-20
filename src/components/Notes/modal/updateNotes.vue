<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h5"> Update Notes </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="updateNotes.notes"
            label="Notes"
            auto-grow
            variant="outlined"
            rows="4"
            row-height="30"
          >
          </v-textarea>
          <span v-if="validNote" class="text-red mt-0 fz-14"
            >Vui lòng nhập ghi chú !</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="blue-grey"
            @click="update"
            prepend-icon="mdi-check"
            class="ma-2"
          >
            Update
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            @click="close"
            class="ma-2"
            prepend-icon="mdi-close"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { watch, ref } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.open,
  (value) => {
    if (value) {
      updateNotes.value = {
        id: props.item.id,
        notes: props.item.notes,
        required: props.item.required,
        date: props.item.date,
        color: props.item.color,
      };
      validNote.value = false;
      //   console.log(updateNotes.value.color);
    }
  }
);

const emit = defineEmits(["toggle"]);
const updateNotes = ref();
const validNote = ref(false);

const update = () => {
  if (updateNotes.value.notes === "") {
    validNote.value = true;
  } else {
    emit("toggle", updateNotes.value);
  }
};

const close = () => {
  emit("close");
};
</script>
