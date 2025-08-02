export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log('Prompt:', prompt);
  console.log('API Key Present:', !!apiKey);

  if (!apiKey) {
    console.error('❌ OPENROUTER_API_KEY is missing inside serverless function');
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
            content: 'You are a supportive AI assistant who helps users dealing with heartbreak.',
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
    const reply = data.choices?.[0]?.message?.content || 'No response';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('❌ Error in fetch:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
