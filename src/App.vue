<template>
  <div class="app-box">
    <RouterView></RouterView>
  </div>
</template>
<script >
import { RouterView } from "vue-router";
export default {
  components: [RouterView],
  // 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
  setup() {
    console.log(
      "setup 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method"
    );
    return {};
  },
  data() {
    console.log("data setup 调用 data 和 method");
    return {};
  },

  // 组件挂载到节点上之前执行的函数
  beforeMount() {
    console.log("beforeMount 组件挂载到节点上之前执行的函数");
  },

  // 组件挂载完成后执行的函数
  mounted() {
    console.log("mounted 组件挂载完成后执行的函数");
  },

  // 组件更新之前执行的函数
  beforeUpdate() {
    console.log("beforeUpdate 组件更新之前执行的函数");
  },

  // 组件更新完成之后执行的函数
  updated() {
    console.log("updated 组件更新完成之后执行的函数");
  },

  // 组件卸载之前执行的函数
  beforeUnmount() {
    console.log("beforeUnmount 组件卸载之前执行的函数");
  },

  // 组件卸载完成后执行的函数
  unmounted() {
    console.log("unmounted 组件卸载完成后执行的函数");
  },

  // 被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行
  activated() {
    console.log(
      "activated 被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行"
    );
  },

  // 比如从 A 组件，切换到 B 组件，A 组件消失时执行
  deactivated() {
    console.log("deactivated 比如从 A 组件，切换到 B 组件，A 组件消失时执行");
  },

  // 当捕获一个来自子孙组件的异常时激活钩子函数
  errorCaptured() {
    console.log("errorCaptured 当捕获一个来自子孙组件的异常时激活钩子函数");
  },
};
</script>

<style >
</style>
