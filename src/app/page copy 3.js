"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Ícone Play (branco)
function PlayIcon({ width = 50, height = 50 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      role="img"
      aria-label="Play"
      fill="#fff"
    >
      <path d="M5 3.868v16.264C5 21.44 6.29 22.26 7.27 21.546l12.18-8.632A1 1 0 0 0 20 11.92V3.868C20 3.148 18.71 2.328 17.73 3.042L5.55 11.674A1 1 0 0 0 5 12.58V3.868z" />
    </svg>
  );
}

// Ícone Pause (branco)
function PauseIcon({ width = 50, height = 50 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      role="img"
      aria-label="Pause"
      fill="#fff"
    >
      <rect x="5" y="4" width="4" height="16" rx="1" />
      <rect x="15" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

// Dados fixos
const padrinhos = {
  joao: {
    nome: "João e Maria",
    fotos: [
      "/fotos/joao/1.jpg",
      "/fotos/joao/2.jpg",
      "/fotos/joao/3.jpg",
    ],
    audio: "/audios/joao.mp3",
  },
  ana: {
    nome: "Ana e Carlos",
    fotos: [
      "/fotos/ana/1.jpg",
      "/fotos/ana/2.jpg",
      "/fotos/ana/3.jpg",
    ],
    audio: "/audios/ana.mp3",
  },
};

export default function Page() {
  const params = useParams();
  const { id } = params;
  const dados = padrinhos['joao'];
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Atualiza barra de progresso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  if (!dados) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Convite não encontrado</h1>
      </div>
    );
  }

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <style>{`
        .player-container {
          background: #fff;
          border-radius: 16px;
          padding: 1.2rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          max-width: 500px;
          width: 100%;
        }
        .progress-bar {
          background: #ffe3ec;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          flex-grow: 1;
        }
        .progress-filled {
          background: linear-gradient(90deg, #ff6f91, #ff8c42);
          height: 100%;
          width: 0%;
          transition: width 0.2s;
        }
        .audio-bars {
          display: flex;
          align-items: flex-end;
          height: 20px;
          gap: 3px;
          margin-top: 6px;
        }
        .audio-bars span {
          flex: 1;
          background: linear-gradient(180deg, #ff6f91, #ff8c42);
          border-radius: 2px;
          animation-name: sound;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .audio-bars span:nth-child(odd) {
          animation-duration: 0.9s;
        }
        .audio-bars span:nth-child(even) {
          animation-duration: 1.3s;
        }
        @keyframes sound {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          background: "linear-gradient(180deg, #fff5f8, #fffaf5)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
            color: "#ff6f91",
          }}
        >
          {dados.nome}
        </h1>

        {/* Slide de fotos com fade */}
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            flexGrow: 1,
          }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1500}
          >
            {dados.fotos.map((foto, index) => (
              <SwiperSlide key={index}>
                <img
                  src={foto}
                  alt={`Foto ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Player de áudio */}
        <div style={{ marginTop: "2rem", width: "100%", maxWidth: "500px" }}>
          <audio ref={audioRef} src={dados.audio} preload="auto" />

          <div className="player-container" onClick={togglePlay} role="button" tabIndex={0} aria-pressed={isPlaying} aria-label={isPlaying ? "Pausar áudio" : "Tocar áudio"}>
            {/* Ícone Play/Pause */}
            {isPlaying ? <PauseIcon /> : <PlayIcon />}

            {/* Barra de progresso + animação */}
            <div style={{ flexGrow: 1 }}>
              <div className="progress-bar">
                <div className="progress-filled" style={{ width: `${progress}%` }}></div>
              </div>

              <div className="audio-bars">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
