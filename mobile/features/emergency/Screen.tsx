import React from 'react';
import { StyleSheet, View, Text, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useAlertStore } from '../../store/alertStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { SOSButton } from '../../components/SOSButton';
import { HealthCard } from '../../components/HealthCard';
import { SectionHeader } from '../../components/SectionHeader';
import { Phone, Navigation, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react-native';

export default function EmergencyScreen() {
  const { user } = useAuthStore();
  const { sosDispatched, triggerSOS, cancelSOS } = useAlertStore();

  const handleSOSPress = () => {
    if (sosDispatched) {
      cancelSOS();
      Alert.alert('SOS Cancelled', 'The emergency alert to your family contacts has been recalled.');
    } else {
      triggerSOS();
      Alert.alert(
        'Alert Sent!',
        'SOS alert dispatched. Family members and health coordinators have been notified with your live coordinates.'
      );
    }
  };

  const handleCall = (phone: string, name: string) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot automatically call ${name} on this device.`);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Visual Indicator of Dispatch Status */}
      {sosDispatched ? (
        <View style={[styles.statusBanner, styles.activeBanner]}>
          <AlertTriangle color="#FFFFFF" size={24} />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>ALERT DISPATCHED ACTIVE</Text>
            <Text style={styles.bannerDesc}>Family & Responders notified with GPS Location.</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.statusBanner, styles.inactiveBanner]}>
          <ShieldCheck color={colors.success} size={24} />
          <View style={styles.bannerTextContainer}>
            <Text style={[styles.bannerTitle, { color: colors.success }]}>System Armed & Monitoring</Text>
            <Text style={[styles.bannerDesc, { color: colors.textSecondary }]}>
              Press and hold or tap the SOS button to alert contacts.
            </Text>
          </View>
        </View>
      )}

      {/* Pulsing SOS Button */}
      <View style={styles.sosButtonContainer}>
        <SOSButton onPress={handleSOSPress} size={180} />
        {sosDispatched && (
          <TouchableOpacity style={styles.cancelBtn} onPress={cancelSOS}>
            <Text style={styles.cancelBtnText}>CANCEL SOS ALERT</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Emergency Contacts List */}
      <SectionHeader title="Call Family / Contacts" />
      {user?.emergencyContacts.map((contact) => (
        <TouchableOpacity
          key={contact.id}
          style={styles.contactRow}
          onPress={() => handleCall(contact.phone, contact.name)}
        >
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactRelation}>{contact.relationship}</Text>
          </View>
          <View style={styles.phoneIconWrapper}>
            <Phone color={colors.card} size={20} />
          </View>
        </TouchableOpacity>
      ))}

      {/* Institutional Response Actions */}
      <SectionHeader title="Professional Medical Help" />
      <View style={styles.emergencyActionsGrid}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.danger }]}
          onPress={() => handleCall('911', 'Emergency Services')}
        >
          <Phone color="#FFFFFF" size={24} />
          <Text style={styles.actionCardTitle}>CALL AMBULANCE</Text>
          <Text style={styles.actionCardSub}>Dial 911 Direct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.accent }]}
          onPress={() => Alert.alert('Locating nearest hospitals', 'Opening mapping vectors...')}
        >
          <Navigation color="#FFFFFF" size={24} />
          <Text style={styles.actionCardTitle}>NEAREST HOSPITAL</Text>
          <Text style={styles.actionCardSub}>1.2 miles away</Text>
        </TouchableOpacity>
      </View>

      {/* Critical Health Details Reference for First Responders */}
      <HealthCard title="First Responder Info" subtitle="Medical details displayed on Lock Screen">
        <View style={styles.medicalInfoRow}>
          <View style={styles.medicalInfoCol}>
            <Text style={styles.medLabel}>Blood Group</Text>
            <Text style={styles.medVal}>O Positive (O+)</Text>
          </View>
          <View style={styles.medicalInfoCol}>
            <Text style={styles.medLabel}>Allergies</Text>
            <Text style={styles.medVal}>Penicillin, Nuts</Text>
          </View>
        </View>
        <View style={[styles.medicalInfoRow, { marginTop: 12 }]}>
          <View style={styles.medicalInfoCol}>
            <Text style={styles.medLabel}>Current Medications</Text>
            <Text style={styles.medVal}>Lisinopril (10mg Daily)</Text>
          </View>
        </View>
      </HealthCard>

      {/* Elder-friendly Safety checklist */}
      <HealthCard title="What to do in an Emergency" icon={<HeartPulse color={colors.danger} size={22} />}>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionItem}>1. Find a safe location to sit or lie down.</Text>
          <Text style={styles.instructionItem}>2. Keep your phone close to your body so GPS remains accurate.</Text>
          <Text style={styles.instructionItem}>3. If conscious, take slow, deep breaths to regulate heart rate.</Text>
        </View>
      </HealthCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 16,
    ...shadows.sm,
  },
  activeBanner: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  inactiveBanner: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  bannerTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  sosButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cancelBtn: {
    backgroundColor: colors.text,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radius.md,
    marginTop: 16,
  },
  cancelBtnText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  contactRelation: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  phoneIconWrapper: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: radius.full,
  },
  emergencyActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  actionCard: {
    flex: 1,
    padding: 16,
    borderRadius: radius.lg,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  actionCardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  actionCardSub: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    marginTop: 2,
  },
  medicalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicalInfoCol: {
    flex: 1,
  },
  medLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  medVal: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '700',
    marginTop: 2,
  },
  instructionsContainer: {
    paddingVertical: 4,
  },
  instructionItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginVertical: 4,
  },
});
