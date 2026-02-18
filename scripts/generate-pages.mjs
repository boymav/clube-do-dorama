import fs from "fs";
import path from "path";
import { doramas } from "../doramas.js";

const SITE = "https://planetadorama.com.br";

function slugify(str) {
  return String(str)
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

function pickGenre(tags = []) {
  // pega 1 gênero “principal” só pra Schema não ficar bagunçado
  const known = ["romance", "comedia", "fantasia", "intenso", "triste", "alegre"];
  const t = tags.find(x => known.includes(String(x).toLowerCase()));
  return t ? t[0].toUpperCase() + t.slice(1) : "Drama";
}

function parseRating(nota) {
  // Ex: "9.2/10 – MyDramaList"
  const m = String(nota || "").match(/(\d+(?:\.\d+)?)[ ]*\/[ ]*10/);
  return m ? m[1] : null;
}

const outDir = path.join(process.cwd(), "doramas");
fs.mkdirSync(outDir, { recursive: true });

const pages = [];

for (const d of doramas) {
  if (!d?.nome) continue;

  const slug = slugify(d.nome);
  const url = `${SITE}/doramas/${slug}.html`;

  const title = `${d.nome} – Sinopse, Elenco e Onde Assistir | Planeta Dorama`;

  // description curta: usa descricao se tiver, senão corta do resumo
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
    .map(t => `<a class="tag" href="${SITE}/listas.html#${slugify(t)}">${escapeHtml(t)}</a>`)
    .join(" ");

  // Links internos: 6 recomendações simples (mesmas tags)
  const recs = doramas
    .filter(x => x?.nome && x.nome !== d.nome)
    .map(x => {
      const score = (x.tags || []).reduce((acc, t) => acc + ((d.tags || []).includes(t) ? 1 : 0), 0);
      return { x, score };
    })
    .sort((a,b) => b.score - a.score)
    .slice(0, 6)
    .map(({x}) => {
      const s = slugify(x.nome);
      return `<li><a href="${SITE}/doramas/${s}.html">${escapeHtml(x.nome)}</a></li>`;
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

  <style>
    body{font-family:Arial,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;background:#0b1020;color:#eaf0ff}
    header,main,footer{max-width:980px;margin:0 auto;padding:18px}
    a{color:#9bd0ff;text-decoration:none}
    a:hover{text-decoration:underline}
    .card{background:#121a33;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px}
    .grid{display:grid;grid-template-columns:320px 1fr;gap:18px}
    img{max-width:100%;border-radius:12px}
    h1{margin:8px 0 10px}
    h2{margin:18px 0 8px}
    .tags{margin-top:10px}
    .tag{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(155,208,255,.12);border:1px solid rgba(155,208,255,.25);margin:0 8px 8px 0;font-size:13px}
    .note{opacity:.9}
    .small{font-size:14px;opacity:.9}
    ul{margin:8px 0 0 18px}
    @media (max-width:820px){.grid{grid-template-columns:1fr}}
  </style>

  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <header>
    <a href="${SITE}/">← Voltar para Planeta Dorama</a>
  </header>

  <main class="card">
    <div class="grid">
      <div>
        ${poster ? `<img src="${escapeHtml(poster)}" alt="Pôster do dorama ${escapeHtml(d.nome)}">` : ""}
        <div class="tags">${tagsList}</div>
        ${d.nota ? `<p class="note"><strong>Nota:</strong> ${escapeHtml(d.nota)}</p>` : ""}
      </div>

      <div>
        <h1>${escapeHtml(d.nome)}</h1>

        ${d.descricao ? `<h2>Sinopse</h2><p>${descricaoHtml}</p>` : ""}

        ${d.resumo ? `<h2>Resumo</h2><p>${resumoHtml}</p>` : ""}

        ${trailer && String(trailer).includes("youtube.com/embed")
          ? `<h2>Trailer</h2>
             <div style="position:relative;padding-top:56.25%;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08)">
               <iframe src="${escapeHtml(trailer)}" title="Trailer ${escapeHtml(d.nome)}"
                 style="position:absolute;inset:0;width:100%;height:100%;border:0" allowfullscreen></iframe>
             </div>`
          : ""
        }

        <h2>Recomendados</h2>
        <p class="small">Se você gostou deste, veja também:</p>
        <ul>${recs}</ul>
      </div>
    </div>
  </main>

  <footer class="small" style="text-align:center;opacity:.8">
    © ${new Date().getFullYear()} Planeta Dorama
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html, "utf-8");
  pages.push({ slug, url, lastmod: new Date().toISOString().split("T")[0] });
}

/* Página índice dos doramas (boa para linkagem interna) */
const indexHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Doramas | Planeta Dorama</title>
  <meta name="description" content="Lista de doramas do Planeta Dorama com páginas individuais: sinopse, resumo e trailer.">
  <link rel="canonical" href="${SITE}/doramas/">
  <meta name="robots" content="index,follow">
  <style>
    body{font-family:Arial,system-ui;margin:0;background:#0b1020;color:#eaf0ff}
    header,main{max-width:980px;margin:0 auto;padding:18px}
    .card{background:#121a33;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px}
    input{width:100%;padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:#0b1020;color:#eaf0ff}
    ul{margin:12px 0 0 18px}
    a{color:#9bd0ff;text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <header>
    <a href="${SITE}/">← Voltar para o início</a>
    <h1>Doramas</h1>
  </header>

  <main class="card">
    <input id="q" placeholder="Pesquisar dorama..." />
    <ul id="list">
      ${pages
        .sort((a,b)=>a.slug.localeCompare(b.slug))
        .map(p => `<li><a href="${SITE}/doramas/${p.slug}.html">${p.slug.replace(/-/g," ")}</a></li>`)
        .join("")}
    </ul>
  </main>

  <script>
    const q = document.getElementById('q');
    const list = document.getElementById('list');
    const items = Array.from(list.querySelectorAll('li'));
    q.addEventListener('input', () => {
      const v = q.value.toLowerCase().trim();
      for (const li of items) {
        li.style.display = li.textContent.toLowerCase().includes(v) ? '' : 'none';
      }
    });
  </script>
</body>
</html>`;
fs.writeFileSync(path.join(outDir, "index.html"), indexHtml, "utf-8");

/* sitemap.xml */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${new Date().toISOString().split("T")[0]}</lastmod></url>
  <url><loc>${SITE}/doramas/</loc><lastmod>${new Date().toISOString().split("T")[0]}</lastmod></url>
  ${pages
    .map(p => `<url><loc>${p.url}</loc><lastmod>${p.lastmod}</lastmod></url>`)
    .join("\n  ")}
</urlset>`;
fs.writeFileSync(path.join(process.cwd(), "sitemap.xml"), sitemap, "utf-8");

console.log(`✅ Geradas ${pages.length} páginas em /doramas e sitemap.xml atualizado.`);
