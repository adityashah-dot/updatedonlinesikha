import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { WEBSITE_KNOWLEDGE_SUMMARY } from '../../../src/data/chatbotKnowledge.js';

const fallbackAnswer = `Welcome to **Online Siksha Advisor**! I can help with **fees, eligibility, UGC validity, EMI options, scholarships, placements, and admissions** across LPU, Amity, Chandigarh University, Manipal, Jain, and UPES.\n\nWhat program or university would you like to explore today?`;

export async function POST(request) {
  try {
    const { messages, modelChoice = 'gemini-3.5-flash' } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ text: fallbackAnswer, model: 'grounded-dataset-fallback' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = modelChoice === 'gemini-3.1-flash-lite' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash';
    const contents = messages.map((message) => ({
      role: message.role === 'model' || message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.text }],
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: { systemInstruction: WEBSITE_KNOWLEDGE_SUMMARY, temperature: 0.7 },
    });

    return NextResponse.json({ text: response.text || fallbackAnswer, model });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ text: fallbackAnswer, model: 'grounded-dataset-fallback' });
  }
}
