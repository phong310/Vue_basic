<template>
  <v-card>
    <v-card-title class="mt-5 ml-3 mb-5">
      <v-row
        align="center"
        class="justify-space-between"
        style="max-width: 1190px"
      >
        <h3 class="text-purple">Gửi thông báo</h3>
        <h3 class="text-purple">Danh sách người nhận</h3>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" class="border-e">
          <v-text-field
            v-model="filterText"
            variant="outlined"
            density="compact"
            class="main-text-field-shadow py-3"
            label="Tìm kiếm"
            clearable
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>

          <v-tabs
            show-arrows
            v-model="tab"
            color="purple"
            class="border-b position-relative"
            @update:modelValue="handleCurrentTab"
          >
            <v-tab value="ALL" class="text-none">
              <span class="font-weight-medium fz-14">
                Tất cả
                <v-chip
                  class="fz-9 cp mb-1 ms-1"
                  size="x-small"
                  color="grey-lighten-2"
                  variant="elevated"
                  elevation="0"
                >
                  {{ getTotal("ALL") }}
                </v-chip>
              </span>
            </v-tab>
            <v-tab value="PARENT" class="text-none">
              <span class="font-weight-medium fz-14">
                Phụ huynh
                <v-chip
                  class="fz-9 cp mb-1 ms-1"
                  size="x-small"
                  color="grey-lighten-2"
                  variant="elevated"
                  elevation="0"
                >
                  {{ getTotal("PARENT") }}
                </v-chip>
              </span>
            </v-tab>
            <v-tab value="STUDENT" class="text-none">
              <span class="font-weight-medium fz-14">
                Học sinh
                <v-chip
                  class="fz-9 cp mb-1 ms-1"
                  size="x-small"
                  color="grey-lighten-2"
                  variant="elevated"
                  elevation="0"
                >
                  {{ getTotal("STUDENT") }}
                </v-chip>
              </span>
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item
              v-for="n in ['ALL', 'PARENT', 'STUDENT']"
              :key="n"
              :value="n"
              style="height: calc(100vh - 370px); overflow: auto"
            >
              <main v-if="filterListAll(n).length" style="width: 850px">
                <v-row align="center" class="my-3 ml-0 pr-3">
                  <v-checkbox
                    v-model="isCheckedAll"
                    label="Chọn tất cả"
                    color="purple"
                    class="mt-1"
                    @change="selectAll(n)"
                  ></v-checkbox>
                  <span
                    class="fw-500 fs-10 mb-4"
                    style="color: rgb(177, 177, 177)"
                  >
                    Đã chọn:
                    {{ listSeleted.length + "/" + listsAll.length }}</span
                  >
                </v-row>
                <div
                  class="d-flex align-center border-b"
                  v-for="(item, i) in filterListAll(n)"
                  :key="i"
                >
                  <div class="mt-5">
                    <v-checkbox
                      v-model="item.checked"
                      color="purple"
                      @change="handelSelected(item)"
                    ></v-checkbox>
                  </div>

                  <div class="mx-3">
                    <v-avatar>
                      <v-img :src="item.img" alt="John"></v-img>
                    </v-avatar>
                  </div>
                  <div>
                    <h3 class="fw-900" style="color: purple">
                      {{ item.name }}
                    </h3>
                    <p class="fw-900 text-gray">
                      Email:
                      <span class="font-weight-bold"> {{ item.email }}</span>
                    </p>
                    <p class="fw-900 text-gray">
                      SĐT:
                      <span class="font-weight-bold">{{ item.phone }}</span>
                    </p>
                  </div>
                </div>
              </main>

              <div v-else class="text-center">
                <div class="mt-10">
                  <v-avatar rounded size="40">
                    <v-img src="src/assets/images/Drawer-Fail.png" />
                  </v-avatar>
                </div>
                <div class="text-center lh-22 fs-14 fw-400">
                  Không có dữ liệu
                </div>
              </div>
            </v-window-item>
          </v-window>
        </v-col>

        <!-- -------------------------------------------------------------------------------- -->

        <v-col cols="6">
          <div v-if="!listSeleted.length" class="text-center">
            <div class="mt-10">
              <v-avatar rounded size="40">
                <v-img src="src/assets/images/Drawer-Fail.png" />
              </v-avatar>
            </div>
            <div class="text-center lh-22 fs-14 fw-400">Không có dữ liệu</div>
          </div>
          <v-row v-else class="px-3">
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
                  @click="handleDeleteSelectedUser(item.id)"
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
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            class="text-right"
            :disabled="!listSeleted.length"
            color="purple"
            append-icon="mdi-arrow-right-thin"
            to="/send-notify/confirm"
          >
            Tiếp tục
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, watchEffect, onMounted, watch } from "vue";
import { listAll } from "@/utils/data.js";
import { useStore } from "vuex";

