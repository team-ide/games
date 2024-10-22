
<template>
  <div class="designer-foot">
    <div
      class="left"
      :style="{
        width: `${designer.foot.left.width}px`,
      }"
    >
      left
    </div>
    <div
      class="center"
      :style="{
        left: `${designer.foot.left.width}px`,
        right: `${designer.foot.right.width}px`,
      }"
    >
      center
    </div>
    <div
      class="right"
      :style="{
        width: `${designer.foot.right.width}px`,
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
    return {
      disabled: false,
    };
  },

  methods: {
    init() {},
    disable() {},
    resize() {},
    bingEvent() {
      window.addEventListener("resize", this.resize);
    },
    unbingEvent() {
      window.removeEventListener("resize", this.resize);
    },
  },
  mounted() {
    this.init();
    this.bingEvent();
  },
  updated() {},
  beforeUnmount() {
    this.disabled = true;
    this.unbingEvent();
    this.disable();
  },
};
</script>

<style >
.designer-foot {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 12px;
  min-width: 650px;
  border-bottom: 1px solid #dfe2e5;
  box-sizing: border-box;
}

.designer-foot > .left {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.designer-foot > .center {
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.designer-foot > .right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
