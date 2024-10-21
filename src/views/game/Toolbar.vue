<script >
export default {
  setup() {
    return {};
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

<template>
  <div class="toolbar-box">tt</div>
</template>

<style >
.toolbar-box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
