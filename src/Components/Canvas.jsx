import { images } from "../image"
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"   

export const Canvas = ({details}) => {
  const {startIndex, numImages, duration, size, top, left, zIndex} = details
  const canvasRef = useRef(null)
  const [index, setIndex] = useState({value: startIndex})
  const imageCache = useRef({})

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1, 
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {            
        setIndex({value: Math.round(index.value)})
      } 
    }) 

    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1.2,
      scale: 0
    })
  }) 

  const [canvasSize, setCanvasSize] = useState(size) 
  
  useEffect(() => { 
    const updateCanvasSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) {
        setCanvasSize(size * 0.5); 
      } else if (screenWidth < 768) {
        setCanvasSize(size * 0.7); 
      } else {
        setCanvasSize(size); 
      }
    };
  
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [size]);

  // Preload images once
  useEffect(() => {
    const imagesToLoad = [];
    for (let i = startIndex; i < startIndex + numImages; i++) {
      if (!imageCache.current[i]) {
        const img = new Image();
        img.src = images[i];
        imageCache.current[i] = img;
        imagesToLoad.push(new Promise((resolve) => {
          img.onload = resolve;
        }));
      }
    }
    
    Promise.all(imagesToLoad).then(() => {
      // All images loaded
    });
  }, [startIndex, numImages]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (imageCache.current[index.value]) {
      canvas.width = canvas.offsetWidth * scale; 
      canvas.height = canvas.offsetHeight * scale;
      ctx.scale(scale, scale);
      ctx.drawImage(imageCache.current[index.value], 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
  }, [index, canvasSize]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex,
        width: `${canvasSize}px`,
        height: `${canvasSize}px`
      }} 
      id="canvas"
    ></canvas> 
  )
}
