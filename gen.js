async function generateImage(prompt, index) {
  try {
    // === 1) Simpan teks ke revisi/scaneX.txt ===
    await fetch("http://localhost:3000/api/save-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, prompt })
    });

    // === 2) Generate gambar lewat proxy ===
    const res = await fetch("http://localhost:3000/api/gen-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, index })
    });

    if (!res.ok) throw new Error("Gagal generate image.");

    const blob = await res.blob();
    const imgURL = URL.createObjectURL(blob);

    // Replace gambar pada gallery langsung
    const galleryImg = document.querySelector(`.scane:nth-child(${index}) img`);
    if (galleryImg) galleryImg.src = imgURL;

    console.log(`✅ scane${index} updated.`);
  } catch (err) {
    console.error(err);
    alert("❌ Proses gagal.");
  }
}
