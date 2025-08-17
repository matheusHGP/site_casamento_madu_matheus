"use client";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ModernAudioPlayer from "../components/Audio";


export default function AudioMessage({
  data
}) {
  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Convite não encontrado</h1>
      </div>
    );
  }

  return <div
    style={{
      // fontFamily: "'Playfair Display', serif",
      background: "linear-gradient(135deg, #fdf6f0, #fcefe8)",
      maxHeight: "100vh",
      height: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
      width: '100%'
      // height: "100vh",
    }}
  >
    {/* Nome */}
    <h1
      style={{
        fontSize: "2.5rem",
        fontWeight: "bold",
        textAlign: "center",
        color: "#a6785d",
        fontFamily: "'Great Vibes', cursive",
        marginBottom: "1.5rem",
      }}
    >
      {data.nome}
    </h1>

    {/* <div style={{
      width: "100%",
      maxWidth: "500px",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      // maxHeight: '20%'
      // height: '500px'
      height: '60%',
      maxHeight: '60%',
      marginTop: '1rem'
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
        {data.fotos.map((foto, index) => (
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
    </div> */}

    <div className="mt-[1rem] w-[100%] max-w-[500px] h-[20%] max-h-[20%]">
      <ModernAudioPlayer src={data.audio} />
    </div>

    <div className="mt-[1rem] w-[100%] max-w-[500px] h-[20%] max-h-[20%]">
      <ModernAudioPlayer src={data.audio2} />
    </div>
  </div>
}
