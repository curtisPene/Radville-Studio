import type { IntroAnimationProps } from "@/types/app.types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Pipe } from "./Pipe";
import { forwardRef, useRef } from "react";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export const IntroAnimation = forwardRef<HTMLDivElement, IntroAnimationProps>(
  (props, ref) => {
    const { onComplete } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoSrc =
      "https://radaville.cdn.prismic.io/radaville/Z26oD5bqstJ982yq_output_1.mp4";

    const buttonBackgroundRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hiddenTextRef = useRef<HTMLSpanElement>(null);
    const visTextRef = useRef<HTMLSpanElement>(null);
    const scopeRef = useRef<HTMLDivElement>(null);

    useGSAP(
      () => {
        const timeline = gsap.timeline();
        const xTranslate = 32;

        // Lock in initial states for first sequence

        const handleButtonEnter = () => {
          // Slide background up
          gsap.to(buttonBackgroundRef.current, {
            y: 0,
            duration: 0.2,
            ease: "power2.in",
          });

          gsap.to(visTextRef.current, {
            scale: 0.5,
            top: "100%",
            duration: 0.2,
            ease: "power2.in",
          });

          // Scale text in
          gsap.to(hiddenTextRef.current, {
            scale: 1,
            duration: 0.3,
            top: 0,
            ease: "power1.in",
          });
        };

        const handleButtonLeave = () => {
          gsap.to(buttonBackgroundRef.current, {
            y: "100%",
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(visTextRef.current, {
            scale: 1,
            duration: 0.4,
            top: 0,
            delay: 0.5,
            opacity: 1,
            ease: "power2.in",
          });

          gsap.to(hiddenTextRef.current, {
            scale: 0.5,
            duration: 0.2,
            top: "100%",
            ease: "power1.in",
          });
        };

        const handleClick = () => {
          const calculateScaleToFitScreen = () => {
            // Calculate the distance from center to corner of screen
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // Diagonal distance from center to corner
            const diagonal = Math.sqrt((vw / 2) ** 2 + (vh / 2) ** 2);
            // Assuming the bg-fill is around 300-400px, scale it up
            return diagonal / 50; // Adjust 150 based on your element size
          };

          gsap.set(videoRef.current, {
            opacity: 0,
            clipPath: "none",
          });
          videoRef.current!.style.setProperty("clip-path", "none");
          videoRef.current!.pause();
          gsap.set(".bg-fill", {
            opacity: 1,
            clipPath: "url(#customClip)",
          });

          // gsap.to("#shapeA", {
          //   duration: 1,
          //   attr: {
          //     d: document!.querySelector("#shapeB")!.getAttribute("d") ?? "",
          //   },
          //   ease: "power2.inOut",
          //   delay: 0.4, // after fade
          // });

          // Expand to fill screen (clip stays 0–1 so it auto-scales)
          gsap.to(".bg-fill", {
            scale: calculateScaleToFitScreen(),
            duration: 0.8,
            ease: "power2.inOut",
            transformOrigin: "50% 50%",
            delay: 0.5,
            zIndex: 99,
            onComplete: () => {
              onComplete();
            },
          });
        };

        buttonRef.current?.addEventListener("mouseenter", handleButtonEnter);
        buttonRef.current?.addEventListener("mouseleave", handleButtonLeave);
        buttonRef.current?.addEventListener("click", handleClick);

        let tl5: GSAPTimeline;
        const animatePipes = () => {
          if (tl5) tl5.kill();
          tl5 = gsap.timeline({});
          tl5.to(
            [".pipe-1", ".pipe-2"],
            {
              x: (_, element: HTMLDivElement) => {
                return element.classList.contains("pipe-1")
                  ? -xTranslate
                  : xTranslate;
              },
              opacity: 1,
              duration: 0.4,
              ease: "sine.out",
            },
            0
          );

          tl5.to(
            ".span-1",
            {
              x: -xTranslate,
              opacity: 1,
              duration: 0.5,

              ease: "sine.out",
            },
            0
          );

          tl5.to(
            ".span-2",
            {
              x: xTranslate,
              opacity: 1,
              duration: 0.5,
              ease: "sine.out",
            },
            0
          );

          return tl5;
        };

        let tl: GSAPTimeline;
        const animateText = () => {
          if (tl) tl.kill();
          tl = gsap.timeline({});

          return tl;
        };

        const endSequence1 = () => {
          return gsap.to(".sequence-1", {
            opacity: 0,
            duration: 1.2,
            delay: 1.5,
          });
        };

        const enterSequence2 = () => {
          return gsap.to(".sequence-2", {
            opacity: 1,
            duration: 0.8,
          });
        };

        let tl2: GSAPTimeline;
        const animateClipPath = () => {
          if (tl2) tl2.kill();
          tl2 = gsap.timeline({
            onStart: () => {
              videoRef.current!.play();
            },
          });

          tl2.fromTo(
            videoRef.current,
            {
              scale: 0,
            },
            {
              scale: 1,
              duration: 1,
              transformOrigin: "50% 100%",
            }
          );

          return tl2;
        };

        let tl3: GSAPTimeline;
        const animateHeaders = () => {
          if (tl3) tl3.kill();
          tl3 = gsap.timeline({});
          tl3.fromTo(
            [".text-1", ".text-2"],
            {
              y: "100%",
            },
            {
              y: 0,
              duration: 0.8,
              ease: "sine.out",
            }
          );
          tl3.to(".text-3", {
            opacity: 1,
            duration: 0.8,
            ease: "sine.out",
          });

          tl3.to(buttonRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "sine.out",
          });
          return tl3;
        };

        timeline
          .add(animatePipes(), 1)
          .add(animateText(), 1)
          .add(endSequence1())
          .add(enterSequence2())
          .add(animateClipPath())
          .add(animateHeaders(), "-=0.5");

        return () => {
          buttonRef.current?.removeEventListener(
            "mouseenter",
            handleButtonEnter
          );
          buttonRef.current?.removeEventListener(
            "mouseleave",
            handleButtonLeave
          );
          buttonRef.current?.removeEventListener("click", handleClick);
        };
      },

      { scope: scopeRef, dependencies: [onComplete] }
    );

    const Sequence1 = () => {
      return (
        <div className="sequence-1 intro-container z-100">
          <div className="pipe-container w-full display flex flex-row justify-center items-center gap-4">
            <div className="left flex flex-row justify-center items-center gap-2">
              <span className="span-1 text-gray-300 text-sm font-sans font-light opacity-0">
                Thinking Things
              </span>
              <Pipe className="pipe-1 " />
            </div>
            <div className="right flex flex-row justify-center items-center gap-2">
              <Pipe className="pipe-2" />
              <span className="span-2 text-gray-300 text-sm font-sans font-light opacity-0">
                Into Existence
              </span>
            </div>
          </div>
        </div>
      );
    };

    const Sequence2 = () => {
      return (
        <div className="sequence-2 intro-container fixed inset-0 opacity-0">
          <div className=" flex flex-col justify-center items-center black-background w-full h-full bg-neutral-900">
            {/* SVG definition - keep this separate */}
            <svg className="absolute w-0 h-0">
              <defs>
                <clipPath id="customClip" clipPathUnits="objectBoundingBox">
                  <path d="M0.981,0.987 H0.5 H0.019 V0.421 C0.019,0.17 0.171,0.013 0.5,0.013 C0.829,0.013 0.981,0.17 0.981,0.421 V0.987 Z" />
                </clipPath>
                <clipPath id="clipB" clipPathUnits="objectBoundingBox">
                  <path
                    id="shapeB"
                    d="
          M0.167,0
          H0.833
          C0.944,0 1,0.056 1,0.167
          V0.833
          C1,0.944 0.944,1 0.833,1
          H0.167
          C0.056,1 0,0.944 0,0.833
          V0.167
          C0,0.056 0.056,0 0.167,0
          Z"
                  />
                </clipPath>
              </defs>
            </svg>

            {/* Apply clip-path directly to video */}
            <div className="absolute top-[10%] flex flex-col items-center gap-12">
              <div className="relative w-50 h-66">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={videoSrc}
                  muted
                  loop
                  playsInline
                  style={{ clipPath: "url(#customClip)" }}
                />

                <div
                  className="bg-fill absolute inset-0 bg-[#311512] opacity-0"
                  style={{ clipPath: "url(#customClip)" }}
                ></div>
              </div>

              <div className="text-content flex flex-col items-center gap-2">
                <span className="text-3 font-extralight text-[10px] font-sans text-gray-400 opacity-0">
                  A MULTIDISCIPLINARY DESIGN STUDIO
                </span>
                <div className="flex flex-col items-center gap-4">
                  <div className="overflow-hidden">
                    <h2 className="text-1 text-white font-serif text-2xl">
                      Elevating Spaces
                    </h2>
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-2 text-white font-serif text-2xl">
                      Defining Aesthetics, Cultivating Brands
                    </h2>
                  </div>
                </div>
                <button
                  ref={buttonRef}
                  className="relative overflow-hidden  bg-white text-[10px] mt-2 font-sans font-light px-6 py-1 rounded-full opacity-0"
                >
                  <span
                    ref={visTextRef}
                    className="primary-enter-text relative"
                  >
                    Enter
                  </span>

                  <div
                    ref={buttonBackgroundRef}
                    className="absolute flex flex-row items-center justify-center inset-0 bg-amber-800 translate-y-full"
                  >
                    <span
                      ref={hiddenTextRef}
                      className="secondary-enter-text transform relative top-full scale-[0.5] text-white"
                    >
                      Enter
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        id="intro-animation-scope"
        className=" absolute flex flex-row justify-center items-center inset-0 w-full h-full bg-neutral-900 z-100"
      >
        <div ref={scopeRef}>
          {" "}
          <Sequence1 />
          <Sequence2 />
        </div>
      </div>
    );
  }
);

IntroAnimation.displayName = "IntroAnimation";
