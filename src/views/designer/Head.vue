
<template>
  <div class="designer-head">
    <div
      class="left"
      :style="{
        width: `${designer.head.left.width}px`,
      }"
    >
      left
    </div>
    <div class="center">center</div>
    <div
      class="right"
      :style="{
        width: `${designer.head.right.width}px`,
      }"
    >
      right
    </div>
  </div>
</template>

<script >
export default {
  props: ["designer"],
  components: [],
  setup() {
    return {};
  },

  methods: {
    init() {},
  },
  mounted() {
    this.init();
  },
};
</script>

<style >
.designer-head {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 12px;
  min-width: 650px;
  border-bottom: 1px solid #dfe2e5;
  box-sizing: border-box;
  display: flex;
}

.designer-head > .left {
  position: relative;
  height: 100%;
  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
}

.designer-head > .center {
  position: relative;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  box-sizing: border-box;
}

.designer-head > .right {
  position: relative;
  height: 100%;
  display: flex;
  flex: none;
  align-items: center;
  box-sizing: border-box;
}
</style>
