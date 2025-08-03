export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log("📩 Prompt received:", prompt);
  console.log("🔑 API Key Loaded:", apiKey ? "✅ Yes" : "❌ No");

  if (!apiKey) {
    return res.status(500).json({ error: "API key not found" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a supportive AI assistant who helps users dealing with heartbreak. Respond with kind, empathetic, and helpful advice.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    console.log("🧠 OpenRouter Response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No reply generated", data });
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("❌ API Error:", error);
    return res.status(500).json({ error: "Something went wrong", details: error.message });
  }
}
