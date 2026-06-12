import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  language: 'en' | 'es' | 'hi' | 'zh';
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateLanguage: (lang: 'en' | 'es' | 'hi' | 'zh') => void;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default true for instant exploration of the dashboard
  user: {
    id: 'user_01',
    name: 'Robert Carter',
    email: 'robert.carter@healthmail.com',
    age: 72, // Senior citizen profile matching elderly-friendly target
    phone: '+1 (555) 019-2831',
    language: 'en',
    emergencyContacts: [
      { id: 'c1', name: 'Sarah Carter (Daughter)', relationship: 'Daughter', phone: '+1 (555) 987-6543' },
      { id: 'c2', name: 'Dr. Evelyn Thomas', relationship: 'Primary Physician', phone: '+1 (555) 123-4567' },
    ],
  },
  loading: false,
  login: async (email) => {
    set({ loading: true });
    // Mock authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({
      isAuthenticated: true,
      user: {
        id: 'user_01',
        name: 'Robert Carter',
        email,
        age: 72,
        phone: '+1 (555) 019-2831',
        language: 'en',
        emergencyContacts: [
          { id: 'c1', name: 'Sarah Carter (Daughter)', relationship: 'Daughter', phone: '+1 (555) 987-6543' },
        ],
      },
      loading: false,
    });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  updateLanguage: (lang) => {
    set((state) => ({
      user: state.user ? { ...state.user, language: lang } : null,
    }));
  },
  addEmergencyContact: (contact) => {
    set((state) => {
      if (!state.user) return {};
      const newContact: EmergencyContact = {
        ...contact,
        id: `c_${Date.now()}`,
      };
      return {
        user: {
          ...state.user,
          emergencyContacts: [...state.user.emergencyContacts, newContact],
        },
      };
    });
  },
}));
