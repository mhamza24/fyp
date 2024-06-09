const video = document.getElementById("videoInput");
const labelDiv = document.getElementById("label");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"), // heavier/accurate version of tiny face detector
]).then(start);

function start() {
  document.body.append("Models Loaded");

  // Define dimensions for the video
  video.width = 720; // Set to desired width
  video.height = 540; // Set to desired height

  // Set the video source and start recognition
  video.src = "../videos/mhkANDkhuzaima.mp4";
  video.addEventListener("loadeddata", () => {
    console.log("Video loaded");
    recognizeFaces();
  });
}

async function recognizeFaces() {
  const labeledDescriptors = await loadLabeledImages();
  console.log(labeledDescriptors);
  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);

  video.addEventListener("play", async () => {
    console.log("Playing");
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });

      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        drawBox.draw(canvas);

        // Log the label to the console and update the label div
        console.log(`Matched label: ${result.label}`);
        labelDiv.textContent = `Recognized Name: ${result.label}`;
      });
    }, 100);
  });
}

function loadLabeledImages() {
  const labels = [
    "Muhammad Hamza Khalid",
    "Khuzaima Ansari",
    "Sir Asad Ur Rehman",
    "Yasir Ahmed",
    "Qazi Furrukh Hussain",
  ];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `../labeled_images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections) {
          descriptions.push(detections.descriptor);
        } else {
          console.error(`No face detected for ${label} in image ${i}`);
        }
      }
      document.body.append(label + " Faces Loaded | ");
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
