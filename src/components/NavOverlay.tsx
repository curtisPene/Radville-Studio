import { useRef } from "react";
import { createPortal } from "react-dom";
import { MenuIcon, XIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WordMark } from "./WordMark";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import { closeNav, openNav } from "@/stores/navSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { NavOverlayType } from "@/types";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const NavOverlay: React.FC<NavOverlayType> = ({ pageRef }) => {
  const isOpen = useSelector((state: RootState) => state.navState.isOpen);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const overlayRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const handleClose = contextSafe(
    (
      e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
      path: string
    ) => {
      e.preventDefault();

      const timeline = gsap.timeline({
        onStart: () => {
          navigate(path);
          gsap.set(pageRef.current, { zIndex: 55, position: "relative" });
          gsap.set(overlayRef.current, { zIndex: 50 });
        },
        onComplete: () => {
          gsap.set(pageRef.current, { position: "", zIndex: "" });
          dispatch(closeNav());
        },
      });

      timeline.fromTo(
        pageRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.9, ease: "power2.out" },
        0
      );

      timeline
        .to(
          ".close-button",
          {
            opacity: 0,
            y: "-50%",
            duration: 0.9,
          },
          0
        )
        .to(
          "#wordmark",
          {
            opacity: 0,
            y: "-50%",
            duration: 0.9,
          },
          0
        )
        .to(
          ".reveal",
          {
            y: "-100%",
            duration: 0.9,
          },
          0
        )
        .to(
          "#info",
          {
            opacity: 0,
            duration: 0.9,
          },
          0
        )
        .to(
          ".footer-text",
          {
            opacity: 0,
            y: "-20%",
            duration: 0.9,
          },
          0
        );
    }
  );

  useGSAP(
    () => {
      if (isOpen && overlayRef.current) {
        // Overlay slides in
        gsap.from(overlayRef.current, {
          y: "100%",
          duration: 0.9,
          ease: "power1.inOut",
        });

        gsap.from(".reveal", {
          y: "100%",
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.7,
        });

        gsap.from("#wordmark", {
          opacity: 0,
          duration: 2.1,
          ease: "sine",
          delay: 1.2,
        });

        gsap.from("#info", {
          opacity: 0,
          duration: 2.5,
          ease: "sine",
          delay: 1.7,
        });

        gsap.from(".footer-text", {
          opacity: 0,
          y: "200%",
          duration: 0.6,
          ease: "sine",
          delay: 2,
        });
      }

      const cleanups: (() => void)[] = [];

      const setupLinkAnimation = (selector: string) => {
        if (!document.fonts.ready) return;

        document.fonts.ready.then(() => {
          const split = new SplitText(selector, { type: "chars" });

          const handleMouseEnter = () => {
            gsap.to(split.chars, {
              rotateY: 180,
              duration: 0.5,
              stagger: 0.05,
              ease: "sine.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(split.chars, {
              rotateY: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "sine.out",
            });
          };

          const handleTap = () => {
            const tl = gsap.timeline();
            tl.to(split.chars, {
              rotateY: 180,
              duration: 0.5,
              stagger: 0.05,
              ease: "sine.out",
            }).to(split.chars, {
              rotateY: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "sine.out",
            });

            return tl;
          };

          const link = document.querySelector(selector);
          link?.addEventListener("mouseenter", handleMouseEnter);
          link?.addEventListener("mouseleave", handleMouseLeave);
          link?.addEventListener("click", handleTap);

          cleanups.push(() => {
            split.revert();
            link?.removeEventListener("mouseenter", handleMouseEnter);
            link?.removeEventListener("mouseleave", handleMouseLeave);
            link?.removeEventListener("click", handleTap);
          });
        });
      };

      setupLinkAnimation(".work-link");
      setupLinkAnimation(".about-link");
      setupLinkAnimation(".curation-link");
      setupLinkAnimation(".contact-link");

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [isOpen], scope: overlayRef }
  );

  const overlay = isOpen
    ? createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black flex flex-col z-70"
        >
          <div className="overlay-header__container flex items-center justify-between p-4">
            <div id="wordmark">
              <WordMark fill="white" />
            </div>

            <button
              onClick={(e) => {
                handleClose(e, pathname);
              }}
              className="close-button opacity-100"
            >
              <XIcon className=" text-white w-8 h-8 hover:cursor-pointer" />
            </button>
          </div>
          <div className="overlay-content h-full p-4 flex flex-row w-full">
            <div className="h-full w-full">
              <nav className="h-full w-full">
                <ul className="flex flex-col justify-end h-full w-full">
                  <li className="overflow-hidden w-full">
                    <div className="reveal">
                      <Link
                        to={"/"}
                        onClick={(e) => {
                          setTimeout(() => {
                            handleClose(e, "/");
                          }, 1500);
                        }}
                        className="work-link text-6xl"
                      >
                        Work
                      </Link>
                    </div>
                  </li>
                  <li className="overflow-hidden ">
                    <div className="reveal">
                      <Link
                        to={"/test"}
                        onClick={(e) => {
                          setTimeout(() => {
                            handleClose(e, "/test");
                          }, 1500);
                        }}
                        className="text-6xl about-link"
                      >
                        About
                      </Link>
                    </div>
                  </li>
                  <li className="overflow-hidden ">
                    <div className="reveal">
                      <Link
                        to={"#"}
                        onClick={(e) => {
                          setTimeout(() => {
                            handleClose(e, "/test");
                          }, 1500);
                        }}
                        className="text-6xl curation-link"
                      >
                        Curation
                      </Link>
                    </div>
                  </li>
                  <li className="overflow-hidden ">
                    <div className="reveal">
                      <Link
                        to={"#"}
                        onClick={(e) => {
                          setTimeout(() => {
                            handleClose(e, "/test");
                          }, 1500);
                        }}
                        className="text-6xl contact-link"
                      >
                        Contact
                      </Link>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              id="info"
              className="info h-full w-full flex flex-col items-end"
            >
              <ul>
                <li className="pb-4">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <span className="text-neutral-600">01</span>
                      <span className="text-sm">Services</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-xs">Web Design</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-xs">Art Direction</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-xs">Branding</span>
                    </div>
                  </div>
                </li>
                <li className="pb-4">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <span className="text-neutral-600">02</span>
                      <span className="text-sm">Location</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-xs">Radaville Studio</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-xs">Scheibenstrabe</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-xs">Dusseldorf, Germany</span>
                    </div>
                  </div>
                </li>
                <li className="pb-4">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <span className="text-neutral-600">03</span>
                      <span className="text-sm">Socials</span>
                    </div>
                    <div className="text-right leading-none">
                      <a href="#" className="text-xs underline">
                        Instagram
                      </a>
                    </div>
                    <div className="text-right leading-none">
                      <a href="#" className="text-xs underline">
                        Facebook
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="overlay-footer flex flex-row justify-between p-4 overflow-hidden">
            <span className="text-neutral-500 text-xs footer-text">
              A Multidisciplinary
            </span>{" "}
            <span className="text-neutral-500 text-xs footer-text">
              Design Studio
            </span>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        onClick={() => {
          dispatch(openNav());
        }}
        className="p-2 text-white cursor-pointer"
        aria-label="Toggle menu"
      >
        <MenuIcon size={24} />
      </button>

      {overlay}
    </>
  );
};
