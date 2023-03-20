<template>
  <v-row justify="center">
    <v-dialog :model-value="open" persistent width="1000" class="pa-5">
      <v-card>
        <v-card-title class="text-h6 mb-5 border-title-dialog">
          <v-row class="pa-2 justify-space-between" align="center">
            Update User

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
                v-model="newData.name"
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
                v-model="newData.email"
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
                v-model="newData.sex"
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
                v-model="newData.position"
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
                v-model="newData.status"
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
            @click="updateUser"
            prepend-icon="mdi-plus"
            class="ma-2"
          >
            Update
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
import { watch, ref, defineProps, defineEmits } from "vue";

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

const newData = ref({});
const listStatus = ref([
  { value: "active", text: "Kích hoạt" },
  { value: "inactive", text: "Chưa kích hoạt" },
]);
const listSex = ref([
  { value: "male", text: "Nam" },
  { value: "female", text: "Nữ" },
]);

const nameError = ref("");
const emailError = ref("");
const posotionError = ref("");
const statusError = ref("");

const cancel = () => {
  emit("close");
};

watch(
  () => props.open,
  (value) => {
    if (value) {
      newData.value = {
        id: props.data.id,
        name: props.data.name,
        email: props.data.email,
        sex: props.data.sex,
        position: props.data.position,
        status: props.data.status,
      };
      reset();
    }
  }
);

const reset = () => {
  nameError.value = "";
  emailError.value = "";
  posotionError.value = "";
  statusError.value = "";
};

const updateUser = () => {
  let hasErr = false;
  if (newData.value.name === "") {
    hasErr = true;
    nameError.value = "Vui lòng nhập họ và tên";
  }

  if (newData.value.email === "") {
    hasErr = true;
    emailError.value = "Vui lòng nhập email";
  } else if (!newData.value.email.match(/^\S+@\S+\.\S+$/)) {
    hasErr = true;
    emailError.value = "Vui lòng nhập đúng định dạng Email";
  }

  if (newData.value.position === "") {
    hasErr = true;
    posotionError.value = "Vui lòng nhập chức vụ";
  }

  if (newData.value.status == "") {
    hasErr = true;
    statusError.value = "Vui lòng chọn trạng thái";
  }

  if (!hasErr) {
    emit("toggle", newData.value);
  }
};
</script>
