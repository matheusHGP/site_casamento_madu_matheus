"use client";

export default function Welcome({ data, onButtonClick }) {
  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Convite não encontrado</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        background: "linear-gradient(135deg, #fdf6f0, #fcefe8)",
        maxHeight: "100vh",
        height: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
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

      {/* Mensagem */}
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: "600px",
          width: "100%",
          overflowY: 'auto'
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            textAlign: "center",
            color: "#5a4634",
            lineHeight: "1.6",
          }}
        >
          {data.text}
        </p>
      </div>

      {/* Botão */}
      <div style={{ marginTop: "2rem", width: "100%", maxWidth: "400px" }}>
        <button
          style={{
            width: "100%",
            padding: "0.8rem 1.5rem",
            background: "transparent",
            border: "2px solid #d4a373",
            borderRadius: "30px",
            color: "#a6785d",
            fontWeight: "bold",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#d4a373";
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#a6785d";
          }}
          onClick={onButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ width: "20px", height: "20px", fill: "currentColor" }}
          >
            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM212.5 147.5c-7.4-4.5-16.7-4.7-24.3-.5S176 159.3 176 168v176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88zM298 256l-74 45.2V210.8L298 256z" />
          </svg>
          Ouvir mensagem personalizada
        </button>
      </div>
    </div>
  );
}
