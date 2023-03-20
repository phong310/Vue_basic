<template>
  <main>
    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="showAddModal">+</button>
      </header>

      <div class="cards-container">
        <div
          class="card"
          v-for="(note, i) in noteList"
          :key="i"
          :style="{ backgroundColor: note.color }"
        >
          <p class="main-text">
            {{ note.notes }}
          </p>
          <div class="d-flex justify-space-between align-center">
            <p class="date">{{ getDate(note.date) }}</p>
            <div class="d-flex justify-end">
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="plain"
                    icon
                    color="purple"
                    size="small"
                    @click="showDetailModal(note)"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span>Chi tiết</span>
              </v-tooltip>
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="plain"
                    icon
                    size="small"
                    @click="showUpdateModal(note)"
                    color="blue"
                  >
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>
                </template>
                <span>Sửa</span>
              </v-tooltip>
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="plain"
                    icon
                    size="small"
                    color="red"
                    @click="showDeleteModal(note.id)"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </template>
                <span>Xóa</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pop up add -->
    <addNotes
      :open="openAddModal"
      @toggle="addNewNotes"
      @close="openAddModal = false"
    />

    <!-- Pop up delete -->
    <deleteNotes
      :open="openDeleteModal"
      :id="idNotes"
      @close="openDeleteModal = false"
      @toggle="DeleteNotes"
    />

    <!-- Pop up detail -->
    <detailNotes
      :open="openDetail"
      @toggle="openDetail = false"
      :detail="listDetal"
    />

    <updateNotes
      :open="openUpdate"
      :item="listItemNote"
      @toggle="updateNote"
      @close="openUpdate = false"
    />
  </main>
</template>
<script setup>
import "@/assets/main.css";
import moment from "moment";
import { ref } from "vue";
import addNotes from "@/components/Notes/modal/addNotes.vue";
import deleteNotes from "@/components/Notes/modal/deleteNotes.vue";
import detailNotes from "@/components/Notes/modal/detailNotes.vue";
import updateNotes from "@/components/Notes/modal/updateNotes.vue";
import { useToast } from "vue-toastification";
import { noteData } from "@/utils/data.js";

const openAddModal = ref(false);
const openDeleteModal = ref(false);
const openDetail = ref(false);
const openUpdate = ref(false);

const idNotes = ref();
const listDetal = ref([]);
const listItemNote = ref({});

const toast = useToast();

const noteList = ref(noteData);

const showAddModal = () => {
  openAddModal.value = true;
};

const showDeleteModal = (e) => {
  openDeleteModal.value = true;
  idNotes.value = e;
};

const showUpdateModal = (item) => {
  openUpdate.value = true;
  // console.log(item);
  listItemNote.value = item;
};

// Add
const addNewNotes = (newNote) => {
  noteList.value.push(newNote);
  openAddModal.value = false;
  toast.success("Thêm mới ghi chú thành công !");
};

// Detail
const showDetailModal = (item) => {
  openDetail.value = true;
  listDetal.value = item;
};

// Delete
const DeleteNotes = () => {
  noteList.value = noteList.value.filter((item) => item.id !== idNotes.value);
  toast.success("Xóa ghi chú thành công !");
  openDeleteModal.value = false;
};

// Update
const updateNote = (item) => {
  noteList.value.forEach((itemNote) => {
    if (itemNote.id === item.id) {
      itemNote.notes = item.notes;
    }
  });
  toast.success("Sửa ghi chú thành công !");
  openUpdate.value = false;
};

const getDate = (s) => moment(s).format("DD/MM/YYYY");
</script>
<style></style>
