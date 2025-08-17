"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import AudioMessage from "../components/AudioMessage";
import Welcome from "../components/Welcome";

const COLORS = {
  ORANGE: "#ff4d00",
  PINK: "#ff047d"
}

const TEXTS = {
  CASAL: 'Ser padrinhos é mais que um convite, é uma missão: caminhar conosco, rezar por nós, nos apoiar nos momentos difíceis e celebrar conosco as alegrias que Deus nos conceder. Queremos que sejam testemunhas do nosso “sim” e parte dessa família que estamos construindo.',
  HOMEM: 'Ser padrinhos é mais que um convite, é uma missão: caminhar conosco, rezar por nós, nos apoiar nos momentos difíceis e celebrar conosco as alegrias que Deus nos conceder. Queremos que sejam testemunhas do nosso “sim” e parte dessa família que estamos construindo.',
  MULHER: 'Ser padrinhos é mais que um convite, é uma missão: caminhar conosco, rezar por nós, nos apoiar nos momentos difíceis e celebrar conosco as alegrias que Deus nos conceder. Queremos que sejam testemunhas do nosso “sim” e parte dessa família que estamos construindo.',
}

// Dados fixos
const padrinhos = {
  '1ff4f497-a725-4b8e-ac86-a5e2c4892c63-amanda-gotardo': {
    nome: "Amanda",
    fotos: [
      "/1ff4f497-a725-4b8e-ac86-a5e2c4892c63-amanda-gotardo/1.jpg",
      "/1ff4f497-a725-4b8e-ac86-a5e2c4892c63-amanda-gotardo/2.jpg",
      "/1ff4f497-a725-4b8e-ac86-a5e2c4892c63-amanda-gotardo/3.jpg",
    ],
    audio: "/1ff4f497-a725-4b8e-ac86-a5e2c4892c63-amanda-gotardo/amanda_fala_matheus.m4a",
    color: COLORS.ORANGE,
    text: `Uma pessoa preocupada, carinhosa e com o coração enorme, que
    sempre cuidou e me ensinou muito. Sou muito grato pela nossa infância
    e por tudo que você fez.
    O grande dia está chegando…
    E não poderíamos imaginar esse momento tão especial sem você ao
    nosso lado.
    Agora, estamos prestes a viver o sacramento do matrimônio, um passo
    sagrado e cheio de amor, e não poderíamos imaginar esse momento
    sem você ao nosso lado.
    Ser madrinha é mais que um convite, é uma missão: caminhar conosco, rezar
    por nós, nos apoiar nos momentos difíceis e celebrar conosco as alegrias que
    Deus nos conceder. Queremos que seja testemunha do nosso “sim” e parte
    dessa família que estamos construindo.`
  },

  '2ae2aefc-2de9-4edb-93ae-cc5a7a1884f7-taisa-eduardo': {
    nome: "Taisa e Eduardo",
    fotos: [
      "/2ae2aefc-2de9-4edb-93ae-cc5a7a1884f7-taisa-eduardo/1.jpg",
      "/2ae2aefc-2de9-4edb-93ae-cc5a7a1884f7-taisa-eduardo/2.jpg",
      "/2ae2aefc-2de9-4edb-93ae-cc5a7a1884f7-taisa-eduardo/3.jpg",
    ],
    audio: "/2ae2aefc-2de9-4edb-93ae-cc5a7a1884f7-taisa-eduardo/taisa_eduardo_fala_madu.m4a",
    audio2: "/2ae2aefc-2de9-4edb-93ae-cc5a7a1884f7-taisa-eduardo/taisa_eduardo_fala_matheus.m4a",
    color: COLORS.ORANGE,
    text: `Esse momento tão sonhado está se tornando realidade… E não
    poderíamos vivê-lo sem vocês ao nosso lado.
    Mamãe, você é minha base, minha força. Cada passo que dou
    carrega um pouco de tudo que aprendi com você.
    Eduardo, sua presença trouxe leveza, cuidado e um carinho
    silencioso que abraça. Vocês fazem parte da nossa história de
    amor, e é com o coração cheio de gratidão que deixamos aqui
    um convite especial:
    Querem estar conosco no dia mais importante das nossas vidas?
    Queremos dividir sorrisos, lágrimas e memórias com quem tanto
    amamos.
    Esperamos por vocês no altar… mas, acima de tudo, esperamos
    vocês perto, como sempre estiveram.`
  },

  '8e2c8839-12ee-4d11-8005-e9290c0b1e0a-joaquim': {
    nome: "Vô Joaquim",
    fotos: [
      "/8e2c8839-12ee-4d11-8005-e9290c0b1e0a-joaquim/1.jpg",
      "/8e2c8839-12ee-4d11-8005-e9290c0b1e0a-joaquim/2.jpg",
      "/8e2c8839-12ee-4d11-8005-e9290c0b1e0a-joaquim/3.jpg",
    ],
    audio: "/8e2c8839-12ee-4d11-8005-e9290c0b1e0a-joaquim/joaquim_fala_madu.m4a",
    audio2: "/8e2c8839-12ee-4d11-8005-e9290c0b1e0a-joaquim/joaquim_fala_matheus.m4a",
    color: COLORS.PINK,
    text: `Vô,
    O dia do meu casamento está chegando, e será muito especial
    ter o senhor lá para compartilhar esse momento comigo.
    Ao longo da minha vida, o senhor sempre esteve presente de
    alguma forma, por mais simples que tenha sido, fez parte da
    nossa história e das memórias que carrego com carinho. Os
    finais de semana, as piadas, as risadas, os presentes, e até as
    as pipas que o senhor comprava ficarão em minha memória.
    Neste dia tão importante, será uma alegria olhar ao redor e ver
    o senhor entre as pessoas que torcem pela minha felicidade.
    Sua presença vai deixar essa data ainda mais marcante para
    mim.`
  },

  '9b1c4e2e-ebf6-4076-a993-b8033168f64d-aline': {
    nome: "Aline",
    fotos: [
      "/9b1c4e2e-ebf6-4076-a993-b8033168f64d-aline/1.jpg",
      "/9b1c4e2e-ebf6-4076-a993-b8033168f64d-aline/2.jpg",
      "/9b1c4e2e-ebf6-4076-a993-b8033168f64d-aline/3.jpg",
    ],
    audio: "/9b1c4e2e-ebf6-4076-a993-b8033168f64d-aline/aline_fala_madu.m4a",
    audio2: "/9b1c4e2e-ebf6-4076-a993-b8033168f64d-aline/aline_fala_matheus.m4a",
    color: COLORS.PINK,
    text: TEXTS.MULHER
  },

  '9bfe9715-d694-4043-a2a3-9a4e427f11dd-lazara': {
    nome: "Dona Lázara",
    fotos: [
      "/9bfe9715-d694-4043-a2a3-9a4e427f11dd-lazara/1.jpg",
      "/9bfe9715-d694-4043-a2a3-9a4e427f11dd-lazara/2.jpg",
      "/9bfe9715-d694-4043-a2a3-9a4e427f11dd-lazara/3.jpg",
    ],
    audio: "/9bfe9715-d694-4043-a2a3-9a4e427f11dd-lazara/lazara_fala_madu.m4a",
    audio2: "/9bfe9715-d694-4043-a2a3-9a4e427f11dd-lazara/lazara_fala_matheus.m4a",
    color: COLORS.ORANGE,
    text: `O meu casamento é um momento único e especial, e eu gostaria
    muito que você estivesse presente para viver isso comigo.
    Mesmo que a vida tenha nos aproximado de forma diferente, tenho
    um carinho enorme por você e pelo papel que ocupa na nossa
    família. Sua presença tornará o nosso dia ainda mais especial, pois
    cada pessoa querida que estará lá ajudará a compor a lembrança
    mais bonita da minha vida.
    Será uma alegria imensa compartilhar esse momento ao seu lado.`
  },

  '28da31e7-c2aa-40bc-81eb-ce5b92255b83-luciana-rauciman': {
    nome: "LÚ E RAUCIMAN",
    fotos: [
      "/28da31e7-c2aa-40bc-81eb-ce5b92255b83-luciana-rauciman/1.jpeg",
      "/28da31e7-c2aa-40bc-81eb-ce5b92255b83-luciana-rauciman/2.jpeg",
      "/28da31e7-c2aa-40bc-81eb-ce5b92255b83-luciana-rauciman/3.jpeg",
    ],
    audio: "/28da31e7-c2aa-40bc-81eb-ce5b92255b83-luciana-rauciman/lu_rauciman_fala_matheus.m4a",
    audio2: "/28da31e7-c2aa-40bc-81eb-ce5b92255b83-luciana-rauciman/lu_rauciman_fala_madu.m4a",
    color: COLORS.ORANGE,
    text: `O grande dia está chegando…
    E não poderíamos imaginar esse momento tão especial sem vocês
    ao nosso lado.
    Mãe, sua presença é parte essencial da história que me trouxe até
    aqui. Cada gesto de amor, cada conselho, cada cuidado… tudo isso
    ajudou a formar o homem que hoje se prepara para dizer “sim” ao
    amor da sua vida.
    Rauciman, sua presença foi chegando aos poucos e se tornando um
    apoio silencioso, mas muito importante. Sua forma de cuidar, de
    estar junto e de somar à nossa família faz toda a diferença.
    É com todo o carinho do mundo que deixamos aqui esse convite:
    Querem viver esse sonho com a gente?
    Estaremos lá, esperando vocês com o coração aberto, prontos para
    celebrar não só um casamento, mas tudo o que nos trouxe até aqui.
    Mãe, aceita me levar até o altar?`
  },

  '0107fa84-82f9-4d6c-aa1f-d0f0348f5a07-fernanda-marcelo': {
    nome: "TIA FER E TIO MARCELO",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.ORANGE,
    text: TEXTS.CASAL
  },

  '07168f00-b68f-4a5c-a9f6-d42a396b24ed-hugo-faggioni': {
    nome: "HUGO",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.PINK,
    text: TEXTS.HOMEM
  },

  'a7485d1c-368d-477f-8ad7-964df50642ad-lilian-jose-luis': {
    nome: "PAI E LILIAN",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.PINK,
    text: `O grande dia está se aproximando…
    E em meio a tantas emoções, uma coisa é certa: queremos muito
    dividir esse momento com vocês.
    Pai, sua presença é parte essencial da minha trajetória. Seu exemplo,
    suas palavras e até os silêncios ensinaram mais do que você pode
    imaginar.
    E agora, ao dar esse passo tão importante, é impossível não desejar
    que você esteja ao nosso lado, testemunhando esse momento.
    Lilian, sua presença também faz parte dessa história. A forma com que
    contribui com carinho e apoio faz diferença, e somos gratos por isso.
    Com todo o coração, deixamos aqui esse convite especial:
    Querem viver esse sonho com a gente?
    Será um dia único, e queremos celebrá-lo com quem nos quer bem`
  },

  'c779e1f3-4dbc-40d4-8a75-322345226ed8-luis-sonia': {
    nome: "VOVÔ LUIZ E VOVÓ SÔNIA",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.ORANGE,
    text: `Se hoje estou vivendo o sonho de me casar, é porque, desde sempre, tive
    o amor e o cuidado de vocês. Vocês foram mais que avós: foram porto
    seguro, exemplo de generosidade e força, sempre ao lado da minha mãe,
    garantindo que nada nos faltasse — nem o essencial, nem o amor.
    Nesse dia tão importante, quero que estejam comigo, não só como
    convidados, mas como parte fundamental da minha história. Cada passo
    que dou até o altar carrega um pedaço do que aprendi com vocês: que
    família é estar presente, apoiar e amar sem medida.
    Será uma honra ter vocês celebrando comigo esse novo capítulo.`
  },

  'd7c3c288-8a54-4337-b0f0-d5c532781048-genilda': {
    nome: "VÓ GE",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.PINK,
    text: `Se hoje estou vivendo o sonho de me casar, é porque, desde sempre, tive
    o amor e o cuidado de vocês. Vocês foram mais que avós: foram porto
    seguro, exemplo de generosidade e força, sempre ao lado da minha mãe,
    garantindo que nada nos faltasse — nem o essencial, nem o amor.
    Nesse dia tão importante, quero que estejam comigo, não só como
    convidados, mas como parte fundamental da minha história. Cada passo
    que dou até o altar carrega um pedaço do que aprendi com vocês: que
    família é estar presente, apoiar e amar sem medida.
    Será uma honra ter vocês celebrando comigo esse novo capítulo.`
  },

  'dd051d40-4ceb-4b22-bb02-a9564616a64d-aninha': {
    nome: "ANINHA",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.ORANGE,
    text: TEXTS.MULHER
  },

  'f9034a85-6ee4-41fe-9afa-2af6e0da782e-pedro-henrique': {
    nome: "PEDRO",
    fotos: [
      "/joao/1.jpg",
      "/joao/2.jpg",
      "/joao/3.jpg",
    ],
    audio: "/audios/joao.m4a",
    color: COLORS.ORANGE,
    text: `Meu irmão mais novo, que sempre defendi, protegi, ensinei e
    também aprendi! Você chegou para me fazer companhia e alegrar
    meus dias.
    O grande dia está chegando…
    E não poderíamos imaginar esse momento tão especial sem você
    ao nosso lado.
    Agora, estamos prestes a viver o sacramento do matrimônio, um
    passo sagrado e cheio de amor, e não poderíamos imaginar esse
    momento sem você ao nosso lado.
    Ser padrinho é mais que um convite, é uma missão: caminhar conosco,
    rezar por nós, nos apoiar nos momentos difíceis e celebrar conosco as
    alegrias que Deus nos conceder. Queremos que seja testemunha do
    nosso “sim” e parte dessa família que estamos construindo.`
  },
};

export default function Page() {
  const params = useParams();
  const { id } = params;
  const dados = padrinhos[id];
  const [showAudioMessage, setShowAudioMessage] = useState(false)

  if (!dados) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Convite não encontrado</h1>
      </div>
    );
  }

  return <div
    style={{
      // fontFamily: "'Great Vibes', cursive",
      background: dados?.color || "white",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      height: '100vh'
    }}
  >
    {showAudioMessage ? <AudioMessage data={dados} /> : <Welcome data={dados} onButtonClick={() => setShowAudioMessage(true)} />}

  </div>
}
