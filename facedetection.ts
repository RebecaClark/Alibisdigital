import * as faceDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs';

let model: faceDetection.FaceLandmarksDetector | null = null;

export async function initFaceDetection() {
  if (model) return model;
  
  try {
    // Load the MediaPipe Facemesh model
    model = await faceDetection.load(
      faceDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 }
    );
    
    console.log("Face detection model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading face detection model:", error);
    throw new Error("Failed to load face detection model");
  }
}

export async function detectFaces(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
): Promise<{
  faceDetected: boolean;
  confidence: number;
  landmarks: number;
  processingTime: number;
}> {
  if (!model) {
    return {
      faceDetected: false,
      confidence: 0,
      landmarks: 0,
      processingTime: 0
    };
  }
  
  // Start timing the detection
  const startTime = performance.now();
  
  try {
    // Adjust canvas dimensions to match video
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    
    if (canvas.width !== videoWidth || canvas.height !== videoHeight) {
      canvas.width = videoWidth;
      canvas.height = videoHeight;
    }
    
    // Run face detection
    const predictions = await model.estimateFaces({
      input: video
    });
    
    // Calculate processing time
    const endTime = performance.now();
    const processingTime = endTime - startTime;
    
    // Draw results on canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return { faceDetected: false, confidence: 0, landmarks: 0, processingTime };
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check if we have any predictions
    if (predictions.length > 0) {
      const face = predictions[0];
      const keypoints = face.keypoints;
      const boundingBox = face.boundingBox;
      
      // Draw bounding box
      if (boundingBox) {
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          boundingBox.topLeft[0],
          boundingBox.topLeft[1],
          boundingBox.bottomRight[0] - boundingBox.topLeft[0],
          boundingBox.bottomRight[1] - boundingBox.topLeft[1]
        );
      }
      
      // Draw keypoints
      if (keypoints) {
        keypoints.forEach((keypoint) => {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
        });
      }
      
      // Return detection results
      return {
        faceDetected: true,
        confidence: face.faceInViewConfidence || 1.0,
        landmarks: keypoints ? keypoints.length : 0,
        processingTime: processingTime
      };
    }
    
    // No face detected
    return {
      faceDetected: false,
      confidence: 0,
      landmarks: 0,
      processingTime: processingTime
    };
  } catch (error) {
    console.error("Error during face detection:", error);
    return {
      faceDetected: false,
      confidence: 0,
      landmarks: 0,
      processingTime: 0
    };
  }
}
