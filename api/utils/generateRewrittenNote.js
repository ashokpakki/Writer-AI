const axios = require("axios");

const grammarClean = async (rawInput) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `You are a strict grammar teacher and a helpful assistant to an author.
Correct spelling, grammar and punctuations.
Make the story flow better while preserving the original meaning.
Never add or remove facts, names, or dialogues.
Return just the cleaned text in the same language.`,
          },
          {
            role: "user",
            content: rawInput,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "content-type": "application/json",
        },
        timeout: 60000,
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Groq error:", err.response?.data || err.message);
    throw new Error("Grammar‑clean failed");
  }
};

module.exports = grammarClean;
