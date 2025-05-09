import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { initFaceDetection, detectFaces } from "@/lib/facedetection";

type FaceDetectionProps = {
  className?: string;
};

type DetectionResult = {
  faceDetected: boolean;
  confidence: number;
  landmarks: number;
  processingTime: number;
};

export default function FaceDetection({ className }: FaceDetectionProps) {
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult>({
    faceDetected: false,
    confidence: 0,
    landmarks: 0,
    processingTime: 0
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, []);

  const enableCamera = async () => {
    try {
      setIsModelLoading(true);
      
      // Load face detection model if not already loaded
      if (!isModelLoaded) {
        await initFaceDetection();
        setIsModelLoaded(true);
      }

      // Get camera stream
      const constraints = { video: { facingMode: "user" } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraEnabled(true);
        
        // Start face detection loop
        startFaceDetection();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check permissions.");
    } finally {
      setIsModelLoading(false);
    }
  };

  const startFaceDetection = () => {
    const detectFacesLoop = async () => {
      if (videoRef.current && canvasRef.current && streamRef.current) {
        const result = await detectFaces(videoRef.current, canvasRef.current);
        setDetectionResult(result);
      }
      
      requestAnimationFrameRef.current = requestAnimationFrame(detectFacesLoop);
    };
    
    detectFacesLoop();
  };

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to data URL
    const imageDataUrl = canvas.toDataURL('image/png');
    
    // Create an invisible link and trigger download
    const link = document.createElement('a');
    link.download = `face-detection-${new Date().toISOString()}.png`;
    link.href = imageDataUrl;
    link.click();
  };

  return (
    <Card className={cn("bg-white dark:bg-gray-800 shadow rounded-lg", className)}>
      <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Face Detection Feature
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try our advanced facial recognition capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 relative">
            {!isCameraEnabled ? (
              <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                <div className="text-center px-4">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Camera Feed</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Camera access required for face detection
                  </p>
                  <div className="mt-6">
                    <Button 
                      onClick={enableCamera} 
                      disabled={isModelLoading}
                      className="inline-flex items-center"
                    >
                      {isModelLoading ? (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Camera className="mr-2 h-4 w-4" />
                      )}
                      {isModelLoading ? "Loading Model..." : "Enable Camera"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <canvas 
                  ref={canvasRef} 
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            )}
          </div>
          
          <div className="lg:w-1/2">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Detection Results</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400">Face Detected:</div>
                    <div className="w-2/3 text-sm text-gray-900 dark:text-white">
                      <Badge variant="outline" className={detectionResult.faceDetected ? 
                        "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : 
                        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }>
                        {detectionResult.faceDetected ? "Face detected" : "No face detected"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400">Confidence:</div>
                    <div className="w-2/3 text-sm text-gray-900 dark:text-white">
                      {detectionResult.faceDetected 
                        ? `${(detectionResult.confidence * 100).toFixed(2)}%` 
                        : "-"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400">Landmarks:</div>
                    <div className="w-2/3 text-sm text-gray-900 dark:text-white">
                      {detectionResult.faceDetected 
                        ? detectionResult.landmarks 
                        : "-"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-500 dark:text-gray-400">Processing Time:</div>
                    <div className="w-2/3 text-sm text-gray-900 dark:text-white">
                      {detectionResult.faceDetected 
                        ? `${detectionResult.processingTime.toFixed(2)}ms` 
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    variant="outline"
                    onClick={captureImage}
                    disabled={!isCameraEnabled || !detectionResult.faceDetected}
                  >
                    Capture Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
