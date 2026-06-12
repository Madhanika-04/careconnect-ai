import { create } from 'zustand';
import { loginUser, signUpUser, logoutUser, UserProfileData } from '../services/firebase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
  medicalHistory: string;
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
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, profile: UserProfileData) => Promise<void>;
  logout: () => Promise<void>;
  updateLanguage: (lang: 'en' | 'es' | 'hi' | 'zh') => void;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default true for instant exploration of the dashboard
  user: {
    id: 'user_01',
    name: 'Robert Carter',
    email: 'robert.carter@healthmail.com',
    age: 72,
    gender: 'Male',
    bloodGroup: 'O Positive (O+)',
    medicalHistory: 'Mild Hypertension, Penicillin Allergy',
    phone: '+1 (555) 019-2831',
    language: 'en',
    emergencyContacts: [
      { id: 'c1', name: 'Sarah Carter (Daughter)', relationship: 'Daughter', phone: '+1 (555) 987-6543' },
      { id: 'c2', name: 'Dr. Evelyn Thomas', relationship: 'Primary Physician', phone: '+1 (555) 123-4567' },
    ],
  },
  loading: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const result = await loginUser(email, password);
      set({
        isAuthenticated: true,
        user: {
          id: result.uid,
          name: result.name,
          email: result.email,
          age: result.age,
          gender: result.gender,
          bloodGroup: result.bloodGroup,
          medicalHistory: result.medicalHistory,
          phone: result.phone,
          language: 'en',
          emergencyContacts: result.emergencyContacts,
        },
      });
    } catch (error: any) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  register: async (email, password, profile) => {
    set({ loading: true });
    try {
      const result = await signUpUser(email, password, profile);
      set({
        isAuthenticated: true,
        user: {
          id: result.uid,
          name: result.name,
          email: result.email,
          age: result.age,
          gender: result.gender,
          bloodGroup: result.bloodGroup,
          medicalHistory: result.medicalHistory,
          phone: result.phone,
          language: 'en',
          emergencyContacts: result.emergencyContacts,
        },
      });
    } catch (error: any) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await logoutUser();
      set({ isAuthenticated: false, user: null });
    } catch (error: any) {
      console.error('Logout error: ', error);
    } finally {
      set({ loading: false });
    }
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
