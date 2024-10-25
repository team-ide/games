<template>
  <div class="viewport">
    <slot name="viewport"></slot>
  </div>
</template>
<script >
export default {
  components: {},
  data() {
    return {};
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
  position: relative;
  background: #ddd;
}
</style>
