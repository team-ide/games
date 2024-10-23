<template>
  <div class="designer-body" ref="body">
    <div
      class="left"
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
      :style="{
        left: `${designer.body.left.width}px`,
      }"
    ></div>
    <div
      class="center"
      ref="center"
      :style="{
        left: `${designer.body.left.width + 6}px`,
        right: `${designer.body.right.width + 6}px`,
      }"
    >
      <div
        class="viewport-container"
        ref="viewportContainer"
        @mousedown="containerScrollStart($event)"
        :style="{
          width: `${bodyWidth + designer.viewport.width * scale}px`,
          height: `${bodyHeight + designer.viewport.height * scale}px`,
        }"
      >
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
      :style="{
        right: `${designer.body.right.width}px`,
      }"
    ></div>
    <div
      class="right"
      :style="{
        width: `${designer.body.right.width}px`,
      }"
    >
      right
    </div>
  </div>
</template>
<script >
import Viewport from "./Viewport.vue";

export default {
  props: ["designer"],
  components: { Viewport },
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
    };
    return data;
  },
  watch: {
    "designer.viewport.scale"() {
      this.scale = Number(this.designer.viewport.scale / 100).toFixed(2);
    },
  },
  methods: {
    init() {
      this.scale = Number(this.designer.viewport.scale / 100).toFixed(2);
      this.$nextTick(() => {
        this.initBody();
      });
    },
    initBody() {
      this.bodyWidth = this.$refs.body.clientWidth;
      this.bodyHeight = this.$refs.body.clientHeight;
      this.$nextTick(() => {
        this.viewportToCenter();
      });
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
    },
    containerScrollStart(event) {
      // 鼠标按下时的位置
      this.designer.mouseDownX = event.clientX;
      this.designer.mouseDownY = event.clientY;
      this.designer.mouse_do_ing = true;

      this.designer.onMouseMove = (moveX, moveY) => {
        let dom = this.$refs.center;
        const { scrollLeft, scrollTop } = dom;
        dom.scrollTo({
          left: scrollLeft - moveX,
          top: scrollTop - moveY,
        });
      };
      this.designer.bindMouseEvent();
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
        // this.initBody();
        this.$nextTick(() => {
          delete this.wheel_ing;
        });
      });
    },
    changeRightWidthStart() {},
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
}
.designer-body > .left {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  min-width: 60px;
  overflow: hidden;
  overflow-y: auto;
  /* border-right: 1px solid #e5e5e5; */
  box-sizing: border-box;
  background: #f6f7f8;
  z-index: 1;
}
.designer-body > .right {
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  min-width: 60px;
  overflow: hidden;
  overflow-y: auto;
  /* border-left: 1px solid #e5e5e5; */
  box-sizing: border-box;
  background: #f6f7f8;
  z-index: 1;
}

.designer-body > .center {
  position: absolute;
  top: 0px;
  bottom: 0px;
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
}

.change-width-bar {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 6px;
  box-sizing: border-box;
  cursor: w-resize;
  background-color: #f6f7f8;
}

.change-width-bar:after {
  content: "";
  width: 4px;
  height: 100%;
  box-sizing: border-box;
  display: block;
  margin: 0px auto;
  transition: background-color 0.5s ease;
}

.change-width-bar:hover:after {
  background-color: #c6c6c6;
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
