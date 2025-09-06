import OpenAI from 'openai';
import { ScriptRequest, GeneratedScript } from './types';

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
}

export async function generateScript(request: ScriptRequest): Promise<GeneratedScript> {
  try {
    const openai = getOpenAIClient();
    
    // If no OpenAI client available, return fallback immediately
    if (!openai) {
      console.warn('No OpenAI API key configured, using fallback script');
      return getFallbackScript(request);
    }

    const isSpanish = request.language === 'es';
    
    const systemPrompt = isSpanish 
      ? 'Eres un experto en derechos legales que proporciona consejos claros, precisos y prácticos para interacciones civiles con la policía. Siempre prioriza la seguridad y el cumplimiento legal.'
      : 'You are a legal rights expert who provides clear, accurate, and practical advice for civilian-police interactions. Always prioritize safety and legal compliance.';

    const userPrompt = isSpanish 
      ? `Genera un guión de derechos legales para un ${request.scenario} en ${request.state} en español.

    Proporciona:
    1. Qué DECIR (3-5 frases claras y respetuosas)
    2. Qué NO decir (3-5 cosas que evitar)
    3. Derechos clave a recordar (3-4 derechos importantes)
    4. Consejos adicionales (2-3 consejos prácticos)

    Mantén el lenguaje simple, respetuoso y legalmente preciso. Enfócate en la desescalada y protección de derechos.

    Formatea como JSON con las claves: whatToSay, whatNotToSay, keyRights, additionalTips (todos arrays de strings).`
      : `Generate a legal rights script for a ${request.scenario} in ${request.state} in English.

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
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Clean and parse JSON response
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/, '').replace(/\n?```$/, '');
    }

    let parsed: GeneratedScript;
    try {
      parsed = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanContent);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate response structure
    if (!parsed.whatToSay || !parsed.whatNotToSay || !parsed.keyRights || !parsed.additionalTips) {
      throw new Error('Incomplete response structure');
    }

    return parsed;
  } catch (error) {
    console.error('Error generating script:', error);
    // Return fallback script based on language
    return getFallbackScript(request);
  }
}

function getFallbackScript(request: ScriptRequest): GeneratedScript {
  const isSpanish = request.language === 'es';
  
  if (isSpanish) {
    return {
      whatToSay: [
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "¿Soy libre de irme?",
        "No consiento a ningún registro.",
        "Me gustaría hablar con un abogado."
      ],
      whatNotToSay: [
        "No discutas o te vuelvas confrontativo",
        "No mientas o proporciones información falsa",
        "No resistas físicamente",
        "No consientas a registros"
      ],
      keyRights: [
        "Derecho a permanecer en silencio",
        "Derecho a rechazar registros sin orden judicial",
        "Derecho a preguntar si estás siendo detenido",
        "Derecho a representación legal"
      ],
      additionalTips: [
        "Mantén las manos visibles en todo momento",
        "Mantén la calma y habla respetuosamente",
        "Recuerda detalles para documentación posterior"
      ]
    };
  }

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
