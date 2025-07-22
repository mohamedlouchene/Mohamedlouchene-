export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

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
          { role: "system", content: "أنت مساعد يدعى محمد لوشان Ai، تساعد فقط تلاميذ شهادة التعليم المتوسط الجزائرية. تجاوب بلغة عربية بسيطة ممزوجة بأسلوب شبابي." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    res.status(200).json({ result: reply || "لم أتمكن من توليد إجابة." });

  } catch (error) {
    console.error("OpenRouter error:", error);
    res.status(500).json({ message: "فشل في الاتصال بـ OpenRouter" });
  }
}
