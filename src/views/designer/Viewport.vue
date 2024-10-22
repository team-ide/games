<template>
  <div class="viewport">显示</div>
</template>
<script >
export default {
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
.viewport {
  width: 100%;
  height: 100%;
  position: relative;
  background: #ddd;
}
</style>
