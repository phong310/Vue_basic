<template>
  <!-- header -->
  <v-expansion-panels variant="inset" class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-title
        class="fs-16 lh-19 fw-700"
        style="color: #1a1a1a"
      >
        Tìm kiếm
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row class="mt-10">
          <v-col cols="3" class="pl-0 pt-0">
            <v-text-field
              v-model="nameSearch"
              variant="outlined"
              class="main-text-field-shadow"
              label="Tên"
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="3" class="pt-0 pl-0 h-2">
            <v-select
              v-model="statusSearch"
              :items="listStatusSearch"
              item-title="text"
              item-value="value"
              variant="outlined"
              :no-data-text="`No data`"
              :label="`Trạng thái`"
              class="main-text-field-shadow"
              density="comfortable"
            ></v-select>
          </v-col>
        </v-row>
        <v-card-actions class="pt-0 mr-3">
          <div class="d-flex"></div>
          <div class="flex-grow-1"></div>
          <div>
            <v-btn variant="outlined" color="success" @click="reset_search"
              >Reset</v-btn
            >
            <v-btn variant="outlined" color="primary" @click="handleSearch"
              >Search</v-btn
            >
          </div>
        </v-card-actions>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <!-- Table -->
  <v-card class="mt-3 pa-8">
    <v-card-title>
      <div class="d-flex">
        <div
          style="color: #1a1a1a; align-self: center"
          class="fs-16 fw-600 lh-19 mr-2"
        >
          Danh sách người dùng<span class="ml-2"
            ><v-chip class="__chip" color="primary">{{
              dataUserFilter.length
            }}</v-chip></span
          >
        </div>
        <div class="flex-grow-1"></div>
        <div>
          <v-btn
            @click="showAddUser"
            prepend-icon="mdi-plus"
            class="text-none"
            color="primary"
          >
            Thêm mới
          </v-btn>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th v-for="(head, i) in headers" :key="i" class="text-left">
              {{ head.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataUserFilter" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td v-if="item.sex === 'male'">Nam</td>
            <td v-else>Nữ</td>
            <td>
              <v-chip class="ma-2" color="success" text-color="white">
                {{ item.position }}
              </v-chip>
            </td>
            <td>
              <v-chip
                v-if="item.status === 'active'"
                class="ma-2"
                color="success"
                text-color="white"
              >
                Kích họat
              </v-chip>
              <v-chip v-else class="ma-2" color="red" text-color="white">
                Chưa kích họat
              </v-chip>
            </td>
            <td>
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="primary"
                    variant="plain"
                    icon="mdi-eye"
                    size="small"
                    @click="showDetail(item)"
                  ></v-btn>
                </template>
                Detail
              </v-tooltip>
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="blue"
                    variant="plain"
                    icon="mdi-pencil"
                    size="small"
                    @click="showUpdate(item)"
                  ></v-btn>
                </template>
                Edit
              </v-tooltip>
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="red"
                    variant="plain"
                    icon="mdi-trash-can"
                    size="small"
                    @click="showDelete(item.id)"
                  ></v-btn>
                </template>
                Delete
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>

  <!-- add -->
  <addUser
    :open="openAddUser"
    @toggle="addNewUser"
    @close="openAddUser = false"
  />

  <!-- delete -->
  <deleteUser
    :open="openDeleteUser"
    :id="idUser"
    @toggle="deleteUsers"
    @close="openDeleteUser = false"
  />

  <!-- udpate -->
  <updateUser
    :open="openUpdateUser"
    :data="dataDetail"
    @toggle="updateUsers"
    @close="openUpdateUser = false"
  />

  <!-- detail -->
  <detailUser
    :open="openDetailUser"
    :data="dataDetail"
    @toggle="openDetailUser = false"
  />
</template>
<script setup>
import { ref } from "vue";
import addUser from "@/components/Users/modal/addUser.vue";
import deleteUser from "@/components/Users/modal/deleteUser.vue";
import detailUser from "@/components/Users/modal/detailUser.vue";
import updateUser from "@/components/Users/modal/updateUser.vue";
import { useToast } from "vue-toastification";
import { dataUser } from "@/utils/data.js";
const toast = useToast();

const headers = ref([
  { id: 1, text: "STT" },
  { id: 2, text: "Họ và Tên" },
  { id: 3, text: "Email" },
  { id: 4, text: "Giới tính" },
  { id: 5, text: "Chức vụ" },
  { id: 6, text: "Trạng thái" },
  { id: 7, text: "Chức năng" },
]);

const dataUSer = ref(dataUser);

const dataUserFilter = ref(dataUSer.value);

const nameSearch = ref("");

const statusSearch = ref("");
const listStatusSearch = ref([
  { value: "", text: "Tất cả" },
  { value: "active", text: "Kích hoạt" },
  { value: "inactive", text: "Chưa kích hoạt" },
]);
const listStatus = ref([
  { value: "active", text: "Kích hoạt" },
  { value: "inactive", text: "Chưa kích hoạt" },
]);

const idUser = ref();
const dataDetail = ref();

const openAddUser = ref(false);
const openDeleteUser = ref(false);
const openDetailUser = ref(false);
const openUpdateUser = ref(false);

const showAddUser = () => {
  openAddUser.value = true;
};

const showDelete = (id) => {
  openDeleteUser.value = true;
  idUser.value = id;
};

const showUpdate = (data) => {
  openUpdateUser.value = true;
  dataDetail.value = data;
};

const showDetail = (data) => {
  openDetailUser.value = true;
  dataDetail.value = data;
  // console.log(data);
};

const addNewUser = (newUser) => {
  dataUserFilter.value.unshift(newUser);
  toast.success("Thêm mới người dùng thành công !");
  openAddUser.value = false;
};

const deleteUsers = () => {
  dataUserFilter.value = dataUSer.value.filter(
    (item) => item.id !== idUser.value
  );
  toast.success("Xóa người dùng thành công !");
  openDeleteUser.value = false;
};

const updateUsers = (updateData) => {
  dataUSer.value.forEach((item) => {
    if (item.id === updateData.id) {
      item.id = updateData.id;
      item.name = updateData.name;
      item.email = updateData.email;
      item.sex = updateData.sex;
      item.position = updateData.position;
      item.status = updateData.status;
    }
  });
  toast.success("Sửa người dùng thành công !");
  openUpdateUser.value = false;
};

const reset_search = () => {
  dataUserFilter.value = dataUSer.value;
  statusSearch.value = "";
  nameSearch.value = "";
};

const handleSearch = () => {
  dataUserFilter.value = dataUSer.value.filter((item) => {
    return (
      item.name.includes(nameSearch.value || "") &&
      (!statusSearch.value || item.status === statusSearch.value)
    );
  });
};
</script>

<style>
.v-text-field .v-field {
  cursor: text;
  height: 48px;
}
</style>
