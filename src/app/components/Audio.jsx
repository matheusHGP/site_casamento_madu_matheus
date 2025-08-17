import { useRef, useState, useEffect, useLayoutEffect } from "react";

export default function ModernAudioPlayer({ src, filename }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useLayoutEffect(() => {
    const audio = audioRef.current;

    setDuration(audio.duration)

    const updateProgress = () => setProgress(audio.currentTime);

    const handleEnded = () => {
      setIsPlaying(false); // marca como parado
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const downloadAudio = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = filename || "audio.m4a";
    link.click();
  };

  const getAudioDurantion = () => {
    return duration
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#fff", // fundo branco
      padding: "1rem",
      borderRadius: "1rem",
      color: "#333",
      width: "100%",
      gap: "1rem",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)" // sombra suave
    }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
        <button
          onClick={togglePlay}
          style={{
            // background: "#ff4d00",
            background: "#a6785d",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            alignItems: "center",
            alignContent: 'center',
            justifyContent: "center",
            display: "flex"
          }}
        >
          {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>}
        </button>

        <input
          type="range"
          min="0"
          max={audioRef?.current?.duration || 0}
          value={progress}
          onInput={handleProgressChange}
          style={{
            flex: 1,
            cursor: "pointer",
            // accentColor: "#ff4d00",
            accentColor: "#a6785d",
            columnRuleColor: 'red'
          }}
        />

        <div
          style={{
            width: 40, heigth: 40,
            cursor: 'pointer',
            // color: '#ff4d00'
            color: "#a6785d",
          }}
          onClick={downloadAudio}
        >
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z" /></svg>
        </div>
      </div>

      <div style={{ fontSize: "1rem", fontWeight: 'bold' }}>
        {Math.floor(progress / 60)}:{("0" + Math.floor(progress % 60) || 0).slice(-2)} / {Math.floor(getAudioDurantion() / 60) || 0}:{("0" + Math.floor((getAudioDurantion() % 60) || 0)).slice(-2)}
      </div>
    </div>
  );
}
