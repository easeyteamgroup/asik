import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint untuk chat
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Kamu adalah chatbot bernama NisaaTalk yang ramah dan menenangkan.",
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "⚠️ Terjadi kesalahan pada server." });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});
