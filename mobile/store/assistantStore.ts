import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isMultilingual?: boolean;
  language?: string;
  explanationDetails?: string; // For explainable AI dashboards
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

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    // Simulated AI Assistant Processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let replyText = "I have reviewed your inquiry. Based on your current health records, your heart rate is stable at 72 BPM and sleep duration is normal. Is there a specific symptom you would like me to analyze?";
    let explanationDetails = "";

    const lowerText = text.toLowerCase();
    if (lowerText.includes('analyze') || lowerText.includes('baseline')) {
      replyText = "Analyzing your health baseline. Your baseline cardiovascular metrics show a steady resting heart rate (68-76 BPM range) over the last 30 days. No significant anomaly detected in your ECG profiles.";
      explanationDetails = "Statistical baseline calculated: Mean HR 71.2 BPM. Outlier threshold set at >90 BPM. Current standard deviation: 3.4 BPM.";
    } else if (lowerText.includes('symptom') || lowerText.includes('cough') || lowerText.includes('fever')) {
      replyText = "Based on your symptom inputs, there is a low risk profile. However, there is an elevated influenza transmission level in your local community. Please monitor your temperature and rest.";
      explanationDetails = "XGBoost classifier predicts: Flu (18%), Cold (12%), Pneumonia (1%). Recommended observation: 24h.";
    } else if (lowerText.includes('risk') || lowerText.includes('score')) {
      replyText = "Your overall public health risk score is 84/100 (Safe). The system considers age, heart rate trend stability, and the lack of regional disease outbreak zones near your residential coordinates.";
      explanationDetails = "SHAP Force Plot contributions: Age (+12 risk), ECG telemetry (-18 risk), High step count (-10 risk), Community cluster density (Neutral).";
    }

    const assistantReply: ChatMessage = {
      id: `m_${Date.now() + 1}`,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMultilingual: true,
      language: 'English',
      explanationDetails: explanationDetails || undefined,
    };

    set((state) => ({
      messages: [...state.messages, assistantReply],
      isTyping: false,
    }));
  },
  toggleVoiceInput: () => {
    set((state) => ({ voiceInputActive: !state.voiceInputActive }));
  },
  clearHistory: () => {
    set({
      messages: [
        {
          id: 'm_init',
          sender: 'assistant',
          text: 'Message history cleared. How can I help you today?',
          timestamp: 'Just now',
        },
      ],
    });
  },
}));
