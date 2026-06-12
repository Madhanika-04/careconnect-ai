import Constants from 'expo-constants';

interface LLMResponse {
  answer: string;
  risk?: {
    name: string;
    score: number; // 0-1
    reasons: string[];
  };
}

const getApiKey = (provider: 'openai' | 'gemini'): string => {
  if (provider === 'openai') {
    return OPENAI_API_KEY || Constants.manifest?.extra?.OPENAI_API_KEY || '';
  }
  return GEMINI_API_KEY || Constants.manifest?.extra?.GEMINI_API_KEY || '';
};

export const callOpenAI = async (prompt: string): Promise<LLMResponse> => {
  const apiKey = getApiKey('openai');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return { answer: content };
  }
};

export const callGemini = async (prompt: string): Promise<LLMResponse> => {
  const apiKey = getApiKey('gemini');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    }),
  });
  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  try {
    return JSON.parse(content);
  } catch {
    return { answer: content };
  }
};

export const queryLLM = async (prompt: string, provider: 'openai' | 'gemini' = 'openai'): Promise<LLMResponse> => {
  if (provider === 'openai') {
    return callOpenAI(prompt);
  }
  return callGemini(prompt);
};
