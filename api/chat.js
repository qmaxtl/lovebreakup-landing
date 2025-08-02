export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('Missing OPENROUTER_API_KEY');
    return res.status(500).json({ error: 'Missing API Key' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a supportive AI assistant who helps users dealing with heartbreak. Respond with kind, empathetic, and helpful advice.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || 'No reply generated.';
    res.status(200).json({ reply });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
