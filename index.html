import fs from "fs";
import path from "path";
import { doramas } from "../doramas-data.js";

const SITE = "https://planetadorama.com.br";

function slugify(str) {
  return String(str || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, "").trim();
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseRating(nota) {
  const m = String(nota || "").match(/(\d+(?:\.\d+)?)[ ]*\/[ ]*10/);
  return m ? m[1] : null;
}

function pickGenre(tags = []) {
  const known = ["romance", "comedia", "fantasia", "intenso", "triste", "alegre"];
  const t = tags.find(x => known.includes(String(x).toLowerCase()));
  return t ? t[0].toUpperCase() + t.slice(1) : "Drama";
}

function estrelas(nota) {
  const m = String(nota || "").match(/[\d]+([.,]\d+)?/);
  if (!m) return "";
  const n = parseFloat(m[0].replace(",", ".")); // 0-10
  const n5 = n / 2; // 0-5
  const cheio = Math.floor(n5);
  const meio = (n5 % 1) >= 0.5 ? 1 : 0;
  const vazio = 5 - cheio - meio;
  return "★".repeat(cheio) + (meio ? "☆" : "") + "✩".repeat(vazio);
}

const outDir = path.join(process.cwd(), "doramas");
fs.mkdirSync(outDir, { recursive: true });

const pages = [];
const today = new Date().toISOString().split("T")[0];

for (const d of doramas) {
  if (!d?.nome) continue;

  const slug = slugify(d.nome);
  const url = `${SITE}/doramas/${slug}.html`;

  const title = `${d.nome} – Sinopse, Resumo e Trailer | Planeta Dorama`;
  const baseDesc = stripHtml(d.descricao || d.resumo || "");
  const description =
    (baseDesc.length > 155 ? baseDesc.slice(0, 155).trim() + "…" : baseDesc) ||
    `Veja sinopse, resumo, trailer e informações sobre ${d.nome} no Planeta Dorama.`;

  const ratingValue = parseRating(d.nota);
  const genre = pickGenre(d.tags || []);
  const poster = d.imagem || "";
  const trailer = d.trailer || "";

  const resumoHtml = escapeHtml(d.resumo || "").replace(/\n/g, "<br>");
  const descricaoHtml = escapeHtml(d.descricao || "").replace(/\n/g, "<br>");

  const tagsList = (d.tags || [])
    .slice(0, 8)
    .map(t => `<span class="chip">${escapeHtml(t)}</span>`)
    .join("");

  // Recomendados: prioriza quem compartilha mais tags, com foto
  const recs = doramas
    .filter(x => x?.nome && x.nome !== d.nome)
    .map(x => {
      const score = (x.tags || []).reduce((acc, t) => acc + ((d.tags || []).includes(t) ? 1 : 0), 0);
      return { x, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ x }) => {
      const s = slugify(x.nome);
      const img = x.imagem || "";
      return `
        <div class="card-mini" onclick="window.location.href='${SITE}/doramas/${s}.html'">
          ${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(x.nome)}" loading="lazy">` : ""}
          <div class="info">
            <div class="nome-mini">${escapeHtml(x.nome)}</div>
            <div class="nota-mini">⭐ ${escapeHtml(x.nota || "")}</div>
          </div>
        </div>
      `;
    })
    .join("");

  const schema = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: d.nome,
    genre,
    url,
    image: poster || undefined,
    aggregateRating: ratingValue
      ? { "@type": "AggregateRating", ratingValue, ratingCount: "100" }
      : undefined
  };

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index,follow">

  <meta property="og:title" content="${escapeHtml(d.nome)} | Planeta Dorama">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  ${poster ? `<meta property="og:image" content="${escapeHtml(poster)}">` : ""}

  <script type="application/ld+json">${JSON.stringify(schema)}</script>

  <style>
    :root{
      --rosa:#ff7eb3;
      --roxo:#b983ff;
      --texto:#333;
      --bg1:#ffe6f2;
      --bg2:#fff0f7;
    }
    body{
      margin:0;
      font-family: Arial, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: linear-gradient(135deg, var(--bg1), var(--bg2));
      color: var(--texto);
    }
    header{
      text-align:center;
      padding:18px;
      background:linear-gradient(90deg,var(--rosa),var(--roxo));
      color:white;
    }
    header a{ color:white; text-decoration:none; font-weight:bold; }
    .hero{
      position: relative;
      max-width: 1100px;
      margin: 22px auto 0;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0,0,0,0.14);
    }
    .hero::before{
      content:"";
      position:absolute;
      inset:0;
      background-image: var(--hero-bg);
      background-size: cover;
      background-position: center;
      filter: blur(22px);
      transform: scale(1.15);
    }
    .hero::after{
      content:"";
      position:absolute;
      inset:0;
      background: linear-gradient(90deg,
        rgba(20,0,20,0.75),
        rgba(20,0,20,0.40),
        rgba(20,0,20,0.12)
      );
    }
    .hero-inner{
      position: relative;
      z-index:1;
      padding:26px;
      display:grid;
      grid-template-columns: 360px 1fr;
      gap:22px;
      align-items:center;
      color:#fff;
    }
    @media(max-width:900px){
      .hero{ margin:16px 14px 0; }
      .hero-inner{ grid-template-columns:1fr; text-align:center; }
    }
    .poster{
      max-width:360px;
      aspect-ratio:2/3;
      border-radius:18px;
      overflow:hidden;
      background:rgba(255,255,255,0.08);
      box-shadow:0 12px 30px rgba(0,0,0,0.28);
      margin:auto;
    }
    .poster img{ width:100%; height:100%; object-fit:contain; background: rgba(255,255,255,0.06); }
    .hero-title{ margin:0 0 10px; font-size:34px; }
    @media(max-width:900px){ .hero-title{ font-size:26px; } }

    .chip{
      display:inline-block;
      padding:8px 12px;
      border-radius:999px;
      background:rgba(255,255,255,0.15);
      margin:6px 6px 0 0;
      font-size:13px;
      font-weight:bold;
    }
    .stars{ font-size:18px; letter-spacing:2px; }

    .conteudo{
      max-width:980px;
      margin:18px auto 50px;
      background:white;
      padding:28px;
      border-radius:20px;
      box-shadow:0 10px 25px rgba(0,0,0,0.10);
    }
    @media(max-width:900px){
      .conteudo{ margin:16px 14px; padding:20px; }
    }
    .sec-title{ color:#d63384; margin:0 0 10px; }
    .texto{ font-size:18px; line-height:1.8; }

    .resumo-trailer{
      display:grid;
      grid-template-columns:1.05fr 0.95fr;
      gap:18px;
      align-items:start;
    }
    @media(max-width:900px){
      .resumo-trailer{ grid-template-columns:1fr; }
    }

    /* Trailer mais bonito */
    .trailer-box h3{
      font-size:16px;
      color:#d63384;
      margin:0 0 8px;
    }
    .video-wrap{
      aspect-ratio:16/9;
      border-radius:16px;
      overflow:hidden;
      border:2px solid rgba(255,126,179,0.65);
      box-shadow:0 16px 38px rgba(0,0,0,0.18);
      background:#000;
    }
    .video-wrap iframe{ width:100%; height:100%; border:0; }

    /* Recomendados com fotos */
    .relacionados{ margin-top:28px; }
    .cards-mini{ display:flex; flex-wrap:wrap; gap:14px; }
    .card-mini{
      width:190px;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 6px 18px rgba(0,0,0,0.10);
      cursor:pointer;
      background:#fff;
      transition: transform .2s ease, box-shadow .2s ease;
    }
    .card-mini:hover{
      transform: translateY(-6px);
      box-shadow:0 12px 26px rgba(0,0,0,0.14);
    }
    .card-mini img{ width:100%; height:230px; object-fit:cover; display:block; }
    .card-mini .info{ padding:10px; }
    .nome-mini{ font-weight:bold; margin-bottom:6px; }
    .nota-mini{ font-size:13px; opacity:.85; color:#7a1b55; }

    footer{
      background:linear-gradient(90deg,var(--rosa),var(--roxo));
      color:white;
      text-align:center;
      padding:14px;
    }
  </style>
</head>

<body>

<header>
  <h1 style="margin:0;">🌍 Planeta Dorama</h1>
  <a href="${SITE}/">⬅ Voltar</a>
</header>

<section class="hero" style="--hero-bg:url('${escapeHtml(poster)}')">
  <div class="hero-inner">
    <div class="poster">
      ${poster ? `<img src="${escapeHtml(poster)}" alt="Pôster do dorama ${escapeHtml(d.nome)}" loading="lazy">` : ""}
    </div>

    <div>
      <h2 class="hero-title">${escapeHtml(d.nome)}</h2>
      <div>
        ${d.nota ? `<span class="chip">⭐ ${escapeHtml(d.nota)}</span>` : ""}
        ${d.nota ? `<span class="chip"><span class="stars">${estrelas(d.nota)}</span></span>` : ""}
        ${tagsList}
      </div>
    </div>
  </div>
</section>

<section class="conteudo">
  ${d.descricao ? `<h2 class="sec-title">Sinopse</h2><p class="texto">${descricaoHtml}</p>` : ""}
  ${d.resumo ? `<h2 class="sec-title" style="margin-top:18px;">Resumo</h2><p class="texto">${resumoHtml}</p>` : ""}

  ${(trailer && String(trailer).includes("youtube.com/embed")) ? `
    <div class="resumo-trailer" style="margin-top:22px;">
      <div></div>
      <div class="trailer-box" id="secTrailer">
        <h3>🎬 Trailer</h3>
        <div class="video-wrap">
          <iframe src="${escapeHtml(trailer)}" title="Trailer ${escapeHtml(d.nome)}" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  ` : ""}

  <div class="relacionados">
    <h2 class="sec-title">Recomendados</h2>
    <div class="cards-mini">
      ${recs || "<p>Em breve mais recomendações ✨</p>"}
    </div>
  </div>
</section>

<footer>
  © ${new Date().getFullYear()} Planeta Dorama
</footer>

</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, "utf-8");
  pages.push({ slug, url, lastmod: today, nome: d.nome });
}

// /doramas/index.html (lista com busca)
const indexHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Todos os Doramas | Planeta Dorama</title>
  <meta name="description" content="Lista de doramas do Planeta Dorama com páginas individuais: sinopse, resumo e trailer.">
  <link rel="canonical" href="${SITE}/doramas/">
  <meta name="robots" content="index,follow">
  <style>
    body{font-family:Arial,system-ui;margin:0;background:#fff0f6;color:#333}
    header,main{max-width:980px;margin:0 auto;padding:18px}
    .card{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:14px;padding:18px;box-shadow:0 8px 18px rgba(0,0,0,.08)}
    input{width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(0,0,0,.15);background:#fff;color:#333}
    ul{margin:12px 0 0 18px}
    a{color:#b4005a;text-decoration:none;font-weight:bold}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <header>
    <a href="${SITE}/">← Voltar para o início</a>
    <h1>Todos os Doramas</h1>
  </header>

  <main class="card">
    <input id="q" placeholder="Pesquisar dorama..." />
    <ul id="list">
      ${pages
        .sort((a,b)=>a.nome.localeCompare(b.nome))
        .map(p => `<li><a href="${SITE}/doramas/${p.slug}.html">${escapeHtml(p.nome)}</a></li>`)
        .join("")}
    </ul>
  </main>

  <script>
    const q = document.getElementById('q');
    const list = document.getElementById('list');
    const items = Array.from(list.querySelectorAll('li'));
    q.addEventListener('input', () => {
      const v = q.value.toLowerCase().trim();
      for (const li of items) li.style.display = li.textContent.toLowerCase().includes(v) ? '' : 'none';
    });
  </script>
</body>
</html>`;
fs.writeFileSync(path.join(outDir, "index.html"), indexHtml, "utf-8");

// sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${SITE}/doramas/</loc><lastmod>${today}</lastmod></url>
  ${pages.map(p => `<url><loc>${p.url}</loc><lastmod>${p.lastmod}</lastmod></url>`).join("\n  ")}
</urlset>`;
fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemap, "utf-8");

// robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
fs.writeFileSync(path.join(process.cwd(), "robots.txt"), robots, "utf-8");

console.log(\`✅ Geradas \${pages.length} páginas bonitas em /doramas + sitemap.xml + robots.txt\`);
