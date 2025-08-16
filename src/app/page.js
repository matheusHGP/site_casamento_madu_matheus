"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ModernAudioPlayer from "./components/Audio";

// Dados fixos
const padrinhos = {
  '0107fa84-82f9-4d6c-aa1f-d0f0348f5a07-fernanda-marcelo': {
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
  const dados = padrinhos[id];
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
    <>
      <style></style>
      <div
        style={{
          fontFamily: "'Biryani', sans-serif",
          // background: "linear-gradient(180deg, #e54762, #ff8002)",
          background: "#ff4d00",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
            // color: "#ff6f91"
          }}>
            {dados.nome}
          </h1>
        </div>

        {/* Slide de fotos com fade suave */}
        <div style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          // maxHeight: '20%'
          // height: '500px'
          height: '60vh'
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
        <div className="mt-5 w-[100%] max-w-[500px]">
          <ModernAudioPlayer src={dados.audio} />
        </div>

      </div>
    </>
  );
}
