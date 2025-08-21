
"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, Video, VideoOff, Check, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CameraCaptureDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setImage: (image: string | null) => void;
}

export function CameraCaptureDialog({ isOpen, setIsOpen, setImage }: CameraCaptureDialogProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null)
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null)
  const { toast } = useToast()

  React.useEffect(() => {
    let stream: MediaStream | null = null;
    
    const getCameraPermission = async () => {
      if (!isOpen) return;

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    
    getCameraPermission();

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isOpen]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
      }
    }
  }

  const handleConfirm = () => {
    if (capturedImage) {
      setImage(capturedImage);
      toast({
          title: "Image Captured!",
          description: "The image from your camera is now ready to be sent.",
      });
      handleClose();
    }
  }

  const handleClose = () => {
    setCapturedImage(null);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Capture from Camera</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" className="rounded-md w-full aspect-video object-cover" />
          ) : (
            <>
              <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
              {hasCameraPermission === false && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                    <Alert variant="destructive" className="w-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Camera Access Denied</AlertTitle>
                        <AlertDescription>
                            Please enable camera permissions in your browser settings.
                        </AlertDescription>
                    </Alert>
                 </div>
              )}
            </>
          )}
           <canvas ref={canvasRef} className="hidden" />
        </div>

        <DialogFooter>
          {capturedImage ? (
            <>
                <Button variant="outline" onClick={() => setCapturedImage(null)}>Recapture</Button>
                <Button onClick={handleConfirm} className="gap-2">
                    <Check className="h-4 w-4"/> Use this image
                </Button>
            </>
          ) : (
            <Button onClick={handleCapture} disabled={!hasCameraPermission} className="gap-2">
                <Camera className="h-4 w-4"/> Capture
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
