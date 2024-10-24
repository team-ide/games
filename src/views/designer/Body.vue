<template>
  <div class="designer-body" ref="body">
    <div
      class="left"
      :class="{
        close: designer.body.left.close,
      }"
      :style="{
        width: `${designer.body.left.width}px`,
      }"
    >
      left
    </div>
    <div
      class="change-width-bar"
      @mousedown="
        designer.changeSizeStart($event, {
          obj: designer.body.left,
          width: true,
          minWidth: 60,
        })
      "
    >
      <div
        v-if="!designer.body.left.close"
        class="mdi mdi-menu-left"
        @mousedown.stop="designer.preventDefault"
        @click="designer.close(designer.body.left, $event)"
      ></div>
      <div
        v-if="designer.body.left.close"
        class="mdi mdi-menu-right"
        @mousedown.stop="designer.preventDefault"
        @click="designer.open(designer.body.left, $event)"
      ></div>
    </div>
    <div class="center" ref="center" @scroll="viewportScroll">
      <div
        class="viewport-container"
        ref="viewportContainer"
        @mousedown="containerScrollStart($event)"
        :style="{
          width: `${bodyWidth + designer.viewport.width * scale}px`,
          height: `${bodyHeight + designer.viewport.height * scale}px`,
        }"
      >
        <ScalePlate
          ref="scalePlate"
          :designer="designer"
          :scroll="scroll"
          :scale="scale"
          :bodyWidth="bodyWidth"
          :bodyHeight="bodyHeight"
        >
        </ScalePlate>
        <Viewport
          ref="viewport"
          :designer="designer"
          :style="{
            width: `${designer.viewport.width}px`,
            height: `${designer.viewport.height}px`,
            transform: `scale(${scale})`,
          }"
        >
        </Viewport>
      </div>
    </div>
    <div
      class="change-width-bar"
      @mousedown="
        designer.changeSizeStart($event, {
          obj: designer.body.right,
          width: true,
          minWidth: 60,
          widthReverse: true,
        })
      "
    >
      <div
        v-if="!designer.body.right.close"
        class="mdi mdi-menu-right"
        @mousedown.stop="designer.preventDefault"
        @click="designer.close(designer.body.right, $event)"
      ></div>
      <div
        v-if="designer.body.right.close"
        class="mdi mdi-menu-left"
        @mousedown.stop="designer.preventDefault"
        @click="designer.open(designer.body.right, $event)"
      ></div>
    </div>
    <div
      class="right"
      :class="{
        close: designer.body.right.close,
      }"
      :style="{
        width: `${designer.body.right.width}px`,
      }"
    >
      right
    </div>
  </div>
</template>
<script >
import ScalePlate from "./ScalePlate.vue";
import Viewport from "./Viewport.vue";

