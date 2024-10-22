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
      class="center"
      ref="center"
      :style="{
        left: `${designer.body.left.width}px`,
        right: `${designer.body.right.width}px`,
      }"
    >
      <div
        class="viewport-container"
        ref="viewportContainer"
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
      minScale: 10,
      maxScale: 600,
      scale: 1,
      viewport: {
        width: 1024,
        height: 768,
      },
    };
    return data;
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
      // this.set({
      //   bodyWidth: this.$refs.body.clientWidth,
      //   bodyHeight: this.$refs.body.clientHeight,
      // });
      this.$nextTick(() => {
        this.viewportToCenter();
      });
    },
    viewportToCenter() {
      this.setScrollToCenter(this.$refs.center, this.$refs.viewportContainer);
    },
    /**
     *点击元素自动滚动到水平或垂直中间位置
     * @param {HTMLElement} scrollDom - 滚动的元素
     * @param {HTMLElement} targetDom - 点击的元素
     * @param {string} [type='x'] - x表示水平，y表示垂直,默认为水平
     */
    setScrollToCenter(scrollDom, targetDom, type) {
      if (!scrollDom || !targetDom) return false;
      //如果是浏览器body的滚动条
      if ([window, document, document.documentElement].includes(scrollDom)) {
        scrollDom = document.documentElement;
      }
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
      if (scale < this.minScale) {
        scale = this.minScale;
      }
      if (scale > this.maxScale) {
        scale = this.maxScale;
      }
      if (oldScale != scale) {
        this.designer.viewport.scale = scale;
        this.scale = Number(this.designer.viewport.scale / 100).toFixed(2);
      }
      this.$nextTick(() => {
        this.initBody();
        this.$nextTick(() => {
          delete this.wheel_ing;
        });
      });
    },
    bingEvent() {
      window.addEventListener("resize", this.resize);
      this.$refs.viewportContainer.addEventListener("wheel", this.wheel);
    },
    unbingEvent() {
      window.removeEventListener("resize", this.resize);
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
  border-right: 1px solid #e5e5e5;
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
  border-left: 1px solid #e5e5e5;
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
