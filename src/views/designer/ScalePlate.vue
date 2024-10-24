<template>
  <div class="scale-plate"></div>
</template>
<script >
export default {
  props: ["designer", "scroll", "scale", "bodyWidth", "bodyHeight"],
  components: [],
  data() {
    return {};
  },
  watch: {},
  methods: {
    init() {},
    initPlace() {
      if (this.canvasX == null || this.canvasY == null) {
        return;
      }
      const { offsetLeft, offsetTop, clientWidth, offsetHeight } =
        this.viewport;

      let largeSize = this.designer.scale.largeSize;
      this.canvasX.style.top =
        this.scroll.top - (largeSize * (1 - this.scale)) / 2 + "px";
      this.canvasX.style.left = offsetLeft + "px";

      this.canvasY.style.left =
        this.scroll.left - (largeSize * (1 - this.scale)) / 2 + "px";
      this.canvasY.style.top = offsetTop + "px";
    },
    initView(viewportContainer, viewport) {
      if (this.canvasX != null) {
        this.viewportContainer.removeChild(this.canvasX);
      }
      if (this.canvasY != null) {
        this.viewportContainer.removeChild(this.canvasY);
      }
      this.viewportContainer = viewportContainer;
      this.viewport = viewport;
      let small = this.designer.scale.small;
      let smallSize = this.designer.scale.smallSize;
      let medium = this.designer.scale.medium;
      let mediumSize = this.designer.scale.mediumSize;
      let large = this.designer.scale.large;
      let largeSize = this.designer.scale.largeSize;
      let canvasX = document.createElement("canvas");
      this.canvasX = canvasX;
      canvasX.width = this.designer.viewport.width;
      canvasX.height = largeSize;
      canvasX.style.transform = "scale(" + this.scale + ")";
      this.viewportContainer.appendChild(canvasX);

      let canvasY = document.createElement("canvas");
      this.canvasY = canvasY;
      canvasY.width = largeSize;
      canvasY.height = this.designer.viewport.height;
      canvasY.style.transform = "scale(" + this.scale + ")";
      this.viewportContainer.appendChild(canvasY);

      const ctxX = canvasX.getContext("2d");
      let xCount = canvasX.width / small;
      ctxX.lineWidth = 1;
      let xStart = 0.5;
      for (var i = 0; i < xCount; i++) {
        let x = xStart + small * i;
        ctxX.moveTo(x, 0);
        if (i % large == 0) {
          ctxX.lineTo(x, largeSize);
        } else if (i % medium == 0) {
          ctxX.lineTo(x, mediumSize);
        } else {
          ctxX.lineTo(x, smallSize);
        }
      }
      ctxX.stroke();

      const ctxY = canvasY.getContext("2d");
      let yCount = canvasY.height / small;
      ctxY.lineWidth = 1;
      let yStart = 0.5;
      for (var i = 0; i < yCount; i++) {
        let y = yStart + small * i;
        ctxY.moveTo(0, y);
        if (i % large == 0) {
          ctxY.lineTo(largeSize, y);
        } else if (i % medium == 0) {
          ctxY.lineTo(mediumSize, y);
        } else {
          ctxY.lineTo(smallSize, y);
        }
      }
      ctxY.stroke();
      this.initPlace();
    },
    resize() {},
  },
  mounted() {
    this.init();
  },
};
</script>

<style >
.viewport-container > canvas {
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
