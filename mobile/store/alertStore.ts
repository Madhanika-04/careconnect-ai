import { create } from 'zustand';

export interface HealthAlert {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  date: string;
  zone: 'green' | 'yellow' | 'orange' | 'red';
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in meters
  };
}

interface AlertState {
  alerts: HealthAlert[];
  sosDispatched: boolean;
  sosCountdown: number;
  triggerSOS: () => void;
  cancelSOS: () => void;
  dismissAlert: (id: string) => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [
    {
      id: 'a1',
      title: 'Influenza Outbreak Warning',
      description: 'Influenza-like illness rates have elevated to Orange level (Elevated) in your immediate neighborhood. Ensure vaccination is up to date.',
      type: 'warning',
      date: 'Today, 9:00 AM',
      zone: 'orange',
      location: { latitude: 37.7749, longitude: -122.4194, radius: 1500 },
    },
    {
      id: 'a2',
      title: 'Water Quality Notification',
      description: 'Municipal water quality testing returned Normal. Tap water is verified Safe for all households.',
      type: 'success',
      date: 'Yesterday',
      zone: 'green',
      location: { latitude: 37.7833, longitude: -122.4167, radius: 3000 },
    },
    {
      id: 'a3',
      title: 'Heatwave Health Advisory',
      description: 'Extreme thermal conditions predicted (High Risk). Senior citizens are advised to remain indoors with hydration measures.',
      type: 'danger',
      date: '2 days ago',
      zone: 'red',
      location: { latitude: 37.7699, longitude: -122.4468, radius: 5000 },
    },
  ],
  sosDispatched: false,
  sosCountdown: 0,
  triggerSOS: () => {
    set({ sosDispatched: true });
    // In production, this launches the FCM/SMS notification handlers to emergency contacts.
  },
  cancelSOS: () => {
    set({ sosDispatched: false, sosCountdown: 0 });
  },
  dismissAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    }));
  },
}));
