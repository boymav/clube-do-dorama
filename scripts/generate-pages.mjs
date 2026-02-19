import fs from "fs";
import path from "path";
import { doramas } from "../doramas-data.js";

const SITE = "https://planetadorama.com.br";
const OUT_DIR = path.join(process.cwd(), "doramas");
const FAV_KEY = "pd_favoritos_v1"; // mesmo padrão do seu dorama.html antigo

function slugify(str) {
  return String(str || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, "").trim();
}

function parseRating(nota) {
  const m = String(nota || "").match(/[\d]+([.,]\d+)?/);
  if (!m) return null;
  return m[0].replace(",", ".");
}

function estrelas(nota) {
  const rv = parseRating(nota);
  if (!rv) return "";
  const n = Math.max(0, Math.min(10, Number(rv)));
  const n5 = n / 2;
  const cheio = Math.floor(n5);
  const meio = n5 % 1 >= 0.5 ? 1 : 0;
  const vazio = 5 - cheio - meio;
  return "★".repeat(cheio) + (meio ? "☆" : "") + "✩".repeat(vazio);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const today = new Date().toISOString().split("T")[0];
const pages = [];

for (const d of doramas) {
  if (!d?.nome) continue;

  const slug = slugify(d.nome);
  const url = `${SITE}/doramas/${slug}.html`;

  const title = `${d.nome} – Sinopse, Resumo e Trailer | Planeta Dorama`;
  const baseDesc = stripHtml(d.descricao || d.resumo || "");
  const description =
    (baseDesc.length > 155 ? baseDesc.slice(0, 155).trim() + "…" : baseDesc) ||
    `Veja sinopse, resumo e trailer de ${d.nome} no Planeta Dorama.`;

  const poster = d.imagem || "";
  const trailer = d.trailer || "";
  const nota = d.nota || "";

  // Recomendados por tags (12)
  const recs = (doramas || [])
    .filter(x => x?.nome && x.nome !== d.nome)
    .map(x => {
      const score = (x.tags || []).reduce(
        (acc, t) => acc + ((d.tags || []).includes(t) ? 1 : 0),
        0
      );
      return { x, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ x }) => {
      const s = slugify(x.nome);
      return `
        <a class="rec-card" href="${SITE}/doramas/${s}.html" title="${esc(x.nome)}">
          <img src="${esc(x.imagem || "")}" alt="${esc(x.nome)}" loading="lazy">
          <div class="rec-title">${esc(x.nome)}</div>
        </a>
      `;
    })
    .join("");

  const tagsList = (d.tags || []).slice(0, 10).map(t => `<span class="tag">${esc(t)}</span>`).join("");

  const sinopseHtml = esc(d.descricao || "").replace(/\n/g, "<br>");
  const resumoHtml = esc(d.resumo || "").replace(/\n/g, "<br>");

  const schema = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: d.nome,
    url,
    image: poster || undefined,
    aggregateRating: parseRating(nota)
      ? { "@type": "AggregateRating", ratingValue: parseRating(nota), ratingCount: "100" }
      : undefined
  };

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index,follow">

  <meta property="og:title" content="${esc(d.nome)} | Planeta Dorama">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  ${poster ? `<meta property="og:image" content="${esc(poster)}">` : ""}

  <script type="application/ld+json">${JSON.stringify(schema)}</script>

  <style>
    :root{
      --bg:#0b0b0f;
      --card:#14141b;
      --muted:rgba(255,255,255,.72);
      --muted2:rgba(255,255,255,.55);
      --accent:#e50914;
      --radius:18px;
    }
    *{box-sizing:border-box}
    body{margin:0;font-family:Arial,system-ui;background:var(--bg);color:#fff}
    a{color:inherit}

    .topbar{max-width:1100px;margin:0 auto;padding:14px 14px 0}
    .back{display:inline-flex;gap:8px;align-items:center;text-decoration:none;font-weight:bold;color:rgba(255,255,255,.85)}
    .back:hover{color:#fff}

    /* HERO Netflix */
    .hero{
      position:relative;max-width:1100px;margin:12px auto 0;border-radius:24px;overflow:hidden;
      background:#111;box-shadow:0 18px 60px rgba(0,0,0,.55);
    }
    .hero::before{
      content:"";position:absolute;inset:0;background-image:var(--bgimg);background-size:cover;background-position:center;
      filter:blur(28px) saturate(1.2);transform:scale(1.2);opacity:.55;
    }
    .hero::after{
      content:"";position:absolute;inset:0;
      background:linear-gradient(90deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.72) 45%,rgba(0,0,0,.30) 100%);
    }

    .hero-inner{
      position:relative;z-index:1;padding:18px;display:grid;grid-template-columns: 210px 1fr;
      gap:16px;align-items:center;
    }

    /* POSTER MAIOR */
    .poster{
      width:210px;aspect-ratio:2/3;border-radius:var(--radius);overflow:hidden;
      background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.10);
      box-shadow:0 16px 45px rgba(0,0,0,.55);
    }
    .poster img{width:100%;height:100%;object-fit:cover;display:block}

    h1{margin:0 0 10px;font-size:26px;line-height:1.15}
    .meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}
    .pill{
      display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;
      background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.12);font-size:13px;
    }
    .stars{letter-spacing:1px;opacity:.9}
    .tags{margin-top:6px}
    .tag{
      display:inline-block;padding:7px 10px;border-radius:999px;background:rgba(229,9,20,.18);
      border:1px solid rgba(229,9,20,.32);margin:8px 8px 0 0;font-size:12px;color:#fff;opacity:.95;
    }
    .desc{margin:10px 0 0;color:var(--muted);line-height:1.55;font-size:14px;max-width:70ch}

    .actions{margin-top:14px;display:flex;flex-wrap:wrap;gap:10px}
    .btn{
      display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 14px;border-radius:14px;
      text-decoration:none;font-weight:bold;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);color:#fff;
      cursor:pointer;
    }
    .btn:hover{background:rgba(255,255,255,.12)}
    .btn-primary{background:var(--accent);border-color:transparent}
    .btn-primary:hover{filter:brightness(1.05)}

    .btn-fav.on{background:rgba(229,9,20,.25);border-color:rgba(229,9,20,.45)}
    .btn-fav.on:hover{background:rgba(229,9,20,.32)}

    /* Conteúdo */
    .wrap{max-width:1100px;margin:16px auto 60px;padding:0 14px}
    .section{
      background:var(--card);border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:16px;
      box-shadow:0 10px 30px rgba(0,0,0,.30);
    }
    .h2{margin:0 0 10px;font-size:18px}
    .text{color:var(--muted);line-height:1.8;font-size:15px;margin:0}

    /* Trailer responsivo */
    .trailer{margin-top:14px}
    .video{
      position:relative;width:100%;padding-top:56.25%;
      border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10);
      box-shadow:0 18px 45px rgba(0,0,0,.45);background:#000;
    }
    .video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
    .hint{margin-top:10px;color:var(--muted2);font-size:13px;line-height:1.4}

    /* Recomendados estilo Netflix */
    .row{margin-top:16px}
    .row-head{display:flex;align-items:end;justify-content:space-between;gap:10px;margin-bottom:10px}
    .row-head small{color:var(--muted2)}
    .rec-scroller{
      display:flex;gap:12px;overflow:auto;padding-bottom:6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
    }
    .rec-card{
      flex:0 0 150px;scroll-snap-align:start;text-decoration:none;border-radius:14px;overflow:hidden;background:#111;
      border:1px solid rgba(255,255,255,.08);box-shadow:0 10px 24px rgba(0,0,0,.35);transition:transform .18s ease;
    }
    .rec-card:hover{transform:translateY(-6px)}
    .rec-card img{width:100%;height:205px;object-fit:cover;display:block}
    .rec-title{padding:8px 10px;font-size:12px;color:rgba(255,255,255,.88);line-height:1.25;min-height:40px}

    footer{max-width:1100px;margin:40px auto 26px;padding:0 14px;color:rgba(255,255,255,.45);text-align:center;font-size:13px}

    /* Desktop */
    @media (min-width: 860px){
      .hero-inner{padding:22px;grid-template-columns: 320px 1fr;gap:22px;}
      .poster{width:320px;}
      h1{font-size:38px;}
      .section{padding:20px;}
      .rec-card{flex-basis: 200px;}
      .rec-card img{height:270px;}
      .rec-title{font-size:13px;}
    }
  </style>
