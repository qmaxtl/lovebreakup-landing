export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const prompt = req.body.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.MODEL_NAME;

  if (!apiKey || !model) {
    return res.status(500).json({ reply: 'Missing API key or model name' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a supportive AI companion who helps users dealing with heartbreak.',
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

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return res.status(500).json({ reply: 'AI model error: ' + (data?.error?.message || 'Unknown error') });
    }

    const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ reply: 'Error: Failed to connect to AI.' });
  }
}
