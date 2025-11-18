# Carousel Implementation Context

## Current Status
Working on building an infinite scroll 3D card stack carousel using GSAP and ScrollTrigger.

## Project Setup
- **Framework**: React + TypeScript
- **Animation Library**: GSAP with ScrollTrigger plugin
- **Images**: 3 images in `src/assets/images/` (casa-paz.avif, hagis-oldtown.avif, hagis-downtown.avif)
- **Current file**: `src/features/carousel/Carousel.tsx`

## Carousel Architecture

### How it Works
1. **5 card DOM elements total** - 4 visible + 1 hidden at back
2. **Scroll tracking** - Custom wheel listener updates `scrollProgress.current`
3. **ScrollTrigger** - Detects scroll changes via `ScrollTrigger.update()` and fires animations
4. **Card cycling** - As front card animates out, hidden card becomes visible with next image

### Card Stack Setup
- Cards use `translate3d()` to create 3D perspective illusion
- Z-index stacking to layer cards front-to-back
- Each card shifted deeper into the z-axis as it moves back in the stack
- Hidden card is the 5th card at the very back

### Animation Sequence
1. Front card fades out and translates forward (away from viewer)
2. Remaining visible cards move up to fill positions
3. Hidden card (5th) becomes visible at the back
4. Exited card becomes the new hidden card
5. Hidden card's image updates to next in sequence
6. Loop back to start with images 1-3

## Files Created/Modified
- ✅ `src/features/carousel/Carousel.tsx` - Fixed TypeScript errors, added scroll infrastructure
- 🔄 `src/features/carousel/Card.tsx` - **NEEDS TO BE CREATED** - Card component with transform styles
- 🔄 Carousel component needs:
  - State for card images (queue of images)
  - 5 Card component instances
  - GSAP timeline for animations
  - ScrollTrigger integration with timeline scrub

## Next Steps (In Order)
1. Create `Card.tsx` component
   - Props: image (string), index (number), isVisible (boolean)
   - Use translate3d for perspective
   - Opacity and scale based on position in stack

2. Update `Carousel.tsx` component
   - Import 3 images
   - Create state to manage image queue (cycling 1-2-3, repeat)
   - Render 5 Card instances with proper image assignment
   - Create GSAP timeline for card animations:
     - Timeline should handle full cycle of one card exit and next card reveal
     - Use `translate3d()` for 3D movement
     - Animate opacity fade
     - Duration: ~2-3 seconds for smooth effect

3. Wire ScrollTrigger
   - Connect timeline to scroll progress with `scrub: 1`
   - Calculate scroll distance per card cycle (suggest 1000-1500px)
   - Call `ScrollTrigger.update()` on wheel to link scroll to animations

4. Implement card rotation logic
   - Detect when scroll threshold crossed (every X pixels)
   - Update hidden card's image to next in sequence
   - Reset scroll or handle continuous cycling

5. Test with all 3 images looping infinitely

## Key Code Snippets

### Current Scroll Infrastructure (Carousel.tsx line 14-29)
```javascript
ScrollTrigger.scrollerProxy(containerRef.current, {
  scrollTop(value) {
    if (arguments.length && typeof value === "number") {
      scrollProgress.current = value;
    }
    return scrollProgress.current;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});
```

### Wheel Listener (line 31-38)
- Listens for wheel events (ScrollTrigger doesn't)
- Updates `scrollProgress.current` based on `deltaY`
- Calls `ScrollTrigger.update()` to notify of changes

## Design Decisions Made
- **Scroll distance per card**: To be decided (suggest 1000-1500px)
- **Card scale/depth changes**: Each card 5% smaller, depth increases by 8px per position
- **4 visible + 1 hidden card ratio**: Chosen to allow smooth reveal without visible gaps
- **Infinite loop**: Images cycle 1→2→3→1→2→3...

## Potential Issues to Watch
1. ~~`scrollProgress.x` bug on line 19~~ ✅ FIXED - changed to `scrollProgress.current`
2. ~~`null` parameter to `scrollerProxy()` on line 45~~ ✅ FIXED - changed to `undefined`
3. Need to ensure GSAP timeline updates are performance-optimized for smooth scroll
4. May need to throttle card rotation logic to specific scroll thresholds
