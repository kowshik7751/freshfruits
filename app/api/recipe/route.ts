import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { fruitNames, promptType, customPrompt } = await req.json();

    const fruitsList = fruitNames && fruitNames.length > 0 ? fruitNames.join(', ') : 'fresh seasonal fruits';
    
    let systemInstruction = `You are Chef Karthik, master nutritionist and artisan fruit sommelier at Karthik Fresh Fruits. You create mouth-watering, healthy smoothie recipes, acai bowl ideas, fruit salads, and nutritional wellness plans using farm-fresh fruits. Provide appetizing descriptions, step-by-step instructions, and nutritional benefits in clean, formatted Markdown.`;

    let userPrompt = '';
    if (promptType === 'smoothie') {
      userPrompt = `Create an amazing signature smoothie recipe using some or all of these fruits: ${fruitsList}. Include ingredients, proportions, step-by-step instructions, and health benefits.`;
    } else if (promptType === 'salad') {
      userPrompt = `Create a gourmet fresh fruit salad or tropical bowl recipe using: ${fruitsList}. Include dressing ideas (like mint-lime drizzle or honey-vanilla bean) and plating tips.`;
    } else {
      userPrompt = customPrompt || `Give me expert tips on how to store and combine ${fruitsList} for maximum flavor and nutrition.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text || 'Enjoy your fresh fruit creations!';

    return NextResponse.json({ success: true, recipe: text });
  } catch (error: any) {
    console.error('Gemini Recipe API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate recipe' },
      { status: 500 }
    );
  }
}
