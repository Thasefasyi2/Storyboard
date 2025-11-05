import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const out = path.join(process.cwd(), "revisi");
if (!fs.existsSync(out)) fs.mkdirSync(out);

// ==== SIMPAN TEKS ====
app.post("/api/save-text", (req, res) => {
  const { index, prompt } = req.body;
  fs.writeFileSync(`${out}/scane${index}.txt`, prompt);
  console.log(`💾 Simpan teks → revisi/scane${index}.txt`);
  res.json({ success: true });
});

// ==== GENERATE GAMBAR ====
app.post("/api/gen-image", async (req, res) => {
  const { prompt, index } = req.body;

  const r = await fetch("<<link worker cloudflare>>/", { // LINK CLOUDFLARE DI SINI
    method: "POST",
    headers: {
      "Authorization": "Bearer << IKI GENTINENN >>", // ← GANTI TOKEN MU DEWE
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!r.ok) return res.status(500).send(await r.text());

  const buffer = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(`${out}/scane${index}.png`, buffer);
  console.log(`🖼️ Simpan gambar → revisi/scane${index}.png`);

  res.setHeader("Content-Type", "image/png");
  res.send(buffer);
});

app.listen(PORT, () => console.log(`🚀 Proxy http://localhost:${PORT}`));
