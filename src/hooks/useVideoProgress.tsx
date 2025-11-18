import { useState, useEffect, type RefObject } from "react";

export const useVideoProgress = (videoRef: RefObject<HTMLVideoElement>) => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const bufferEnd = video.buffered.end(video.buffered.length - 1);
        const percent = Math.min((bufferEnd / video.duration) * 100, 100);
        setProgress(percent);
      }
    };

    const handleLoadedData = () => {
      setReady(true);
    };

    video.addEventListener("progress", updateProgress);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", updateProgress);

    return () => {
      video.removeEventListener("progress", updateProgress);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [videoRef]);
  return { progress, ready };
};

// export const useVideoProgress = (
//   videoRef: React.RefObject<HTMLVideoElement>
// ) => {
//   const [progress, setProgress] = useState(0); // 0–100% buffered
//   const [ready, setReady] = useState(false); // first frame ready

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const updateProgress = () => {
//       if (video.buffered.length > 0 && video.duration > 0) {
//         const bufferedEnd = video.buffered.end(video.buffered.length - 1);
//         const percent = Math.min((bufferedEnd / video.duration) * 100, 100);
//         setProgress(percent);
//       }
//     };

//     const handleLoadedData = () => {
//       setReady(true); // video can display the first frame
//     };

//     video.addEventListener("progress", updateProgress);
//     video.addEventListener("loadeddata", handleLoadedData);
//     video.addEventListener("loadedmetadata", updateProgress);

//     return () => {
//       video.removeEventListener("progress", updateProgress);
//       video.removeEventListener("loadeddata", handleLoadedData);
//       video.removeEventListener("loadedmetadata", updateProgress);
//     };
//   }, [videoRef]);

//   return { progress, ready };
