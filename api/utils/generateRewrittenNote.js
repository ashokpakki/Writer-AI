const axios = require("axios");

const generateRewrittenNote = async (fullContext, newInput) => {
  const prompt = `
    You are a helpful assistant that rewrites a anime story in a well -written way.
    Here is the story so far which is a mix of different arcs, characters, events and author opinions:
    "${fullContext}"

    Here is the new input that needs to be added to the story:
    "${newInput}"

    Please rewrite ONLY the new input to make it fit naturally and emotionally into the existing story.Do NOT change setting, timeline, or invent new characters or background. Just polish the new input so it flows well with the previous story. Keep it short and in the same tone. Return ONLY the rewritten version of the new input suitable for an anime narrative.
    `;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "mistral-saba-24b",
        messages: [
          {
            role: "system",
            content:
              "you are a helpful assistant that rewrites the raw anime story in a well-written way.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.75,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "content-type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Groq AI error:", err.response?.data || err.message);
    throw new Error("Failed to generate rewritten note");
  }
};

module.exports = generateRewrittenNote;
