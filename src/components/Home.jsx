import React, { useEffect, useRef } from "react";
// import video from "../assets/videos/video.mp4";
import bgvideo from "../assets/videos/video1.mp4";
import { RiCalendarCheckLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaUnlock } from "react-icons/fa6";
import { gsap } from "gsap";

const Home = () => {
  const headingRef1 = useRef(null);
  const headingRef2 = useRef(null);
  const headingRef3 = useRef(null);
  const headingsContainerRef = useRef(null);
  const bookButtonRef = useRef(null);
  const bookingSectionRef = useRef(null);
  const birdRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Make sure the video plays automatically
    if (videoRef && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }

    // Set initial states
    gsap.set(headingsContainerRef.current, {
      opacity: 0,
    });
    gsap.set([headingRef1.current, headingRef2.current, headingRef3.current], {
      opacity: 0,
      x: -100,
    });
    gsap.set(bookButtonRef.current, {
      opacity: 0,
      y: 50,
    });
    gsap.set(bookingSectionRef.current, {
      opacity: 0,
      y: 100,
    });

    // Explicitly set the bird's initial position
    if (birdRef.current) {
      gsap.set(birdRef.current, {
        x: "110vw",
        opacity: 0,
        display: 'block'
      });
    }

    const tl = gsap.timeline({ delay: 0.5 });

    // First fade in the container
    tl.to(headingsContainerRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
    })
    .to(headingRef1.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out",
    })
    .to(
      headingRef2.current,
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.8"
    )
    .to(
      headingRef3.current,
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.8"
    )
    .to(
      bookButtonRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6"
    )
    .to(
      bookingSectionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Create a separate timeline for the bird animation
    const birdTl = gsap.timeline({ delay: 2 });
    
    if (birdRef.current) {
      birdTl.to(birdRef.current, {
        opacity: 1,
        duration: 0.5
      }).to(birdRef.current, {
        x: "-100vw",
        duration: 40,
        ease: "none",
      });
    }
    
    // Cleanup
    return () => {
      tl.kill();
      birdTl.kill();
    };
  }, []);

  return (
    <div className="h-screen w-full relative zoom-fade-transition" style={{ backgroundColor: 'black' }}>
      <div className="h-20 z-10 absolute w-full bg-gradient-to-b from-[#1F7580] to-transparent top-0 left-0"></div>
      
      {/* Background video with improved rendering */}
      <video
        className="absolute w-screen h-full object-cover"
        src={bgvideo}
        alt="video"
        autoPlay loop muted playsInline
        ref={videoRef}
        style={{
          willChange: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Bird image with improved rendering */}
      <img
        ref={birdRef}
        className="absolute size-20 sm:size-24 md:size-32 lg:size-40 sm:block hidden"
        style={{ 
          top: '10%',
          opacity: 0,
          visibility: 'visible',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        src="https://i.gifer.com/2vDc.gif"
        alt="flying birds"
      />

      {/* Container for headings with improved rendering */}
      <div 
        ref={headingsContainerRef}
        className="absolute inset-0 flex flex-col uppercase justify-center z-10 px-4"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Background element for headings - hidden on mobile */}
        <div className="absolute hidden sm:block left-0 right-0 sm:right-auto max-w-[100%] sm:max-w-[80%] md:max-w-[70%] h-[260px] sm:h-[320px] md:h-[400px] lg:h-[500px] 
                       bg-gradient-to-r from-black/50 to-transparent sm:rounded-r-3xl rounded-none z-[-1]">
        </div>
        
        <h3
          ref={headingRef1}
          className="text-center sm:text-left sm:pl-[15%] md:pl-[20%] lg:pl-[25%] hero-heading tracking-wide text-sm sm:text-base md:text-lg lg:text-xl 
                    text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          Welcome to River Ranch
        </h3>
        <h1
          ref={headingRef2}
          className="text-center sm:text-left sm:pl-[15%] md:pl-[20%] lg:pl-[25%] hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                    text-white font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          style={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.6), 0 6px 20px rgba(0, 0, 0, 0.3)" }}
        >
          Treasure
        </h1>
        <h1
          ref={headingRef3}
          className="text-center sm:text-left sm:pl-[25%] md:pl-[30%] lg:pl-[40%] hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                    text-white font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          style={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.6), 0 6px 20px rgba(0, 0, 0, 0.3)" }}
        >
          your holiday
        </h1>
        
        {/* <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
          <button
            ref={bookButtonRef}
            className="text-base sm:text-lg md:text-xl bg-transparent text-white border-2 border-white  hover:bg-white
                      transition-colors rounded-full px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 uppercase tracking-wide font-medium 
                      shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            Book Now
          </button>
        </div> */}
      </div>

      <div
        ref={bookingSectionRef}
        className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-10 md:pb-16 lg:pb-20 z-10"
      >
        {/* For larger screens - horizontal layout */}
        <div className="hidden md:flex gap-4 items-center lg:gap-8 xl:gap-16 p-4 sm:p-6 rounded-lg">
          <div>
            <div className="flex gap-2 items-center">
              <RiCalendarCheckLine className="text-[#fff]" />
              <h3 className="uppercase font-semibold text-white text-sm lg:text-base">Check in</h3>
            </div>
            <input className="bg-transparent text-white border-b-2 border-[#fff] outline-none w-full" type="text" />
          </div>

          <div>
            <div className="flex gap-2 items-center">
              <RiCalendarCheckLine className="text-[#fff]" />
              <h3 className="uppercase font-semibold text-white text-sm lg:text-base">Check out</h3>
            </div>
            <input className="bg-transparent text-white border-b-2 border-[#fff] outline-none w-full" type="text" />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <IoMdPerson className="text-[#fff]" />
              <h3 className="uppercase font-semibold text-white text-sm lg:text-base">guests</h3>
            </div>
            <input className="bg-transparent text-white border-b-2 border-[#fff] outline-none w-full" type="text" />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <FaUnlock className="text-[#fff]" />
              <h3 className="uppercase font-semibold text-white text-sm lg:text-base">Accommodation</h3>
            </div>
            <input className="bg-transparent text-white border-b-2 border-[#fff] outline-none w-full" type="text" />
          </div>
          <button   className="text-white border-1 rounded-2xl uppercase text-xl font font-semibold   px-10 py-3"> Book Now</button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
