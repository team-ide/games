
<template>
  <div class="designer-foot">
    <div
      class="left"
      :style="{
        width: `${designer.foot.left.width}px`,
      }"
    >
      left
    </div>
    <div
      class="center"
      :style="{
        left: `${designer.foot.left.width}px`,
        right: `${designer.foot.right.width}px`,
      }"
    >
      <span>{{ designer.minScale }}%</span>
      <div
        class="scale-bar"
        ref="scaleBar"
        :style="{
          width: `${scaleBar.width}px`,
        }"
      >
        <div
          class="scale-bar-slider"
          :style="{
            left: `${
              scaleNumber1 * (this.designer.viewport.scale - designer.minScale)
            }px`,
          }"
          @mousedown="scaleBarStart($event)"
        ></div>
      </div>
      <span>{{ designer.maxScale }}%</span>
      <span>{{ this.designer.viewport.scale }}%</span>
    </div>
    <div
      class="right"
      :style="{
        width: `${designer.foot.right.width}px`,
      }"
    >
      right
    </div>
  </div>
</template>

<script >
export default {
  props: ["designer"],
  components: [],
  data() {
    return {
      scaleNumber: 0,
      scaleNumber1: 0,
      scaleBar: {
        width: 100,
      },
    };
  },

  methods: {
    init() {
      this.scaleNumber = this.designer.maxScale - this.designer.minScale;
      this.scaleNumber1 = this.scaleBar.width / this.scaleNumber;
    },
    scaleBarStart(event) {
      // 鼠标按下时的位置
      this.designer.mouseDownX = event.clientX;
      this.designer.mouseDownY = event.clientY;
      this.designer.mouse_do_ing = true;
      this.designer.onMouseMove = (moveX, moveY) => {
        let oldScale = Number(this.designer.viewport.scale);
        let scale = Number(oldScale) + Number(moveX / this.scaleNumber1);
        if (scale < this.designer.minScale) {
          scale = this.designer.minScale;
        }
        if (scale > this.designer.maxScale) {
          scale = this.designer.maxScale;
        }
        if (oldScale != scale) {
          this.designer.viewport.scale = scale;
        }
      };
      this.designer.bindMouseEvent();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style >
.designer-foot {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 12px;
  min-width: 650px;
  border-bottom: 1px solid #dfe2e5;
  box-sizing: border-box;
}

.designer-foot > .left {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.designer-foot > .center {
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}

.designer-foot > .right {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.scale-bar {
  position: relative;
  height: 6px;
  background: linear-gradient(to right, rgb(108, 58, 146), rgb(255, 0, 0));
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  width: 100px;
  border-radius: 10px;
  margin: 0px 10px;
}
.scale-bar-slider {
  position: absolute;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  background-color: #fff;
  margin-top: -2px;
  margin-left: -5px;
  border-radius: 10px;
}
</style>
