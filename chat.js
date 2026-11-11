export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const GROQ_API_KEY = "Gsk_mcA6OVqS50wJw4g5lgvqWGdyb3FYlpYRmmjDxLUFRXYgpmecqR2C";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are PikuMind, an advanced, highly intelligent AI assistant created by Byzid. CRITICAL INSTRUCTION: Always detect the language of the user's input and reply in that exact same language (e.g. if the user writes in Bengali, reply in fluent Bengali; if the user writes in English, reply in English). Answer directly using your own reasoning and intelligence."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
