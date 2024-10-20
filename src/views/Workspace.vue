<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
// 在 Vue 3 中，你可以使用 defineAsyncComponent 方法来创建一个异步组件
import { defineAsyncComponent } from "vue";
import { reactive } from "vue";

// 使用从 'import()' 返回的 Promise 创建一个异步组件
const AsyncPage1 = defineAsyncComponent(() => import("./views/Page1.vue"));
const AsyncPage2 = defineAsyncComponent(() => import("./views/Page2.vue"));
const data = reactive({
  page: "",
});
let changePage = () => {
  if (data.page == "") {
    data.page = "page1";
    console.log(data.page);
  } else if (data.page == "page1") {
    data.page = "page2";
  } else if (data.page == "page2") {
    data.page = "";
  }
  console.log(data);
  console.log(data.page);
  window.setTimeout(() => {
    changePage();
  }, 2000);
};
window.setTimeout(() => {
  changePage();
}, 2000);
</script>

<template>
  <div class="workspace">
    <div class="workspace-header"></div>
    <div class="workspace-body">
      {{ data }}
      <div class="workspace-body">
        <RouterView></RouterView>
        <AsyncPage1 v-if="data.page == 'page1'"></AsyncPage1>
        <AsyncPage2 v-if="data.page == 'page2'"></AsyncPage2>
      </div>
    </div>
    <div class="workspace-footer"></div>
  </div>
</template>

<style scoped>
</style>
