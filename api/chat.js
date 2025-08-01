export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const apiKey = process.env.GROQ_API_KEY; // Securely loaded from Vercel env variable

  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing. Set GROQ_API_KEY in environment variables.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are LoveBreakup AI, a healing-focused emotional support companion. Be empathetic, kind, deeply understanding, never judgmental. Help users feel heard, supported, and stronger, without calling yourself a therapist.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || 'Sorry, I couldn’t generate a reply.';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
