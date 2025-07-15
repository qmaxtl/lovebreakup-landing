export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const prompt = req.body.prompt;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are an empathetic assistant helping people who feel sad or heartbroken. Respond with kind and gentle words.\n\nUser: ${prompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 250
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_DEROGATORY', threshold: 3 },
          { category: 'HARM_CATEGORY_TOXICITY', threshold: 3 },
          { category: 'HARM_CATEGORY_VIOLENCE', threshold: 3 },
          { category: 'HARM_CATEGORY_SEXUAL', threshold: 3 }
        ]
      })
    });

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini returned an empty response. Try rephrasing your input.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
