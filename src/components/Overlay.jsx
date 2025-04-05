import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import frameImage from "../assets/images/frame.png";
import backgroundVideo from "../assets/videos/bg.mp4";
import { gsap } from "gsap";

const Overlay = ({ onClick }) => {
  const navigate = useNavigate();
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    
    
    if (headingRef.current) {
      // Make immediately visible with !important equivalent settings
      headingRef.current.style.opacity = "1";
      headingRef.current.style.visibility = "visible";
      headingRef.current.style.display = "block";
      headingRef.current.style.zIndex = "999";
      
      // Skip GSAP for initial setting and use direct DOM manipulation
      setTimeout(() => {
        if (headingRef && headingRef.current) {
          headingRef.current.style.opacity = "1";
        }
      }, 100);
    }
  }, []);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Create a fixed black background to prevent white flash
    const blackOverlay = document.createElement('div');
    blackOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      z-index: 1;
    `;
    document.body.appendChild(blackOverlay);

    // Clone the video and position it above the black overlay with high quality settings
    if (videoRef.current) {
      const videoClone = videoRef.current.cloneNode(true);
      videoClone.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 2;
        will-change: auto;
        transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
      `;
      videoClone.play();
      videoClone.playbackRate = 3;
      document.body.appendChild(videoClone);
      
      // Original video can still play with better performance settings
      videoRef.current.playbackRate = 3;
      videoRef.current.style.willChange = 'auto';
      videoRef.current.style.transform = 'translateZ(0)';
      videoRef.current.play();
    }

    // Animate the heading to fade out and move up - clean animation
    gsap.to(headingRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.in",
      force3D: true,
      clearProps: "transform"
    });

    // Make sure the frame is above everything
    if (frameRef.current) {
      // Clone the frame and position it fixed to ensure it's visible during animation
      const frameClone = frameRef.current.cloneNode(true);
      const frameRect = frameRef.current.getBoundingClientRect();
      
      frameClone.style.cssText = `
        position: fixed;
        top: ${frameRect.top}px;
        left: ${frameRect.left}px;
        width: ${frameRect.width}px;
        height: ${frameRect.height}px;
        margin: 0;
        z-index: 1000;
        transform-origin: center center;
        will-change: transform;
        backface-visibility: hidden;
      `;
      document.body.appendChild(frameClone);
      
      // Hide the original frame
      frameRef.current.style.opacity = "0";
      
      // Animate the cloned frame for better visibility
      gsap.to(frameClone, {
        duration: 2.5,
        scale: 20,
        opacity: 0,
        ease: "power2.inOut",
        force3D: true,
        onStart: () => {
          console.log("Frame animation started");
        },
        onComplete: () => {
          console.log("Frame animation completed");
          // Remove the cloned frame
          if (document.body.contains(frameClone)) {
            document.body.removeChild(frameClone);
          }
          
          // Navigate after the animation completes
          setTimeout(() => {
            if (onClick) onClick();
            navigate("/home");
            
            // Clean up after navigation is triggered
            setTimeout(() => {
              if (document.body.contains(blackOverlay)) {
                document.body.removeChild(blackOverlay);
              }
              const clonedVideo = document.querySelector('video[style*="fixed"]');
              if (clonedVideo && document.body.contains(clonedVideo)) {
                document.body.removeChild(clonedVideo);
              }
            }, 100);
          }, 50);
        },
      });
    }
  };

  return (
    <div className="overlay flex flex-col items-center justify-center h-screen relative overflow-hidden">
      {/* Video Background with improved rendering */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVideo}
        muted
        playsInline
        style={{
          willChange: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0.3;
          }
        }}
      />

     
     

      {/* FIXED: Moved heading to proper position ABOVE the frame */}
      <div className="relative w-full flex flex-col items-center mt-37 z-[999]">
        <h1 
          ref={headingRef}
          className="text-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                    uppercase tracking-wider font-semibold"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif, system-ui",
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          River Ranch
        </h1>
      </div>

      {/* Frame Container with improved rendering */}
      <div className="frameImg relative flex items-center justify-center w-full px-4">
        <img
          ref={frameRef}
          src={frameImage}
          alt="Frame"
          style={{
            width: "90%", // Mobile default
            maxWidth: "600px", // Maximum size on larger screens
            display: "block",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
            willChange: "transform",
            transformOrigin: "center center",
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            imageRendering: 'high-quality'
          }}
          className="sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]"
        />

        {!isAnimating && (
          <button
            className="absolute left-1/2 top-1/2 transform uppercase -translate-x-1/2 -translate-y-1/2 
                      bg-[#988579] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 
                      text-sm sm:text-base md:text-lg 
                      rounded-lg border-2 border-white hover:bg-[#7a6b61] z-20"
            onClick={handleClick}
            style={{
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
          >
            Explore
          </button>
        )}
      </div>
    </div>
  );
};

export default Overlay;
