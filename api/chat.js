export default async function handler(req, res) {
  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ reply: "API key missing in environment variables." });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a kind, non-judgmental emotional support AI that helps users process heartbreak, sadness, or loneliness. Be warm, safe, and validating."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 400
      })
    });

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content || "No reply generated.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Something went wrong talking to the AI." });
  }
}
