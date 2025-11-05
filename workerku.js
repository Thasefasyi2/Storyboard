export default {
    async fetch(request, env) {
        const API_KEY = env.API_KEY;
        const url = new URL(request.url);
        const auth = request.headers.get("Authorization");

        // 🔐 Simple API key check
        if (auth !== `Bearer ${API_KEY}`) {
            return json({ error: "Unauthorized" }, 401);
        }

        // 🚫 Only allow POST requests to /
        if (request.method !== "POST" || url.pathname !== "/") {
            return json({ error: "Not allowed" }, 405);
        }

        try {
            const { prompt } = await request.json();
            if (!prompt) return json({ error: "Prompt is required" }, 400);

            // Choose model from the following list:
            // "@cf/blackforestlabs/ux-1-schnell"
            // "@cf/bytedance/stable-diffusion-xl-lightning"
            // "@cf/lykon/dreamshaper-8-lcm"
            // "@cf/runwayml/stable-diffusion-v1-5-img2img"
            // "@cf/runwayml/stable-diffusion-v1-5-inpainting"
            // "@cf/stabilityai/stable-diffusion-xl-base-1.0"

            // 🧠 Generate image (default landscape)
            const image = await env.AI.run(
                "@cf/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    prompt,
                    width: 1280,  // landscape width
                    height: 720   // landscape height
                }
            );

            return new Response(image, {
                headers: { "Content-Type": "image/png" }, // ✅ Ganti ke PNG
            });

        } catch (err) {
            return json({ error: "Failed to generate image", details: err.message }, 500);
        }
    },
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
