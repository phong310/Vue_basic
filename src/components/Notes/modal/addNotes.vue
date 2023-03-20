<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h5"> Add New Notes </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="noteTask"
            label="Notes"
            auto-grow
            variant="outlined"
            rows="4"
            row-height="50"
          ></v-textarea>
          <span v-if="validNote" class="text-red mt-0"
            >Vui lòng nhập ghi chú !</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="blue-grey"
            @click="addnewNots"
            prepend-icon="mdi-plus"
            class="ma-2"
          >
            Add
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            @click="cancel"
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
});
const emit = defineEmits(["toggle"]);
const noteTask = ref("");
const newNote = ref({});
const validNote = ref(false);

// Random color
const getRandomColor = () => {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
};

const addnewNots = () => {
  if (noteTask.value === "") {
    validNote.value = true;
  } else {
    newNote.value = {
      id: Math.floor(Math.random() * 10),
      notes: noteTask.value,
      required: true,
      date: new Date(),
      color: getRandomColor(),
    };
    emit("toggle", newNote.value);
  }
};

const reset_note = () => {
  noteTask.value = "";
  validNote.value = false;
};

const cancel = () => {
  emit("close");
};

watch(noteTask, (_noteTask) => {
  if (_noteTask) {
    validNote.value = false;
  }
});

watch(
  () => props.open,
  (value) => {
    if (value) {
      reset_note();
      // console.log("Vào đấy");
    }
  }
);
</script>
