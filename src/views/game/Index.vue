<script >
import Game from "./Game.vue";
import Toolbar from "./Toolbar.vue";

export default {
  components: [Game, Toolbar],
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

<template>
  <div class="game-page">
    <div class="game-view-box">
      <div class="game-view">
        <Game></Game>
      </div>
    </div>
    <div class="game-toolbar-box">
      <div class="game-toolbar">
        <Toolbar></Toolbar>
      </div>
    </div>
  </div>
</template>

<style >
.game-page {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
