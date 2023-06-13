<template>
  <div class="rounded-full bg-green-500 w-2 h-2 absolute " :style="{top: `${point[0] * height}px`, left: `${point[1] * width}px`}"></div>
</template>

<script setup>
const props = defineProps({
  point: Array,
  height: Number,
  width: Number
})
console.log(props.width)
</script>