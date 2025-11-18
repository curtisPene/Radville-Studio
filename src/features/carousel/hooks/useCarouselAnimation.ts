import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import type { ImageProps, UseCarouselAnimationProps } from "../types";

gsap.registerPlugin(Observer);

const SPACING = 80;
const NUM_SLIDES = 6;

export const useCarouselAnimation = ({
  containerRef,
  cardRefs,
  images,
  onSlideChange,
}: UseCarouselAnimationProps) => {
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;
    let startImageRefIndex = 0;
    const imageQueue: ImageProps[] = [];
    const NUM_IMAGES = images.length;

    const cards = cardRefs
      .map((ref) => ref.current)
      .filter((card): card is HTMLDivElement => card !== null);

    const setImageQueue = () => {
      imageQueue.length = 0;
      for (let i = 0; i < NUM_SLIDES; i++) {
        if (i === 0) {
          imageQueue.push(
            images[(startImageRefIndex - 1 + NUM_IMAGES) % NUM_IMAGES]
          );
        } else if (i === NUM_SLIDES - 1) {
          imageQueue.push(
            images[(startImageRefIndex + NUM_SLIDES - 2) % NUM_IMAGES]
          );
        } else {
          imageQueue.push(images[(startImageRefIndex + i - 1) % NUM_IMAGES]);
        }
      }
    };

    setImageQueue();

    const setImages = () => {
      console.log(imageQueue);
      cards.forEach((card, index) => {
        const image = imageQueue[index];
        card.querySelector("img")?.setAttribute("src", image.image);
        card.querySelector("img")?.setAttribute("alt", image.altText);
        card.querySelector(".card-title")!.textContent = image.altText;
      });
    };

    const setSlides = () => {
      setImages();
      cards.forEach((card, index) => {
        gsap.set(card, {
          opacity: index === 0 || index === 5 ? 0 : 1,
          z: index * -SPACING + SPACING,
          zIndex: cards.length - index,
        });
      });
    };

    setSlides();

    let isMounted = true;

    const animateBackgroundColor = (direction: "forward" | "back") => {
      const currentCardImage =
        direction === "forward" ? imageQueue[2] : imageQueue[0];

      const bgColor = currentCardImage.color;
      gsap.to(container, {
        backgroundColor: bgColor,
        duration: 0.25,
        ease: "sine.out",
      });
    };

    const animateFirstSlideTitle = () => {
      const title = cards[1].querySelector(".card-title");
      if (!title) return;

      document.fonts.ready.then(() => {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: "50%",
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "sine.out",
          }
        );
      });
    };

    document.fonts.ready.then(() => {
      if (isMounted) {
        animateFirstSlideTitle();
      }
    });

    type AnimationDirection = "forward" | "back";
    const animationQueue: AnimationDirection[] = [];
    let isAnimating = false;

    const moveSlides = (direction: AnimationDirection) => {
      const isForward = direction === "forward";

      const timeline = gsap.timeline({
        paused: true,
        onStart: () => {
          animateBackgroundColor(direction);
          if (isForward) {
            startImageRefIndex += 1;
            startImageRefIndex %= NUM_IMAGES;
          } else {
            startImageRefIndex -= 1;
            if (startImageRefIndex < 0) startImageRefIndex += NUM_IMAGES;
          }
          onSlideChange(startImageRefIndex + 1);
        },
        onComplete: () => {
          setImageQueue();
          setSlides();
          animateFirstSlideTitle();
          isAnimating = false;
          processNextAnimation();
        },
      });

      cards.forEach((card, index) => {
        const zValue = isForward
          ? index * -SPACING + 2 * SPACING
          : index * -SPACING;

        const opacityValue = isForward
          ? index === 0 || index === 1
            ? 0
            : 1
          : index === 4 || index === 5
          ? 0
          : 1;

        timeline.to(
          card,
          {
            z: zValue,
            opacity: opacityValue,
            duration: 0.5,
            ease: "sine.out",
          },
          0
        );
      });

      return timeline;
    };

    const processNextAnimation = () => {
      if (isAnimating || animationQueue.length === 0) return;

      const direction = animationQueue.shift() as AnimationDirection;
      isAnimating = true;

      moveSlides(direction).play();
    };

    let canScroll = true;
    const COOL_OFF = 250;
    const observer = Observer.create({
      target: container,
      type: "wheel, touch, pointer",
      onChange: (self) => {
        if (!canScroll) return;

        // Only process when user finishes dragging/swiping

        const direction = self.deltaY > 0 ? "forward" : "back";

        animationQueue.push(direction);
        processNextAnimation();

        canScroll = false;
        setTimeout(() => {
          canScroll = true;
          self.enable();
        }, COOL_OFF);
      },
      preventDefault: true,
    });

    return () => {
      isMounted = false;
      observer.kill();
    };
  }, [containerRef, cardRefs, images]);
};
