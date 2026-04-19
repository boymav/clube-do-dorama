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
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/park%20sung%20hoon.jpg",
    resumo: "O vilão mais comentado do momento em Rainha das Lágrimas e astro de A Lição."
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
