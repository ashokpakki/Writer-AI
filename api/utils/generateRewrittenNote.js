const axios = require("axios");

const generateRewrittenNote = async (fullContext, newInput) => {
  // const prompt = `
  // You are an AI writing assistant. Your job is to improve anime story snippets **without changing the meaning**.

  // You are NOT allowed to:
  // - Add new characters
  // - Change names, relationships, settings, or timeline
  // - Invent events or flashbacks
  // - Replace the author's intent or tone

  // You must ONLY rewrite the NEW INPUT to flow better with the existing story.
  // Keep it short, emotional, and natural.

  // Previous story context:
  // "${fullContext}"

  // New input:
  // "${newInput}"

  // Your output should be ONLY the rewritten version of the new input, well-polished but faithful to the original.
  // `;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "mistral-saba-24b",
        messages: [
          {
            role: "system",
            content: `You are an AI writing assistant. 
        Your only job is to rewrite the NEW INPUT so it flows naturally with the existing anime story.
        
        🛑 You must NOT:
        - Invent new characters
        - Change names, relationships, or timeline
        - Add backstory or setting
        - Make it longer than necessary
        
        ✅ You MUST:
        - Keep the tone emotional and natural
        - Keep context consistent with the previous story
        - Only return the rewritten version of the new input
        
        Do not summarize, do not generate an entire scene, just clean up the new input.`,
          },
          {
            role: "user",
            content: `
        Here is the previous story context:
        "${fullContext}"
        
        Here is the new input:
        "${newInput}"
        
        Rewrite ONLY the new input so that it fits smoothly into the existing story.
        Return only the polished version of the new input.`,
          },
        ],

        temperature: 0.7,
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