</head>

<body>
  <div class="topbar">
    <a class="back" href="${SITE}/">← Voltar para Planeta Dorama</a>
  </div>

  <section class="hero" style="--bgimg:url('${esc(poster)}')">
    <div class="hero-inner">
      <div class="poster">
        ${poster ? `<img src="${esc(poster)}" alt="Pôster do dorama ${esc(d.nome)}" loading="lazy">` : ""}
      </div>

      <div>
        <h1 id="nome">${esc(d.nome)}</h1>

        <div class="meta">
          ${nota ? `<span class="pill">⭐ ${esc(nota)}</span>` : ""}
          ${nota ? `<span class="pill"><span class="stars">${estrelas(nota)}</span></span>` : ""}
        </div>

        <div class="tags">${tagsList}</div>

        ${d.descricao ? `<p class="desc">${sinopseHtml}</p>` : ""}

        <div class="actions">
          ${trailer && String(trailer).includes("youtube.com/embed")
            ? `<a class="btn btn-primary" href="#trailer">▶ Trailer</a>`
            : ""}
          <button class="btn btn-fav" id="btnFav" type="button">🤍 Favoritar</button>
          <button class="btn" id="btnShare" type="button">🔗 Compartilhar</button>
          <a class="btn" href="${SITE}/todos.html">📚 Todos os doramas</a>
        </div>
      </div>
    </div>
  </section>

  <div class="wrap">
    <section class="section">
      ${d.resumo ? `<h2 class="h2">Resumo</h2><p class="text">${resumoHtml}</p>` : ""}

      ${(trailer && String(trailer).includes("youtube.com/embed")) ? `
        <div class="trailer" id="trailer">
          <h2 class="h2">Trailer</h2>
          <div class="video">
            <iframe src="${esc(trailer)}" title="Trailer ${esc(d.nome)}" allowfullscreen></iframe>
          </div>
          <div class="hint">Se aparecer “vídeo indisponível”, é o próprio YouTube bloqueando o trailer.</div>
        </div>
      ` : ""}
    </section>

    <section class="row">
      <div class="row-head">
        <h2 class="h2" style="margin:0;">Recomendados</h2>
        <small>arraste para o lado →</small>
      </div>
      <div class="rec-scroller">
        ${recs}
      </div>
    </section>
  </div>

  <footer>© ${new Date().getFullYear()} Planeta Dorama</footer>

  <script>
    const FAV_KEY = ${JSON.stringify(FAV_KEY)};
    const nome = ${JSON.stringify(d.nome)};
    const pageUrl = ${JSON.stringify(url)};

    function getFav(){
      try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
      catch(e){ return []; }
    }
    function setFav(list){
      localStorage.setItem(FAV_KEY, JSON.stringify(list));
    }
    function isFav(){
      return getFav().includes(nome);
    }
    function toggleFav(){
      let list = getFav();
      if(list.includes(nome)){
        list = list.filter(n => n !== nome);
      }else{
        list.push(nome);
      }
      setFav(list);
      return list.includes(nome);
    }
    function updateFavBtn(){
      const btn = document.getElementById("btnFav");
      if(!btn) return;
      const on = isFav();
      btn.textContent = on ? "💜 Favoritado" : "🤍 Favoritar";
      btn.classList.toggle("on", on);
    }

    document.getElementById("btnFav")?.addEventListener("click", () => {
      toggleFav();
      updateFavBtn();
    });

    document.getElementById("btnShare")?.addEventListener("click", async () => {
      const text = "🎬 Dorama: " + nome + "\\nVeja aqui: " + pageUrl;
      if (navigator.share) {
        try { await navigator.share({ title: nome, text, url: pageUrl }); } catch(e){}
      } else {
        try {
          await navigator.clipboard.writeText(pageUrl);
          alert("Link copiado! ✅");
        } catch(e) {
          const wa = "https://wa.me/?text=" + encodeURIComponent(text);
          window.open(wa, "_blank");
        }
      }
    });

    updateFavBtn();
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.html`), html, "utf-8");
  pages.push({ slug, url, lastmod: today, nome: d.nome });
}

// sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${SITE}/doramas/</loc><lastmod>${today}</lastmod></url>
  ${pages.map(p => `<url><loc>${p.url}</loc><lastmod>${p.lastmod}</lastmod></url>`).join("\n  ")}
</urlset>`;
fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemap, "utf-8");

// robots.txt
fs.writeFileSync(path.join(process.cwd(), "robots.txt"), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`, "utf-8");

console.log(`✅ OK: ${pages.length} páginas Netflix-style geradas com Favoritar + Compartilhar`);
