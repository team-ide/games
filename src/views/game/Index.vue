<template>
  <div class="game-page">
    <Designer></Designer>
  </div>
</template>

<script >
import Designer from "../designer/Index.vue";
export default {
  components: { Designer },
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
.game-page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
