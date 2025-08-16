"use client";
import { useRef } from "react";
import styles from "./typing.module.css";

export default function Welcome({ data }) {
  const audioRef = useRef(null);
  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Convite não encontrado</h1>
      </div>
    );
  }

  const chars = data.text?.length ?? 0;
  const durationSec = Math.min(10, Math.max(2, chars * 0.05)); // 2s–10s

  return (
    <div style={{
      fontFamily: "'Biryani', sans-serif",
      // background: "#ff4d00",
      background: "#ff4d00",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
      height: "100vh",
    }}>
      <div className="w-full">
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", height: "10%", color: "white" }}>
          {data.nome}
        </h1>
      </div>

      {/* <p
        className={styles.typingSteps}
        style={{
          "--chars": `${chars}`,
          "--steps": `${chars}`,
          "--duration": `${chars * 0.09}s`, // 0.2 segundos por caractere
        }}
      >
        {data.text}
      </p> */}
      <div className="bg-white p-[10px] w-[100%] rounded-md">
        <p className="text-xl text-center text-black">{data.text}</p>
      </div>

      <div className="mt-5 w-[100%]">
        <button className="
          w-full pt-3 p-3 bg-white rounded-md text-center font-bold relative
          hover:bg-gray-500 
          active:bg-gray-500 
          focus:bg-gray-500 
          duration-500
        ">
          <div className="w-5 h-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM212.5 147.5c-7.4-4.5-16.7-4.7-24.3-.5S176 159.3 176 168l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88zM298 256l-74 45.2 0-90.4 74 45.2z" /></svg>
          </div>
          Ouvir a mensagem personalizada
        </button>
      </div>
    </div>
  );
}
