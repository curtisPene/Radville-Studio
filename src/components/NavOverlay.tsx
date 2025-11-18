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

  useGSAP(() => {
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

    if (!isOpen && overlayRef.current) {
      console.log("closing");
    }
  }, [isOpen]);

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
          <div className="overlay-content h-full p-4 flex flex-row">
            <div className="h-full">
              <nav className="h-full">
                <ul className="flex flex-col justify-end h-full">
                  <li className="overflow-hidden ">
                    <div className="reveal">
                      <Link
                        to={"/"}
                        onClick={(e) => {
                          handleClose(e, "/");
                        }}
                        className="text-6xl"
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
                          handleClose(e, "/test");
                        }}
                        className="text-6xl"
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
                          handleClose(e, "/test");
                        }}
                        className="text-6xl"
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
                          handleClose(e, "/test");
                        }}
                        className="text-6xl"
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
