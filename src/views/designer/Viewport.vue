<template>
  <div class="viewport">显示</div>
</template>
<script >
export default {
  components: [],
  setup() {
    return {
    };
  },

  methods: {
    init() {},
    resize() {},
  },
  mounted() {
    this.init();
  },
};
</script>

<style >
.viewport {
  width: 100%;
  height: 100%;
  position: relative;
  background: #ddd;
}
</style>
