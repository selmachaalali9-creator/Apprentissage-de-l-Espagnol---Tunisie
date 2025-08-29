// This file acts as a Vercel Serverless Function.

// FIX: Resolve Express type conflicts by separating the express value and type imports.
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from "@google/genai";

// Vercel handles environment variables automatically.
// The API_KEY should be set in the Vercel project settings.

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
if (!process.env.API_KEY) {
    console.error("FATAL ERROR: API_KEY environment variable not set.");
    throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Schema for the exercise data
const exerciseSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "Un titre bref et descriptif pour l'exercice en français."
        },
        questions: {
            type: Type.ARRAY,
            description: "Une liste de questions pour l'exercice.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: {
                        type: Type.STRING,
                        description: "Un identifiant unique pour la question, par ex. 'q1'."
                    },
                    type: {
                        type: Type.STRING,
                        description: "Le type de question, soit 'mcq' (choix multiple) ou 'fill-in-the-blank' (à compléter)."
                    },
                    question: {
                        type: Type.STRING,
                        description: "Le texte de la question en espagnol. Pour les questions à compléter, utiliser des parenthèses pour le verbe à conjuguer, ex: 'Yo (cantar) __________.'."
                    },
                    options: {
                        type: Type.ARRAY,
                        description: "Une liste de 4 chaînes de caractères pour les options de réponse. Obligatoire pour le type 'mcq'.",
                        items: { type: Type.STRING }
                    },
                    answer: {
                        type: Type.STRING,
                        description: "La réponse correcte. Pour les 'mcq', c'est l'une des options. Pour 'fill-in-the-blank', c'est le mot manquant."
                    },
                    explanation: {
                        type: Type.STRING,
                        description: "Une brève explication en français de pourquoi la réponse est correcte, en se concentrant sur la règle de grammaire."
                    }
                },
                required: ["id", "type", "question", "answer"]
            }
        }
    },
    required: ["title", "questions"]
};

// API route to generate an exercise
// FIX: Use explicit Request and Response types from express to ensure correct type resolution.
app.post('/api/generate', async (req: Request, res: Response) => {
    const { topic, level, difficulty } = req.body;

    if (!topic || !level || !difficulty) {
        return res.status(400).json({ error: "Missing required parameters: topic, level, difficulty" });
    }

    const prompt = `Crée un exercice d'espagnol de difficulté "${difficulty}" sur ${topic}. L'exercice doit contenir 4 questions, mélangeant des questions à choix multiples ('mcq') et des questions à compléter ('fill-in-the-blank'). Pour chaque question, fournis une brève explication en français de la règle de grammaire appliquée.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: `Tu es un professeur d'espagnol créant du contenu pour des élèves tunisiens du niveau ${level}. Les instructions, les titres et les explications doivent être en français, mais les questions et les réponses doivent être en espagnol. Assure-toi que la difficulté est appropriée pour le niveau.`,
                responseMimeType: "application/json",
                responseSchema: exerciseSchema
            },
        });
        
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        res.status(200).json(parsedData);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "An error occurred while communicating with the AI service." });
    }
});

// Vercel doesn't need app.listen(). It wraps the 'app' export in its own server.
export default app;