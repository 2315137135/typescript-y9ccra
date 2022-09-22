<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Game} from "../script/game";
import {createTestScene} from "../scene/testScene";

let canvas = ref()

onMounted(() => {
  let game = new Game(canvas.value, createTestScene)
})

</script>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
}
</style>
