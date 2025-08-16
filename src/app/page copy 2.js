"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Dados fixos
const padrinhos = {
  joao: {
    nome: "João e Maria",
    fotos: [
      "/fotos/joao/1.jpeg",
      "/fotos/joao/2.jpeg",
      "/fotos/joao/3.jpeg",
    ],
    audio: "/fotos/joao/audio.mp3",
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
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
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg, #e54762, #ff8002)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        textAlign: "center",
        color: "#ff6f91"
      }}>
        {dados.nome}
      </h1>

      {/* Slide de fotos com fade suave */}
      <div style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        maxHeight: '40%'
      }}>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1500} // transição lenta para clima emocional
        >
          {dados.fotos.map((foto, index) => (
            <SwiperSlide key={index}>
              <img
                src={foto}
                alt={`Foto ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Player de áudio mais moderno */}
      <div style={{
        marginTop: "2rem",
        width: "100%",
        maxWidth: "500px"
      }}>
        <audio ref={audioRef} src={dados.audio} preload="auto" />
        <div
          onClick={togglePlay}
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "1.2rem",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
          }}
        >
          <div style={{
            width: "50px",
            height: "50px",
            background: "linear-gradient(135deg, #ff6f91, #ff8c42)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            {/* {isPlaying ? "⏸" : "▶"} */}
            {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            }

          </div>

          {/* Barra de progresso */}
          <div style={{ flexGrow: 1 }}>
            <div style={{
              background: "#ffe3ec",
              height: "8px",
              borderRadius: "4px",
              overflow: "hidden",
              minWidth: '100%'
            }}>
              <div style={{
                background: "linear-gradient(90deg, #ff6f91, #ff8c42)",
                height: "100%",
                width: `${progress}%`,
                transition: "width 0.2s"
              }}></div>
            </div>

            {/* Animação de barras */}
            <div style={{
              display: "flex",
              gap: "3px",
              marginTop: "1rem",
              height: "16px",
              alignItems: "flex-end",
            }}>
              {/* <div className="audio-bars">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.1}s` }}></span>
                ))}
              </div> */}
              {[6, 12, 18, 12, 6, 6, 12, 18, 12, 6, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 18, 12, 6, 12, 5].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    background: "linear-gradient(180deg, #ff6f91, #ff8c42)",
                    height: isPlaying ? `${Math.random() * 18 + 6}px` : `${h}px`,
                    borderRadius: "2px",
                    transition: "height 0.2s",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
