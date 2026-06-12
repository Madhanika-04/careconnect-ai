import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';

// Firebase configuration from Expo environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Check if configuration exists
export const isFirebaseConfigured = !!firebaseConfig.apiKey;

let app;
let auth: any;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase initialization failed: ', error);
  }
}

export { auth };

// Profile Interface matching storage requirement
export interface UserProfileData {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  medicalHistory: string;
  phone: string;
  emergencyContacts: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
  }>;
}

// Local mock database in memory to handle fallback gracefully
let mockUserDb: Record<string, { email: string; profile: UserProfileData }> = {};

export const signUpUser = async (email: string, password: string, profile: UserProfileData) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // In a full implementation, you would save this to Firestore:
    // await setDoc(doc(db, "users", userCredential.user.uid), profile);
    // For local fallback compatibility, we will also cache it in memory
    mockUserDb[userCredential.user.uid] = { email, profile };
    return { uid: userCredential.user.uid, email, ...profile };
  } else {
    // Simulated mock signup
    await new Promise((resolve) => setTimeout(resolve, 800));
    const uid = `mock_uid_${Date.now()}`;
    const userData = { uid, email, ...profile };
    mockUserDb[uid] = { email, profile };
    return userData;
  }
};

export const loginUser = async (email: string, password: string) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // In real app, you fetch from Firestore:
    // const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
    const cached = mockUserDb[userCredential.user.uid] || { 
      email, 
      profile: {
        name: 'Arthur Pendragon',
        age: 72,
        gender: 'Male',
        bloodGroup: 'O+',
        medicalHistory: 'Mild Hypertension',
        phone: '+1 (555) 019-2831',
        emergencyContacts: [
          { id: 'c1', name: 'Sarah Carter (Daughter)', relationship: 'Daughter', phone: '+1 (555) 987-6543' }
        ]
      }
    };
    return { uid: userCredential.user.uid, email, ...cached.profile };
  } else {
    // Simulated mock login
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Check in mock db
    const matched = Object.entries(mockUserDb).find(([_, user]) => user.email === email);
    if (matched) {
      return { uid: matched[0], email, ...matched[1].profile };
    }
    // Return default fallback account
    return {
      uid: 'mock_uid_default',
      email,
      name: 'Robert Carter',
      age: 72,
      gender: 'Male',
      bloodGroup: 'O Positive (O+)',
      medicalHistory: 'Mild Hypertension, Penicillin Allergy',
      phone: '+1 (555) 019-2831',
      emergencyContacts: [
        { id: 'c1', name: 'Sarah Carter (Daughter)', relationship: 'Daughter', phone: '+1 (555) 987-6543' },
        { id: 'c2', name: 'Dr. Evelyn Thomas', relationship: 'Primary Physician', phone: '+1 (555) 123-4567' }
      ]
    };
  }
};

export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
};
