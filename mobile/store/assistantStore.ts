import { create } from 'zustand';
import { useAuthStore } from '../store/authStore';
import { queryLLM } from '../services/llmService';
import { buildMedicalPrompt } from '../services/medicalPrompt';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isMultilingual?: boolean;
  language?: string;
  explanationDetails?: string; // For explainable AI dashboards
  risk?: {
    name: string;
    score: number; // 0-1
    reasons: string[];
  };
}

interface AssistantState {
  messages: ChatMessage[];
  isTyping: boolean;
  voiceInputActive: boolean;
  sendMessage: (text: string) => Promise<void>;
  toggleVoiceInput: () => void;
  clearHistory: () => void;
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  messages: [
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello Robert. I am your CareConnect AI Assistant. How can I help you today? You can ask me to analyze your health baseline, review symptoms, or explain any risk score alerts.',
      timestamp: '11:00 AM',
      isMultilingual: true,
      language: 'English',
    },
  ],
  isTyping: false,
  voiceInputActive: false,
  sendMessage: async (text: string) => {
    const userMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    // Append user message and set typing
    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));
    // Retrieve user profile for prompt context
    const { user } = useAuthStore.getState();
    const userProfile = user;
    // Build medical prompt and query LLM
    const prompt = buildMedicalPrompt(text, userProfile);
    try {
      const llmResponse = await queryLLM(prompt, 'openai');
      const assistantMsg: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'assistant',
        text: llmResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMultilingual: true,
        language: 'English',
        risk: llmResponse.risk,
      };
      // Populate explanationDetails for legacy UI fallback
      if (llmResponse.risk) {
        assistantMsg.explanationDetails = `Risk: ${llmResponse.risk.name} ${Math.round(llmResponse.risk.score * 100)}%\nReasons: ${llmResponse.risk.reasons.join(', ')}`;
      }
      set((state) => ({
        messages: [...state.messages, assistantMsg],
        isTyping: false,
      }));
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: `m_${Date.now() + 2}`,
        sender: 'assistant',
        text: 'Sorry, I could not process your request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMultilingual: true,
        language: 'English',
      };
      set((state) => ({
        messages: [...state.messages, errorMsg],
        isTyping: false,
      }));
    }
  },
  toggleVoiceInput: () => set((state) => ({ voiceInputActive: !state.voiceInputActive })),
  clearHistory: () =>
    set({
      messages: [
        {
          id: 'm_init',
          sender: 'assistant',
          text: 'Message history cleared. How can I help you today?',
          timestamp: 'Just now',
        },
      ],
    }),
}));
