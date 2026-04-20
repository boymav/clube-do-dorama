const atores = [
  {
    nome: "IU (Lee Ji-eun)",
    link: "atores/iu.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/i.u.webp",
    resumo: "A rainha da Coreia e estrela de Hotel Del Luna."
  },
  {
    nome: "Kim Soo-hyun",
    link: "atores/kim-soo-hyun.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/kim%20soo%20hyun.jpg",
    resumo: "O astro de Rainha das Lágrimas e ator mais bem pago."
  },
  {
    nome: "Kim Ji-won",
    link: "atores/kim-ji-won.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/Kim%20Ji%20Won.jpg",
    resumo: "A estrela de Rainha das Lágrimas e Descendentes do Sol."
  },
  {
    nome: "Park Sung-hoon",
    link: "atores/park-sung-hoon.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/park-sung-woon.jpg",
    resumo: "O vilão mais comentado do momento em Rainha das Lágrimas e astro de A Lição."
  },
  {
    nome: "Song Joong-ki",
    link: "atores/song-joong-ki.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/Song-Joong-Ki.jpeg",
    resumo: "Astro global de Vincenzo e Descendentes do Sol, com participação épica em Rainha das Lágrimas."
  },
  {
  nome: "Byeon Woo-seok",
  link: "atores/byeon-woo-seok.html",
  imagem: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/Byeon%20Woo%20seok.jpg",
  biografia: "Byeon Woo-seok é um ator e modelo sul-coreano que conquistou o estrelato global com seus papéis em doramas de romance e fantasia. Ganhou grande destaque em 'Record of Youth' e se tornou um dos nomes mais buscados da atualidade após o sucesso massivo de 'Lovely Runner' e 'Perfect Crown' em 2026.",
  nascimento: "31 de outubro de 1991",
  trabalhos: ["Lovely Runner", "Perfect Crown", "Record of Youth", "Strong Girl Nam-soon", "Moonshine", "20th Century Girl"]
}
];

function carregarAtores() {
    const container = document.getElementById('grid-atores');
    if (!container) return;

    container.innerHTML = atores.map(ator => `
        <a href="${ator.link}" class="card-ator">
            <div class="foto-wrap">
                <img src="${ator.foto}" alt="${ator.nome}">
            </div>
            <div class="info-ator">
                <h3>${ator.nome}</h3>
                <p>${ator.resumo}</p>
                <div class="btn-perfil">Ver Biografia →</div>
            </div>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', carregarAtores);
