import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';
import { UserProfile } from '../store/authStore';

const HOSPITAL_CONTACT = {
  name: 'Local Hospital',
  phone: '+18005551234', // Example number
};

/**
 * Dispatch an emergency SOS message to family contacts, hospital, and via push notification.
 */
export const dispatchSOS = async (user: UserProfile) => {
  // Request location permission and get current position
  const { status } = await Location.requestForegroundPermissionsAsync();
  let locationUrl = 'Location unavailable';
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  const timestamp = new Date().toLocaleString();
  const message = `EMERGENCY SOS\nName: ${user.name}\nLocation: ${locationUrl}\nHealth Condition: ${user.medicalHistory}\nTimestamp: ${timestamp}`;

  // Prepare list of contacts (family + hospital)
  const contacts = [...(user.emergencyContacts || []), HOSPITAL_CONTACT];

  // Send SMS and WhatsApp to each contact
  for (const contact of contacts) {
    const phone = contact.phone.replace(/[^+\d]/g, '');
    // SMS
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(smsUrl);
    } catch (e) {
      console.warn('Failed to open SMS for', phone, e);
    }
    // WhatsApp (use wa.me scheme)
    const waUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(waUrl);
    } catch (e) {
      console.warn('Failed to open WhatsApp for', phone, e);
    }
  }

  // Push notification to the device (local notification as demo)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'SOS Alert Sent',
      body: message,
      sound: true,
    },
    trigger: null,
  });
};
