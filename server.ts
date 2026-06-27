import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini Client with lazy initialization
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// -----------------------------------------------------------------------------
// API ENDPOINTS
// -----------------------------------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Endpoint: Spanish Keyboard Literature AI Assistant (PhD Advisor)
app.post("/api/music/chat", async (req, res) => {
  try {
    const ai = getAiClient();
    const { messages, complexity } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Determine model
    let modelName = "gemini-3.5-flash"; // default general
    if (complexity === "fast") {
      modelName = "gemini-3.1-flash-lite";
    } else if (complexity === "complex") {
      modelName = "gemini-3.1-pro-preview";
    }

    const systemInstruction = `
      You are an elite, highly esteemed musicologist, concert pianist, and PhD-level researcher specializing in Spanish Keyboard Literature.
      Your specialization is the solo piano music, performances, and composer aspects of "Alicia de Larrocha" (as a pianist-composer), alongside major Spanish masters like Isaac Albéniz (Iberia), Enrique Granados (Goyescas), and Joaquín Turina.
      
      You are speaking on behalf of, or as an advisory system for, Dr. Sangmi Kim (Pianist & Musicologist, PhD graduate from Melbourne Conservatorium, University of Melbourne).
      Be extremely knowledgeable, sophisticated, precise, and inspiring. Use professional music theory terminology (e.g., mention specific Spanish rhythmic patterns like polo, sequidilla, flamenco modes, or post-romantic keyboard textures).
      Always keep your responses elegant, informative, helpful, and beautifully written.
    `;

    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ message: response.text });
  } catch (error: any) {
    console.error("Musicology Chat backend error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with the Spanish Keyboard AI Advisor." });
  }
});


// -----------------------------------------------------------------------------
// VITE OR STATIC FILE ROUTING
// -----------------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pianist Portfolio server running on http://localhost:${PORT}`);
  });
}

startServer();
