const atores = [
  {
    nome: "IU (Lee Ji-eun)",
    link: "atores/iu.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/i.u.webp",
    resumo: "A maior solista da Coreia e estrela de Hotel Del Luna."
  },
  {
    nome: "Kim Soo-hyun",
    link: "atores/kim-soo-hyun.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/kim%20soo%20hyun.jpg",
    resumo: "O ator mais bem pago da Coreia e astro de Queen of Tears."
  },
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
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/kim%20ji%20won.jpg",
    resumo: "A estrela de Rainha das Lágrimas e Descendentes do Sol."
  }
];
];

// Função para renderizar os atores na página
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
            </div>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', carregarAtores);
