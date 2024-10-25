<template>
  <div class="game-page" v-if="ready">
    <Designer :options="options">
      <template v-slot:viewport>
        <canvas
          ref="canvas"
          :id="id"
          :width="options.viewport.width"
          :height="options.viewport.height"
        >
        </canvas>
      </template>
    </Designer>
  </div>
</template>

<script >
import server from "server";
import game from "c/game";

import Designer from "../designer/Index.vue";
export default {
  components: { Designer },
  data() {
    return {
      id: "my-game-canvas",
      ready: false,
      disabled: false,
      options: null,
    };
  },

  methods: {
    async init() {
      let configRes = await server.game.config();
      let config = configRes.data || {};
      this.options = {
        viewport: {
          width: config.width,
          height: config.height,
          scale: 80,
        },
      };
      this.ready = true;
      this.$nextTick(() => {
        game.start({
          config,
          id: this.id,
          canvas: this.$refs.canvas,
        });
      });
    },
    disable() {},
    resize() {},
  },
  mounted() {
    this.init();
  },
  updated() {},
  beforeUnmount() {
    this.disabled = true;
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
.game-page #fps {
  box-sizing: border-box;
  left: 50% !important;
  margin-left: -18px !important;
  text-align: center !important;
  display: flex !important;
  width: 120px !important;
  height: 25px !important;
  top: -30px !important;
}
.game-page #Cocos2dGameContainer {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
</style>