export default {
  props: ["designer"],
  components: { ScalePlate, Viewport },
  data() {
    let data = {
      disabled: false,
      bodyWidth: 0,
      bodyHeight: 0,
      scale: 1,
      viewport: {
        width: 1024,
        height: 768,
      },
      scroll: {
        left: 0,
        top: 0,
      },
    };
    return data;
  },
  watch: {
    "designer.viewport.scale"() {
      this.scale = Number((this.designer.viewport.scale / 100).toFixed(2));
    },
  },
  methods: {
    init() {
      this.scale = Number((this.designer.viewport.scale / 100).toFixed(2));
      this.$nextTick(() => {
        this.bodyWidth = this.$refs.body.clientWidth;
        this.bodyHeight = this.$refs.body.clientHeight;
        this.$nextTick(() => {
          this.viewportToCenter();
          this.$nextTick(() => {
            this.initScalePlate();
          });
        });
      });
    },
    initScalePlate() {
      this.$nextTick(() => {
        const { scrollLeft, scrollTop } = this.$refs.center;
        this.scroll.left = scrollLeft;
        this.scroll.top = scrollTop;
        this.$refs.scalePlate.initView(
          this.$refs.viewportContainer,
          this.$refs.viewport.$el
        );
      });
    },
    initBody() {
      this.$nextTick(() => {
        const { scrollLeft, scrollTop } = this.$refs.center;
        this.scroll.left = scrollLeft;
        this.scroll.top = scrollTop;
        this.$refs.scalePlate.initPlace();
      });
    },
    viewportScroll() {
      const { scrollLeft, scrollTop } = this.$refs.center;
      this.scroll.left = scrollLeft;
      this.scroll.top = scrollTop;
      this.$refs.scalePlate.initPlace();
    },
    viewportToCenter() {
      this.setScrollToCenter(this.$refs.center, this.$refs.viewportContainer);
    },
    setScrollToCenter(scrollDom, targetDom, type) {
      if (!scrollDom || !targetDom) return false;
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = targetDom;
      const { clientWidth, clientHeight } = scrollDom;

      const left = offsetLeft - clientWidth / 2 + offsetWidth / 2;
      const top = offsetTop - clientHeight / 2 + offsetHeight / 2;
      const config = {
        // 平滑 滚动
        // behavior: "smooth",
      };
      if (type === "x") {
        config.left = left;
      } else if (type === "y") {
        config.top = top;
      } else {
        config.left = left;
        config.top = top;
      }
      scrollDom.scrollTo(config);
      return config;
    },
    containerScrollStart(event) {
      const { clientX, clientY } = event;
      // 鼠标按下时的位置
      this.designer.mouseDownX = clientX;
      this.designer.mouseDownY = clientY;
      this.designer.mouse_do_ing = true;

      this.designer.onMouseMove = (moveX, moveY) => {
        let dom = this.$refs.center;
        const { scrollLeft, scrollTop } = dom;
        let config = {
          left: scrollLeft - moveX,
          top: scrollTop - moveY,
        };
        dom.scrollTo(config);
      };
    },
    disable() {},
    resize() {
      this.initBody();
    },
    wheel(event) {
      if (!this.designer.viewport.wheelScale) {
        return;
      }
      event.preventDefault(); // 阻止默认的滚轮行为
      if (this.wheel_ing) {
        return;
      }
      this.wheel_ing = true;
      const delta = event.deltaY > 0 ? -10 : 10; // 根据滚动方向调整缩放比例
      let oldScale = Number(this.designer.viewport.scale);
      let scale = oldScale + delta;
      if (scale < this.designer.minScale) {
        scale = this.designer.minScale;
      }
      if (scale > this.designer.maxScale) {
        scale = this.designer.maxScale;
      }
      if (oldScale != scale) {
        this.designer.viewport.scale = scale;
      }
      this.$nextTick(() => {
        this.initScalePlate();
        this.$nextTick(() => {
          delete this.wheel_ing;
        });
      });
    },
    bingEvent() {
      this.$refs.viewportContainer.addEventListener("wheel", this.wheel);
    },
    unbingEvent() {
      this.$refs.viewportContainer.removeEventListener("wheel", this.wheel);
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
.designer-body {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.designer-body > .left {
  position: relative;
  height: 100%;
  min-width: 60px;
  overflow: hidden;
  overflow-y: auto;
  /* border-right: 1px solid #e5e5e5; */
  box-sizing: border-box;
  background: #f6f7f8;
  z-index: 1;
  flex: none;
}
.designer-body > .left.close {
  width: 0px !important;
  min-width: 0px !important;
}
.designer-body > .right {
  position: relative;
  height: 100%;
  min-width: 60px;
  overflow: hidden;
  overflow-y: auto;
  /* border-left: 1px solid #e5e5e5; */
  box-sizing: border-box;
  background: #f6f7f8;
  z-index: 1;
  flex: none;
}
.designer-body > .right.close {
  width: 0px !important;
  min-width: 0px !important;
}

.designer-body > .center {
  position: relative;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.designer-body .viewport-container {
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaecee;
  box-sizing: border-box;
  position: relative;
}

.change-width-bar {
  position: relative;
  height: 100%;
  width: 6px;
  box-sizing: border-box;
  cursor: w-resize;
  background-color: #f6f7f8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.change-width-bar:before {
  content: "";
  width: 4px;
  height: 100%;
  box-sizing: border-box;
  display: block;
  transition: background-color 0.5s ease;
  position: absolute;
  left: 1px;
  top: 0px;
}

.change-width-bar:hover:before {
  background-color: #c6c6c6;
}

.change-width-bar .mdi {
  position: relative;
  font-size: 25px;
  color: #8d8d8d;
  cursor: pointer;
  width: 25px;
  height: 25px;
  line-height: 25px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border: 2px solid #fff;
  border-radius: 6px;
  background-color: #c6c6c6;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
