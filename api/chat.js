export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const apiKey = process.env.GROQ_API_KEY; // Set this in your environment

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Or use "llama3-70b-8192" or any Groq-supported model
        messages: [
          {
            role: "system",
            content: "You are LoveBreakup AI – a deeply empathetic, non-therapeutic emotional support assistant that listens and helps people going through heartbreak, gently and thoughtfully, with deep human-like conversation.",
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
    
    // Safety check
    const reply = data?.choices?.[0]?.message?.content;

    res.status(200).json({ reply: reply || "I'm here for you, always." });

  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ reply: "Something went wrong. I'm here for you, no matter what." });
  }
}
