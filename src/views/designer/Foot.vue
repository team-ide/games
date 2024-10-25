
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
    <div class="center">
      <el-input v-model="designer.viewport.width" class="wd-50"> </el-input>
      <span class="mdi mdi-close pdlr-5"></span>
      <el-input v-model="designer.viewport.height" class="wd-50"> </el-input>
      <span class="mgl-10">{{ designer.minScale }}%</span>
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
            left: `${scaleBar.left}px`,
          }"
          @mousedown="scaleBarStart($event)"
        ></div>
      </div>
      <span class="mgr-10">{{ designer.maxScale }}%</span>
      <span style="display: inline-block; width: 40px; text-align: center">
        {{ this.designer.viewport.scale }}%
      </span>
    </div>
    <div
      class="right"
      :style="{
        width: `${designer.foot.right.width}px`,
      }"
    >
      <span class="mgr-10">x : {{ designer.clientX }}</span>
      <span class="mgr-10">y : {{ designer.clientY }}</span>
    </div>
  </div>
</template>

<script >
export default {
  props: ["designer"],
  components: {},
  data() {
    return {
      scaleNumber: 0,
      scaleNumber1: 0,
      scaleBar: {
        left: 50,
        width: 100,
      },
    };
  },
  watch: {
    "designer.viewport.scale"() {
      if (this.isScaleBar) {
        delete this.isScaleBar;
        return;
      }
      this.scaleBar.left =
        this.scaleNumber1 *
        (this.designer.viewport.scale - this.designer.minScale);
    },
  },
  methods: {
    init() {
      this.scaleNumber = this.designer.maxScale - this.designer.minScale;
      this.scaleNumber1 = this.scaleBar.width / this.scaleNumber;
      this.scaleBar.left =
        this.scaleNumber1 *
        (this.designer.viewport.scale - this.designer.minScale);
      this.scaleNumber2 = (this.scaleNumber / this.scaleBar.width).toFixed(0);
    },
    scaleBarStart(event) {
      const { clientX, clientY } = event;
      // 鼠标按下时的位置
      this.designer.mouseDownX = clientX;
      this.designer.mouseDownY = clientY;
      this.designer.mouse_do_ing = true;
      this.designer.onMouseMove = (moveX, moveY) => {
        let oldLeft = Number(this.scaleBar.left);
        let left = oldLeft + Number(moveX);
        if (left > this.scaleBar.width) {
          left = this.scaleBar.width;
        }
        if (left < 0) {
          left = 0;
        }
        this.scaleBar.left = left;
        let oldScale = Number(this.designer.viewport.scale);
        let scale =
          Number(oldScale) + Number((left - oldLeft) * this.scaleNumber2);
        if (scale < this.designer.minScale) {
          scale = this.designer.minScale;
        }
        if (scale > this.designer.maxScale) {
          scale = this.designer.maxScale;
        }
        if (oldScale != scale) {
          this.isScaleBar = true;
          this.designer.viewport.scale = scale;
        }
      };
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
  display: flex;
}

.designer-foot > .left {
  position: relative;
  height: 100%;
  display: flex;
  flex: none;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
}

.designer-foot > .center {
  position: relative;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 10px;
  box-sizing: border-box;
}

.designer-foot > .right {
  position: relative;
  height: 100%;
  display: flex;
  flex: none;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
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
  cursor: pointer;
}
.designer-foot .el-input__wrapper {
  padding: 0px;
  outline: none;
  box-sizing: border-box;
}
.designer-foot input {
  padding: 0px;
  outline: none;
  text-align: center;
}
.designer-foot {
  --el-component-size-small: 20px;
}
</style>
