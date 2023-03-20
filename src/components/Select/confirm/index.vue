<template>
  <v-card>
    <v-card-title class="mt-5 ml-3 mb-5">
      <v-row
        align="center"
        class="justify-space-between"
        style="max-width: 1800px"
      >
        <h3 class="text-purple">Xác nhận gửi</h3>
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="tonal"
          color="purple"
          to="/send-notify"
        >
          Quay lại
        </v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" class="border-e">
          <v-text-field
            v-model="filterText"
            variant="outlined"
            density="compact"
            class="main-text-field-shadow py-3 mb-0"
            clearable
          >
            <template v-slot:label>
              <div class="fs-14 fw-500 lh-16" style="color: #858585">
                Tiêu đề
                <span class="text-red pl-1">*</span>
              </div>
            </template></v-text-field
          >
          <v-text-field
            v-model="filterText"
            variant="outlined"
            density="compact"
            class="main-text-field-shadow py-3 mt-0"
            label="Loại thông báo"
            clearable
          >
            <template v-slot:label>
              <div class="fs-14 fw-500 lh-16" style="color: #858585">
                Loại thông báo
                <span class="text-red pl-1">*</span>
              </div>
            </template>
          </v-text-field>
          <v-textarea variant="outlined">
            <template v-slot:label>
              <div class="fs-14 fw-500 lh-16" style="color: #858585">
                Nội dung...
                <span class="text-red pl-1">*</span>
              </div>
            </template>
          </v-textarea>
          <v-btn
            color="purple"
            class="mt-5"
            style="width: 2000px"
            @click="handleSendNotify"
          >
            Gửi thông báo
          </v-btn>
        </v-col>

        <!-- -------------------------------------------------------------------------------- -->

        <v-col cols="6">
          <h3 class="text-purple">Danh sách người nhận</h3>
          <div v-if="!listSeleted.length" class="text-center">
            <div class="mt-10">
              <v-avatar rounded size="40">
                <v-img src="src/assets/images/Drawer-Fail.png" />
              </v-avatar>
            </div>
            <div class="text-center lh-22 fs-14 fw-400">Không có dữ liệu</div>
          </div>
          <v-row v-else class="px-3 mt-5">
            <v-col
              cols="3"
              v-for="item in listSeleted"
              class="d-flex align-center justify-center flex-column mb-2"
            >
              <div class="position-relative">
                <v-avatar>
                  <v-img :src="item.img" cover></v-img>
                </v-avatar>
                <v-btn
                  size="14"
                  class="rounded-circle text-white position-absolute btn-delete"
                  style="top: 0; left: -6px"
                  color="#333333"
                >
                  <v-icon size="12" icon="mdi-close"></v-icon>
                </v-btn>
              </div>
              <p class="fw-400 mt-2 fs-14" style="color: #1a1a1a">
                {{ item.name }}
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useStore } from "vuex";
import { watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const store = useStore();
const router = useRouter();
const toast = useToast();
const listSeleted = ref([]);

const handleSendNotify = () => {
  router.push("/send-notify");
  toast.success("Gửi thông báo thành công");
};

watch(
  () => store.state.selectedArr,
  () => {
    listSeleted.value = store.state.selectedArr;
  }
);

onMounted(() => {
  listSeleted.value = store.state.selectedArr;
});
</script>
