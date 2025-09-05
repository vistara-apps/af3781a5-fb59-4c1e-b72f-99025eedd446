import OpenAI from 'openai';
import { ScriptRequest, GeneratedScript } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateScript(request: ScriptRequest): Promise<GeneratedScript> {
  try {
    const prompt = `Generate a legal rights script for a ${request.scenario} in ${request.state} in ${request.language === 'es' ? 'Spanish' : 'English'}.

    Provide:
    1. What TO say (3-5 clear, respectful phrases)
    2. What NOT to say (3-5 things to avoid)
    3. Key rights to remember (3-4 important rights)
    4. Additional tips (2-3 practical tips)

    Keep language simple, respectful, and legally accurate. Focus on de-escalation and rights protection.

    Format as JSON with keys: whatToSay, whatNotToSay, keyRights, additionalTips (all arrays of strings).`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights expert who provides clear, accurate, and practical advice for civilian-police interactions. Always prioritize safety and legal compliance.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse JSON response
    const parsed = JSON.parse(content);
    return parsed as GeneratedScript;
  } catch (error) {
    console.error('Error generating script:', error);
    // Return fallback script
    return {
      whatToSay: [
        "I am exercising my right to remain silent.",
        "Am I free to go?",
        "I do not consent to any searches.",
        "I would like to speak with a lawyer."
      ],
      whatNotToSay: [
        "Don't argue or become confrontational",
        "Don't lie or provide false information",
        "Don't resist physically",
        "Don't consent to searches"
      ],
      keyRights: [
        "Right to remain silent",
        "Right to refuse searches without a warrant",
        "Right to ask if you're being detained",
        "Right to legal representation"
      ],
      additionalTips: [
        "Keep your hands visible at all times",
        "Stay calm and speak respectfully",
        "Remember details for later documentation"
      ]
    };
  }
}
