// /pages/api/chat.js

export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
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

    if (!data || !data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "No valid response from OpenRouter" });
    }

    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ reply: "Internal error: " + error.message });
  }
}
