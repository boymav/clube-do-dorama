const atores = [
  {
    nome: "IU (Lee Ji-eun)",
    link: "atores/iu.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/i.u.webp",
    resumo: "A 'Irmãzinha da Nação' e estrela de sucessos como Hotel Del Luna e My Mister."
  },
  {
    nome: "Kim Soo-hyun",
    link: "atores/kim-soo-hyun.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/kim%20soo%20hyun.jpg",
    resumo: "O ator mais bem pago da Coreia e protagonista do fenômeno Rainha das Lágrimas."
  },
  {
    nome: "Kim Ji-won",
    link: "atores/kim-ji-won.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/Kim%20Ji%20Won.jpg",
    resumo: "Estrela versátil de Rainha das Lágrimas, Descendentes do Sol e Meu Diário para a Liberdade."
  }
];

// Função para renderizar os atores na página atores.html
function carregarAtores() {
    const container = document.getElementById('grid-atores');
    if (!container) return;

    container.innerHTML = atores.map(ator => `
        <a href="${ator.link}" class="card-ator">
            <div class="badge">Perfil Completo</div>
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

// Inicia a função quando o documento carregar
document.addEventListener('DOMContentLoaded', carregarAtores);
