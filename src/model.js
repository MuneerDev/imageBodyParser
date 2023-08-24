import * as tf from "@tensorflow/tfjs"

const model = await tf.loadGraphModel(
  "https://tfhub.dev/google/tfjs-model/movenet/singlepose/lightning/4",
  { fromTFHub: true }
)

export default model
