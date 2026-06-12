export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  bloodGroup: string;
  medicalHistory: string;
  phone: string;
  language: string;
  emergencyContacts: { id: string; name: string; relationship: string; phone: string }[];
}

/**
 * Build a prompt that includes user health context to give the LLM more accurate answers.
 */
export const buildMedicalPrompt = (question: string, user: UserProfile | null): string => {
  const profileInfo = user
    ? `User profile:\n- Age: ${user.age}\n- Gender: ${user.gender}\n- Blood Group: ${user.bloodGroup}\n- Medical History: ${user.medicalHistory}\n- Emergency Contacts: ${user.emergencyContacts.map((c) => c.name).join(', ')}`
    : '';
  return `${profileInfo}\n\nQuestion: ${question}\n\nProvide a concise answer. If a risk assessment is applicable, respond with JSON in the following format:\n{\n  "answer": "<text answer>",\n  "risk": {\n    "name": "<Risk Name>",\n    "score": <0-1>,\n    "reasons": ["<reason1>", "<reason2>"]\n  }\n}\nIf no risk, omit the risk field.`;
};
