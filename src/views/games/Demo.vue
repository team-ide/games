<script >
// const assets = import.meta.glob("@/assets/*");
// console.log(assets);
export default {
  // 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
  setup() {
    return {
      disabled: false,
    };
  },

  methods: {
    init() {
      var 子弹组 = "/src/assets/子弹组.png";
      cc.game.onLoad = () => {};
      cc.game.onStart = () => {
        // 监听浏览器窗口大小变化事件
        // cc.view.resizeWithBrowserSize(true);
        cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);

        this.resize();

        // cc.view.adjustViewPort(true);

        // 监听浏览器窗口大小变化事件
        cc.view.setResizeCallback(() => {
          this.resize();
        });
        //load resources
        cc.LoaderScene.preload([子弹组], () => {
          var MyScene = cc.Scene.extend({
            onEnter: () => {
              this.scene._super();
              var size = cc.director.getWinSize();
              var sprite = cc.Sprite.create(子弹组, cc.rect(3, 102, 80, 140));
              sprite.setPosition(size.width / 2, size.height / 2);
              sprite.setScale(0.1);
              this.scene.addChild(sprite, 0);

              // 缩放 参数：duration 耗时；x 倍数；y 倍数
              var action1 = cc.scaleBy(1, 2, 2);
              // 移动 参数：duration 耗时；position 坐标
              var action2 = cc.moveTo(1, { x: 100, y: 200 });
              //旋转 参数：duration 耗时；相对于节点初始角度(0,0)的旋转
              var action3 = cc.rotateTo(1, 30, 30);

              // 并行
              var actionSpawn = cc.spawn(action1, action2, action3);
              // 串行
              var actionSequence = cc.sequence(action1, action2, action3);

              var repeat = cc.repeat(actionSpawn, 3);
              sprite.runAction(repeat);

              // sprite.runAction(actionSpawn);

              var label = cc.LabelTTF.create("Game Demo", "Arial", 40);
              label.setPosition(size.width / 2, size.height / 2);
              this.scene.addChild(label, 1);
            },
          });
          this.scene = new MyScene();
          // this.scene.setRotation(90);
          cc.director.runScene(this.scene);
        });
      };
      let width = this.$refs.box.clientWidth;
      let height = this.$refs.box.clientHeight;
      if (width < height) {
        // width = this.$refs.box.clientWidth;
        // height = this.$refs.box.clientHeight;
        // this.$refs.box.style.width = width + "px";
        // this.$refs.box.style.height = height + "px";
        // this.$refs.box.style.transform = " rotate(90deg)";
      }
      cc.game.config = {
        project_type: "javascript",
        debugMode: 1,
        showFPS: true,
        frameRate: 60,
        id: "gameCanvas",
        renderMode: 0,
        engineDir: "frameworks/cocos2d-html5",
        modules: ["cocos2d"],
        width: width,
        height: height,
        // jsList: ["src/resource.js", "src/app.js"],
      };
      let canvas = document.createElement("canvas");
      canvas.id = "game-demo";
      canvas.width = width;
      canvas.height = height;
      // canvas.fitHeight = true;
      // canvas.fitWidth = true;
      this.$refs.box.appendChild(canvas);
      cc.game.run("game-demo");
    },
    loadResources() {},
    changeSceneSize(width, height) {
      var win_size = cc.director.getWinSize();
      if (win_size.width === width && win_size.height === height) {
        return;
      }
      cc.view.adjustViewPort(true);
      cc.view.setDesignResolutionSize(
        width,
        height,
        cc.ResolutionPolicy.SHOW_ALL
      );
      cc.view.resizeWithBrowserSize(true);
      // cc.loaderScene = null;
    },

    rotateScene(scene, width, height, orientation) {
      scene.setAnchorPoint(0, 0);
      if (orientation == "PORTRAIT") {
        this.changeSceneSize(height, width);
        scene.setPosition(0, height);
        scene.setRotation(90);
      } else if (orientation == "LANDSCAPE") {
        this.changeSceneSize(width, height);
        scene.setRotation(0);
        scene.setPosition(0, 0);
      }
    },
    disable() {
      let game = cc.game;
      if (game) {
        // game.end();
      }
    },
    resize() {
      let winSize = cc.winSize;
      let view = cc.view;
      if (winSize && view) {
        // 设置屏幕适配策略
        if (winSize.width < winSize.height) {
          view.setDesignResolutionSize(
            winSize.height,
            winSize.width,
            cc.ResolutionPolicy.SHOW_ALL
          );
        } else {
          view.setDesignResolutionSize(
            winSize.width,
            winSize.height,
            cc.ResolutionPolicy.SHOW_ALL
          );
        }
      }
    },
    bingEvent() {
      window.addEventListener("resize", this.resize);
    },
    unbingEvent() {
      window.removeEventListener("resize", this.resize);
    },
  },
  // 组件挂载完成后执行的函数
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
  <div class="game-box">
    <div ref="box" class="game-canvas-box"></div>
  </div>
</template>

<style >
.game-demo {
  width: 100%;
  height: 100%;
  position: relative;
}
.game-canvas-box {
  width: 100%;
  height: 100%;
  position: relative;
  /* transform: rotate(90deg); */
}
.game-canvas-box canvas {
  border: 0px;
  outline: 0px;
}
</style>
