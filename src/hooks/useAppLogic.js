import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import sound from "../assets/sound.mp3";

const audio = new Audio(sound);
audio.volume = 0.7;
audio.loop = true;

export function useAppLogic() {
  const location = useLocation();
  const midstyle = {
    maxWidth: location.pathname.startsWith("/Country/") ? "100vw" : "1000px",
  };

  const [theme, setTheme] = useState("light");
  const [expand, setExpand] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);
  const { y: scrollY } = useWindowScroll();

  useEffect(() => {
    setVisible(scrollY > 200);
  }, [scrollY]);

  const toggleCanvas = () => {
    if (showCanvas) {
      gsap.to("canvas", {
        opacity: 0,
        scale: 0,
        duration: 1.3,
        onComplete: () => {
          setShowCanvas(false);
        },
      });

      gsap.to(overlayRef.current, {
        width: "0",
        height: "0",
        opacity: 0,
        duration: 2,
        ease: "power3.inOut",
      });

      audio.pause();
      audio.currentTime = 0;
    } else {
      gsap.set(overlayRef.current,{borderRadius:'50%'})
      gsap.to(overlayRef.current, {
        width: "100vw",
        borderRadius:0,
        height: "100dvh",
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        onComplete: () => {
          setShowCanvas(true);
        },
      });

      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }
  };

  useEffect(() => {
    const handleMove = (e) => {
      gsap.to(".cursor", {
        x: e.x + 10,
        y: e.y + 10,
        duration: 1,
        ease: "back.out",
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return {
    theme,
    setTheme,
    expand,
    setExpand,
    showCanvas,
    setShowCanvas,
    visible,
    toggleCanvas,
    overlayRef,
    midstyle,
  };
}
