<template>
  <div class="designer">
    <Head
      :designer="designer"
      :style="{
        height: `${designer.head.height}px`,
      }"
    >
    </Head>
    <Toolbar
      :designer="designer"
      :style="{
        height: `${designer.toolbar.height}px`,
      }"
    >
    </Toolbar>
    <Body
      :designer="designer"
      :style="{
        height: `calc(100% - ${
          designer.head.height + designer.toolbar.height + designer.foot.height
        }px`,
      }"
    >
    </Body>
    <Foot
      :designer="designer"
      :style="{
        height: `${designer.foot.height}px`,
      }"
    >
    </Foot>
  </div>
</template>
<script >
import Head from "./Head.vue";
import Toolbar from "./Toolbar.vue";
import Body from "./Body.vue";
import Foot from "./Foot.vue";
import { Designer } from "./designer";

export default {
  props: ["options"],
  components: { Head, Toolbar, Body, Foot },
  data() {
    let designer = new Designer(this.options);
    console.log(designer);
    let data = {
      designer,
      ready: false,
      disabled: false,
    };
    return data;
  },

  methods: {
    init() {
      this.ready = true;
    },
    disable() {},
    resize() {
      this.initBody();
    },
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
.designer {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
