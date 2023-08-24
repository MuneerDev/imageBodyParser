<template>
  <div class="w-fit mx-auto mt-10">
    <div class="relative">
<img crossorigin="anonymous" ref="image" src="https://previews.123rf.com/images/mimagephotography/mimagephotography1507/mimagephotography150700379/42743510-full-body-portrait-of-a-fit-man-running-outdoors.jpg" alt="" class="w-[600px] relative">
<Keypoint v-for="keypoint in keypoints[0][0]" :point="keypoint" :width="image.width" :height="image.height" v-if="keypoints.length > 0"></Keypoint>
</div>
<button @click="estimate" class="bg-black text-white px-4 py-2 rounded-lg mt-4">Estimate</button>
<button @click="changeImage" class="mx-4 bg-black text-white px-4 py-2 rounded-lg mt-4">Image Url</button>
<input v-model="imgUrl" type="text" placeholder="Image Url" class="border-2 border-green-300 px-3 py-2">
</div>
</template>

<script setup>
import * as tf from '@tensorflow/tfjs';
import { ref } from "vue";
import model from "./model.js"
import Keypoint from "./components/keypoint"

const changeImage = () =>{
  keypoints.value = 0
  image.value.src = imgUrl.value
}

const imgUrl = ref()

let cropStart = [0,0,0]
let cropSize = [600,600,3]

const image = ref()

setTimeout(() => {
console.log(image.value.height)
  
}, 1000);
const keypoints = ref([])
const estimate = async () =>{

  const tidy = tf.tidy(()=>{
  let imageTensor = tf.browser.fromPixels(image.value)
  const resizedTensor = tf.image.resizeBilinear(imageTensor, [600, 600]);
  let cropTensor = tf.slice(resizedTensor,cropStart,cropSize )
  let resizeImage = tf.image.resizeBilinear(cropTensor,[192,192],true).toInt()
  let expand = tf.expandDims(resizeImage)
  return expand
  })
  let outPutTensoer = model.predict(tidy)
  let outputArray = await outPutTensoer.array()
  keypoints.value = outputArray
  outPutTensoer.dispose()
}
</script>


