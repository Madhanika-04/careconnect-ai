import { create } from 'zustand';

export interface VitalsMetric {
  value: number;
  unit: string;
  timestamp: string;
  status: 'normal' | 'low' | 'high';
}

export interface HealthDataState {
  healthScore: number;
  riskLevel: 'safe' | 'watch' | 'elevated' | 'danger';
  heartRate: VitalsMetric;
  steps: VitalsMetric & { goal: number };
  sleep: VitalsMetric; // value represents hours
  healthConnectSynced: boolean;
  lastSyncTime: string;
  historicalHeartRate: { time: string; value: number }[];
  historicalSteps: { date: string; value: number }[];
  historicalSleep: { date: string; value: number }[];
  triggerSync: () => Promise<void>;
  updateVitals: (updates: Partial<HealthDataState>) => void;
}

export const useHealthStore = create<HealthDataState>((set) => ({
  healthScore: 84,
  riskLevel: 'safe',
  heartRate: {
    value: 72,
    unit: 'BPM',
    timestamp: 'Just now',
    status: 'normal',
  },
  steps: {
    value: 6420,
    unit: 'steps',
    timestamp: '15m ago',
    status: 'normal',
    goal: 8000,
  },
  sleep: {
    value: 7.2,
    unit: 'hours',
    timestamp: 'Today',
    status: 'normal',
  },
  healthConnectSynced: true,
  lastSyncTime: 'Today, 11:30 AM',
  historicalHeartRate: [
    { time: '08:00', value: 68 },
    { time: '10:00', value: 74 },
    { time: '12:00', value: 82 },
    { time: '14:00', value: 78 },
    { time: '16:00', value: 72 },
  ],
  historicalSteps: [
    { date: 'Mon', value: 7200 },
    { date: 'Tue', value: 8100 },
    { date: 'Wed', value: 5900 },
    { date: 'Thu', value: 6800 },
    { date: 'Fri', value: 6420 },
  ],
  historicalSleep: [
    { date: 'Mon', value: 6.8 },
    { date: 'Tue', value: 7.5 },
    { date: 'Wed', value: 8.0 },
    { date: 'Thu', value: 6.2 },
    { date: 'Fri', value: 7.2 },
  ],
  triggerSync: async () => {
    // Simulated Android Health Connect Data Sync
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({
      healthConnectSynced: true,
      lastSyncTime: 'Just now',
      heartRate: {
        value: Math.floor(Math.random() * (85 - 65 + 1)) + 65,
        unit: 'BPM',
        timestamp: 'Just now',
        status: 'normal',
      },
      steps: {
        value: 7150,
        unit: 'steps',
        timestamp: 'Just now',
        status: 'normal',
        goal: 8000,
      },
    });
  },
  updateVitals: (updates) => {
    set((state) => ({ ...state, ...updates }));
  },
}));
