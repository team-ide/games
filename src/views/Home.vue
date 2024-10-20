<script setup>
// import accessPointOff from "@mdi/svg/svg/home.svg";
import Icon from "components/Icon.vue";
import { mdiHome, mdiAccount } from "@mdi/js";

console.log(mdiHome);
console.log(mdiAccount);
console.log(mdi);
</script>


<template>
  <div class="page">
    <h1>This is an page home</h1>
    <Icon :path="mdiHome" size="20" transform="1"> </Icon>
    <Icon :path="mdiHome" size="20" transform="2"> </Icon>
    <Icon :path="mdiAccount" size="20" transform="1"> </Icon>
  </div>
</template>

<style>
</style>
