<template>
  <div
    class="designer"
    :class="{
      'designer-mouse-do-ing': designer.mouse_do_ing,
    }"
  >
    <Head
      ref="Head"
      :designer="designer"
      :style="{
        height: `${designer.head.height}px`,
      }"
    >
    </Head>
    <Toolbar
      ref="Toolbar"
      :designer="designer"
      :style="{
        height: `${designer.toolbar.height}px`,
      }"
    >
    </Toolbar>
    <Body
      ref="Body"
      :designer="designer"
      :style="{
        height: `calc(100% - ${
          designer.head.height + designer.toolbar.height + designer.foot.height
        }px`,
      }"
    >
    </Body>
    <Foot
      ref="Foot"
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
    };
    return data;
  },

  methods: {
    init() {
      this.ready = true;
      this.designer.resize = this.resize;
      this.designer.bindMouseEvent = this.bindMouseEvent;
      this.designer.unbindMouseEvent = this.unbindMouseEvent;
    },
    disable() {},
    resize() {
      this.$refs.Body.resize();
    },
    mouseup(event) {
      this.designer.mouseup(event);
    },
    mousemove(event) {
      this.designer.mousemove(event);
    },
    bindMouseEvent() {
      window.addEventListener("mouseup", this.mouseup);
      window.addEventListener("mousemove", this.mousemove);
    },
    unbindMouseEvent() {
      window.removeEventListener("mouseup", this.mouseup);
      window.removeEventListener("mousemove", this.mousemove);
    },
    bingEvent() {
      window.addEventListener("resize", this.resize);
    },
    unbingEvent() {
      window.removeEventListener("resize", this.resize);
      this.unbindMouseEvent();
    },
  },
  mounted() {
    this.init();
    this.bingEvent();
  },
  updated() {},
  beforeUnmount() {
    this.unbingEvent();
    this.designer.disable();
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
.designer.designer-mouse-do-ing {
  user-select: none;
}
</style>