const tab = ref("ALL");
const store = useStore();

const isCheckedAll = ref(false);

const currentTab = ref("");
const filterText = ref("");

// Array chung
const listSeleted = ref([]);

const listParent = ref([]);
const listStudent = ref([]);

const listsAll = ref(listAll);

const filterListAll = (n) => {
  switch (n) {
    case "PARENT":
      return listsAll.value.filter((item) => {
        if (item.type === "PARENT") {
          listParent.value.push(item);
          return item && item.name.includes(filterText.value || "");
        }
      });
    case "STUDENT":
      return listsAll.value.filter((item) => {
        if (item.type === "STUDENT") {
          listStudent.value.push(item);
          return item && item.name.includes(filterText.value || "");
        }
      });
    default:
      return listsAll.value.filter((item) => {
        return item && item.name.includes(filterText.value || "");
      });
  }
};

const getTotal = (n) => {
  return filterListAll(n).length;
};

const handleCurrentTab = (n) => {
  currentTab.value = n;
  // console.log(currentTab.value);
};

const handelSelected = (item) => {
  if (item.checked) {
    // listSeleted.value.push(item);
    store.commit("addSelectUser", item);
  } else {
    // listSeleted.value = listSeleted.value.filter((i) => i !== item);
    store.commit("deleteSelectUser", item.id);
  }
};

const handleArray = (type) => {
  // nối Arr
  const mergeArr = listSeleted.value.concat(filterListAll(type));

  // check không lấy phần tử trùng trong [ ]
  const uniqueArr = mergeArr.reduce((acc, curr) => {
    if (!acc.find((item) => item.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return isCheckedAll.value
    ? uniqueArr
    : listSeleted.value.filter(
        (obj1) => !filterListAll(type).some((obj2) => obj1.id === obj2.id)
      );
};

const selectAll = (n) => {
  switch (n) {
    case "PARENT": {
      const result = handleArray("PARENT");
      store.commit("setSelectUser", result);
      // listSeleted.value = result;
      listParent.value.forEach((item) => (item.checked = isCheckedAll.value));
      break;
    }
    case "STUDENT": {
      const result = handleArray("STUDENT");
      // listSeleted.value = result;
      store.commit("setSelectUser", result);

      listStudent.value.forEach((item) => (item.checked = isCheckedAll.value));
      break;
    }
    case "ALL": {
      const result = handleArray("ALL");
      // listSeleted.value = result;
      store.commit("setSelectUser", result);

      listsAll.value.forEach((item) => (item.checked = isCheckedAll.value));
      break;
    }
    default: {
      listSeleted.value = [];
    }
  }

  // console.log("run");
};

const handleDeleteSelectedUser = (id) => {
  // listSeleted.value = listSeleted.value.filter((item) => {
  //   return item.id !== id;
  // });
  store.commit("deleteSelectUser", id);
  listsAll.value.find((item) => item.id === id).checked = false;
};

watchEffect(() => {
  isCheckedAll.value = filterListAll(currentTab.value).every(
    (item) => item.checked
  );
});

watch(
  // hàm trả về
  () => store.state.selectedArr,

  // hàm gán
  () => {
    listSeleted.value = store.state.selectedArr;
  }
);

onMounted(() => {
  listSeleted.value = store.state.selectedArr;
  isCheckedAll.value = false;
  listParent.value.forEach((item) => (item.checked = false));
  listStudent.value.forEach((item) => (item.checked = false));
  listSeleted.value = [];
});
</script>

<style scoped>
v-btn:hover {
  background-color: red;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background-color: #ab47bc;
}
</style>
