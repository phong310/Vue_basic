<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h6 mb-5 border-title-dialog">
          <v-row class="pa-2 justify-space-between" align="center">
            Add New User

            <v-btn
              class="ma-2"
              variant="text"
              icon="mdi-close"
              @click="cancel"
            ></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="name"
                variant="outlined"
                @input="nameError = ''"
                :error-messages="nameError"
                rows="4"
                row-height="50"
              >
                <template v-slot:label>
                  <div class="fs-14 fw-500 lh-16" style="color: #858585">
                    Họ và Tên
                    <span class="text-red pl-1">*</span>
                  </div>
                </template></v-text-field
              >
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="email"
                variant="outlined"
                rows="4"
                row-height="50"
                @input="emailError = ''"
                :error-messages="emailError"
              >
                <template v-slot:label>
                  <div class="fs-14 fw-500 lh-16" style="color: #858585">
                    Email
                    <span class="text-red pl-1">*</span>
                  </div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="sex"
                :items="listSex"
                item-title="text"
                item-value="value"
                variant="outlined"
                :no-data-text="`No data`"
                class="main-text-field-shadow"
                density="comfortable"
              >
                <template v-slot:label>
                  <div class="fs-14 fw-500 lh-16" style="color: #858585">
                    Giới tính
                    <!-- <span class="text-red pl-1">*</span> -->
                  </div>
                </template>
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="position"
                variant="outlined"
                rows="4"
                row-height="50"
                @input="posotionError = ''"
                :error-messages="posotionError"
              >
                <template v-slot:label>
                  <div class="fs-14 fw-500 lh-16" style="color: #858585">
                    Chức vụ
                    <span class="text-red pl-1">*</span>
                  </div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="status"
                :items="listStatus"
                :error-messages="statusError"
                item-title="text"
                item-value="value"
                variant="outlined"
                :no-data-text="`No data`"
                class="main-text-field-shadow"
                density="comfortable"
              >
                <template v-slot:label>
                  <div class="fs-14 fw-500 lh-16" style="color: #858585">
                    Trạng thái
                    <span class="text-red pl-1">*</span>
                  </div>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="border-action-dialog mt-5">
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            color="blue-grey"
            @click="addUser"
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
import { ref, watch } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

watch(
  () => props.open,
  (value) => {
    if (value) {
      reset_data();
    }
  }
);

const emit = defineEmits("toggle");
const cancel = () => {
  emit("close");
};

const status = ref("");
const listStatus = ref([
  { value: "active", text: "Kích hoạt" },
  { value: "inactive", text: "Chưa kích hoạt" },
]);
const statusError = ref("");

const sex = ref("male");
const listSex = ref([
  { value: "male", text: "Nam" },
  { value: "female", text: "Nữ" },
]);

const name = ref("");
const nameError = ref();

const email = ref("");
const emailError = ref();

const position = ref("");
const posotionError = ref();

const addUser = () => {
  let hasErr = false;
  if (name.value === "") {
    hasErr = true;
    nameError.value = "Vui lòng nhập họ và tên";
  }

  if (email.value === "") {
    hasErr = true;
    emailError.value = "Vui lòng nhập email";
  } else if (!email.value.match(/^\S+@\S+\.\S+$/)) {
    hasErr = true;
    emailError.value = "Vui lòng nhập đúng định dạng Email";
  }

  if (position.value === "") {
    hasErr = true;
    posotionError.value = "Vui lòng nhập chức vụ";
  }

  if (status.value === "") {
    hasErr = true;
    statusError.value = "Vui lòng chọn trạng thái";
  }

  if (!hasErr) {
    const newUser = {
      id: Math.floor(Math.random() * 10),
      name: name.value,
      email: email.value,
      sex: sex.value,
      position: position.value,
      status: status.value,
    };

    emit("toggle", newUser);
  }

  // console.log(newUser);
};

const reset_data = () => {
  name.value = "";
  nameError.value = "";
  email.value = "";
  emailError.value = "";
  sex.value = "male";
  position.value = "";
  posotionError.value = "";
  status.value = "";
  statusError.value = "";
};
</script>
