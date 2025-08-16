"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Dados fixos
const padrinhos = {
  joao: {
    nome: "João e Maria",
    fotos: [
      "/fotos/joao/foto1.jpeg",
      "/fotos/joao/foto2.jpeg",
      "/fotos/joao/foto3.jpeg",
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
        background: "#fffaf5",
        minHeight: "100vh", // garante altura total da tela
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        textAlign: "center"
      }}>
        {dados.nome}
      </h1>

      {/* Slide de fotos */}
      <div style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        flexGrow: 1 // para ocupar espaço disponível
      }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
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

      {/* Player de áudio */}
      <div style={{
        marginTop: "1.5rem",
        width: "100%",
        maxWidth: "500px"
      }}>
        <audio ref={audioRef} src={dados.audio} preload="auto" />
        <div
          onClick={togglePlay}
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
          }}
        >
          <div style={{
            width: "30px",
            height: "30px",
            background: "#ff8c42",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {isPlaying ? "⏸️" : "▶️"}
          </div>

          {/* Barra de progresso */}
          <div style={{ flexGrow: 1 }}>
            <div style={{
              background: "#eee",
              height: "6px",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <div style={{
                background: "#ff8c42",
                height: "100%",
                width: `${progress}%`,
                transition: "width 0.2s"
              }}></div>
            </div>

            {/* Animação de barras */}
            <div style={{
              display: "flex",
              gap: "2px",
              marginTop: "6px",
              height: "12px",
              alignItems: "flex-end"
            }}>
              {[4, 8, 12, 8, 4].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    background: "#ff8c42",
                    height: isPlaying ? `${Math.random() * 12 + 4}px` : `${h}px`,
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
