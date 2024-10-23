
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
    <div
      class="center"
      :style="{
        left: `${designer.head.left.width}px`,
        right: `${designer.head.right.width}px`,
      }"
    >
      center
    </div>
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
}

.designer-head > .left {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.designer-head > .center {
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.designer-head > .right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
