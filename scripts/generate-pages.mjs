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

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function estrelas(nota) {
  const m = String(nota || "").match(/[\d]+([.,]\d+)?/);
  if (!m) return "";
  const n = parseFloat(m[0].replace(",", "."));
  const n5 = n / 2;
  const cheio = Math.floor(n5);
  const meio = (n5 % 1) >= 0.5 ? 1 : 0;
  const vazio = 5 - cheio - meio;
  return "★".repeat(cheio) + (meio ? "☆" : "") + "✩".repeat(vazio);
}

const outDir = path.join(process.cwd(), "doramas");
fs.mkdirSync(outDir, { recursive: true });

for (const d of doramas) {
  if (!d?.nome) continue;

  const slug = slugify(d.nome);
  const poster = d.imagem || "";
  const trailer = d.trailer || "";

  const recs = doramas
    .filter(x => x?.nome && x.nome !== d.nome)
    .slice(0, 8)
    .map(x => {
      const s = slugify(x.nome);
      return `
        <a class="rec-card" href="${SITE}/doramas/${s}.html">
          <img src="${escapeHtml(x.imagem || "")}" alt="${escapeHtml(x.nome)}">
          <div class="rec-info">
            <div class="rec-nome">${escapeHtml(x.nome)}</div>
            <div class="rec-nota">⭐ ${escapeHtml(x.nota || "")}</div>
          </div>
        </a>
      `;
    })
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(d.nome)} | Planeta Dorama</title>

<style>
body{
  margin:0;
  font-family: Arial, sans-serif;
  background: radial-gradient(circle at top, #1e1e2f, #0f0f1a);
  color:white;
}

header{
  padding:20px;
  text-align:center;
}

header a{
  color:#ff7eb3;
  text-decoration:none;
  font-weight:bold;
}

.container{
  max-width:1100px;
  margin:30px auto;
  padding:0 20px;
}

.hero{
  display:flex;
  gap:40px;
  align-items:center;
}

.poster img{
  width:320px;
  border-radius:20px;
  box-shadow:0 20px 40px rgba(0,0,0,0.6);
}

.hero-info h1{
  margin:0 0 15px;
  font-size:38px;
}

.hero-info p{
  font-size:18px;
  line-height:1.6;
  opacity:0.9;
}

.tags span{
  display:inline-block;
  background:#ff7eb3;
  color:white;
  padding:6px 12px;
  border-radius:20px;
  margin:6px 6px 0 0;
  font-size:13px;
}

.trailer{
  margin-top:40px;
}

.video-wrap{
  margin-top:10px;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 25px 50px rgba(0,0,0,0.7);
}

.video-wrap iframe{
  width:100%;
  height:500px;
  border:0;
}

.recomendados{
  margin-top:50px;
}

.rec-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:20px;
}

.rec-card{
  background:#1b1b2a;
  border-radius:16px;
  overflow:hidden;
  text-decoration:none;
  color:white;
  transition:transform .2s ease;
}

.rec-card:hover{
  transform:translateY(-8px);
}

.rec-card img{
  width:100%;
  height:240px;
  object-fit:cover;
}

.rec-info{
  padding:10px;
}

.rec-nome{
  font-weight:bold;
}

.rec-nota{
  font-size:13px;
  opacity:0.8;
}

footer{
  margin-top:60px;
  text-align:center;
  padding:20px;
  opacity:0.6;
}
</style>
</head>

<body>

<header>
  <a href="${SITE}/">← Voltar para Planeta Dorama</a>
</header>

<div class="container">

  <div class="hero">
    <div class="poster">
      <img src="${escapeHtml(poster)}" alt="${escapeHtml(d.nome)}">
    </div>

    <div class="hero-info">
      <h1>${escapeHtml(d.nome)}</h1>
      <div class="tags">
        ${(d.tags || []).map(t=>`<span>${escapeHtml(t)}</span>`).join("")}
      </div>
      <p><strong>Nota:</strong> ${escapeHtml(d.nota || "")} ${estrelas(d.nota)}</p>
      <p>${escapeHtml(d.descricao || "")}</p>
    </div>
  </div>

  ${trailer ? `
  <div class="trailer">
    <h2>Trailer</h2>
    <div class="video-wrap">
      <iframe src="${escapeHtml(trailer)}" allowfullscreen></iframe>
    </div>
  </div>
  ` : ""}

  <div class="recomendados">
    <h2>Recomendados</h2>
    <div class="rec-grid">
      ${recs}
    </div>
  </div>

</div>

<footer>
© ${new Date().getFullYear()} Planeta Dorama
</footer>

</body>
</html>
`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
}

console.log("🔥 Páginas redesenhadas com visual premium!");
