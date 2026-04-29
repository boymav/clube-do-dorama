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
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/Byeon%20Woo%20seok.jpg",
    resumo: "O fenômeno de Lovely Runner e protagonista de Perfect Crown."
  },
  {
    nome: "Kim Seon-ho",
    link: "atores/kim-seon-ho.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/Kim%20Seon%20ho.webp",
    resumo: "O astro de Hometown Cha-Cha-Cha e O Amor Pode Ser Traduzido."
  },
  {
    nome: "Go Youn-jung",
    link: "atores/go-youn-jung.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/go%20youn%20jung.jpg",
    resumo: "A estrela em ascensão de Moving e Alquimia das Almas."
  },
  {
    nome: "Cha Eun-woo",
    link: "atores/cha-eun-woo.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/cha-eun-woo.jpg",
    resumo: "O 'Gênio Visual' da Coreia e estrela de Beleza Verdadeira."
  },
  {
    nome: "Han So-hee",
    link: "atores/han-so-hee.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/han%20so%20hee.jpg",
    resumo: "A estrela de My Name e A Criatura de Gyeongseong."
  },
  {
    nome: "Lee Do-hyun",
    link: "atores/lee-do-hyun.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/lee-do-hyun.jpg",
    resumo: "O astro de The Glory e protagonista do sucesso Exhuma."
  },
  {
    nome: "Park Eun-bin",
    link: "atores/park-eun-bin.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/park-eun-bin.jfif",
    resumo: "A premiada estrela de Uma Advogada Extraordinária e Diva à Deriva."
  },
  {
    nome: "Song Kang",
    link: "atores/song-kang.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/song-kang.webp",
    resumo: "O 'Filho da Netflix' e protagonista de Meu Demônio e Sweet Home."
  },
  {
    nome: "Lee Joon-gi",
    link: "atores/lee-joon-gi.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/lee-joon-gi.webp",
    resumo: "O 'Rei dos Sageuks' e mestre da ação em Moon Lovers e Flower of Evil."
  },
  {
    nome: "Lee Min-ho",
    link: "atores/lee-min-ho.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/lee%20min%20ho.jpg",
    resumo: "O 'Rei do Hallyu' e protagonista de Boys Over Flowers e Pachinko."
  },
  {
    nome: "Park Shin-hye",
    link: "atores/park-shin-hye.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/park-shin-hye.jfif",
    resumo: "A eterna Rainha dos Doramas e estrela de The Heirs e Doctors."
  },
  {
    nome: "Bae Suzy",
    link: "atores/bae-suzy.html",
    foto: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/suzy-bae.jfif",
    resumo: "Conhecida como o 'Primeiro Amor da Nação', é a estrela de Apostando Alto e Anna."
  },
  {
    nome: "Park Seo-joon",
    url: "atores/park-seo-joon.html",
    imagem: "https://raw.githubusercontent.com/boymav/clube-do-dorama/refs/heads/main/atores/park%20seoo%20jon.jpg"
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
