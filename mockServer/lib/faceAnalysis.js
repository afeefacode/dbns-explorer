import * as faceapi from 'face-api.js/dist/face-api'
import referenceFaceDescriptors from '~/static/json/reference-descriptors'

/**
 * Gets the first <video> element from the DOM.
 *
 * @returns A 'video object' with the DOM element, resolution and displayed size of the element (needed for drawing)
 */
export function getVideo() {
    const resolution = {
        x: 800,
        y: 400,
    }
    const domElement = document.getElementsByTagName('video')[0]
    const displaySize = {
        width: domElement.offsetWidth,
        height: domElement.offsetHeight,
    }

    return {
        domElement,
        resolution,
        displaySize,
    }
}

/**
 * Loads the models for faceapi.js.
 *
 * @param MODEL_URL The base URL where the models are located
 */
export async function loadModels(MODEL_URL = './models') {
    // await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    // await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    // await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    // await faceapi.nets.faceExpressionNet.loadFromUri('/models')
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
}

/**
 * Sets the webcam stream as source to the video DOM element inside the 'video object'.
 *
 * @param video The 'video object'
 */
export function startVideo(video) {
    navigator.mediaDevices
        .getUserMedia({
            audio: true,
            video: {
                width: video.resolution.x,
                height: video.resolution.y,
            },
        })
        .then((stream) => (video.domElement.srcObject = stream))
        .catch(console.log)
}

/**
 * Creates a canvas ontop of the video DOM element.
 *
 * @param video The video element.
 * @returns     The canvas created by faceapi.js.
 */
export function createCanvas(video) {
    if (document.getElementsByTagName('canvas').length !== 0) {
        return document.getElementsByTagName('canvas')[0]
    } else {
        let canvas = faceapi.createCanvasFromMedia(video.domElement)

        faceapi.matchDimensions(canvas, video.displaySize)
        canvas.style.position = 'relative'
        canvas.style.top = video.domElement.offsetHeight * -1 - 10 + 'px'

        video.domElement.parentElement.append(canvas)
        return canvas
    }
}

/**
 * Performs the faceapi.js detection.
 *
 * @param video The 'video object'.
 * @returns     The detections from faceapi.js.
 */
export async function calculateVideoDetections(video) {
    let detections = await faceapi
        .detectSingleFace(video.domElement)
        .withFaceLandmarks()
        .withFaceDescriptor()

    if (!detections) return

    const resizedDetections = faceapi.resizeResults(
        detections,
        video.displaySize,
    )

    return resizedDetections
}

/**
 * Draws the face detections on the canvas (ontop of the users video element).
 *
 * @param canvas     The canvas created by faceapi.js.
 * @param detections The detections from faceapi.js.
 */
export function drawDetections(canvas, detections) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, detections)
}

/**
 * Calculates reference face descriptors (e.g. from the participants of a conference).
 *
 * @param relativePath The path where the reference images are located.
 * @returns            The reference face descriptors.
 */
export async function calculateReferenceFaceDescriptors(
    relativePath = './json/reference-images',
) {
    const labels = ['brandt', 'wiedemann', 'rogel', 'werner']

    const referenceFaceDescriptors = await Promise.all(
        labels.map(async (label) => {
            const img = await faceapi.fetchImage(`${relativePath}/${label}.jpg`)

            const fullFaceDescription = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()

            if (!fullFaceDescription) {
                console.error(`No faces detected for '${label}'`)
                return
            }

            const faceDescriptors = [fullFaceDescription.descriptor]

            return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
        }),
    )

    return referenceFaceDescriptors
}

/**
 * Loads reference face descriptors.
 *
 * @returns The face descriptors.
 */
export function getReferenceFaceDescriptors() {
    return referenceFaceDescriptors.data.map((x) =>
        faceapi.LabeledFaceDescriptors.fromJSON(x),
    )
}

/**
 * Runs the faceapi.js face-matching algorithm.
 *
 * @param userDetections           The face detections from the user.
 * @param referenceFaceDescriptors The face detections to compare with (e.g. all participants of a conference).
 * @returns The result of the face matcher algorithm.
 */
export function runFaceMatcher(userDetections, referenceFaceDescriptors) {
    const maxDescriptorDistance = 0.6
    const faceMatcher = new faceapi.FaceMatcher(
        referenceFaceDescriptors,
        maxDescriptorDistance,
    )

    const result = faceMatcher.findBestMatch(userDetections.descriptor)
    return result
}
