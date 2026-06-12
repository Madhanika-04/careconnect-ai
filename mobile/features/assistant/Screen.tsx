import React, { useState, useRef } from 'react';
import { RiskCard } from '../../components/RiskCard';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useAssistantStore } from '../../store/assistantStore';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { Send, Mic, Sparkles, RefreshCw, Languages, Info } from 'lucide-react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function AssistantScreen() {
  const { messages, isTyping, voiceInputActive, sendMessage, toggleVoiceInput, clearHistory } = useAssistantStore();
  const { user } = useAuthStore();
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.topBanner}>
        <View style={styles.langBadge}>
          <Languages size={16} color={colors.primary} />
          <Text style={styles.langText}>Interface: {user?.language === 'en' ? 'English' : 'Multilingual'}</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={clearHistory}>
          <RefreshCw size={16} color={colors.textSecondary} />
          <Text style={styles.clearBtnText}>Reset Chat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messageList}
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === 'user' ? styles.userContainer : styles.assistantContainer,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.sender === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={[styles.messageText, msg.sender === 'user' ? styles.userText : styles.assistantText]}>
                {msg.text}
              </Text>
              <Text style={[styles.timestamp, msg.sender === 'user' ? styles.userTime : styles.assistantTime]}>
                {msg.timestamp}
              </Text>
            </View>

            {/* Explainable AI Dashboard Segment */}
            {msg.sender === 'assistant' && msg.risk && (
              <RiskCard risk={msg.risk} />
            )}
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageContainer, styles.assistantContainer]}>
            <View style={[styles.bubble, styles.assistantBubble, styles.typingBubble]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.typingText}>CareConnect is analyzing...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggested Prompts */}
      {messages.length <= 2 && (
        <View style={styles.suggestedContainer}>
          <Text style={styles.suggestedTitle}>Suggested Health Topics:</Text>
          <View style={styles.promptsGrid}>
            {['Analyze my health', 'Check symptoms', 'Explain my risk score', 'Health advice'].map((prompt) => (
              <TouchableOpacity
                key={prompt}
                style={styles.promptBtn}
                onPress={() => handlePromptClick(prompt)}
              >
                <Sparkles size={14} color={colors.primary} style={styles.promptIcon} />
                <Text style={styles.promptBtnText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Input Tray */}
      <View style={styles.inputTray}>
        <TouchableOpacity
          style={[
            styles.micBtn,
            voiceInputActive && { backgroundColor: colors.dangerLight },
          ]}
          onPress={toggleVoiceInput}
        >
          <Mic size={24} color={voiceInputActive ? colors.danger : colors.textSecondary} />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder={voiceInputActive ? 'Listening to voice...' : 'Describe symptoms or ask health questions...'}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          placeholderTextColor={colors.textSecondary}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send size={20} color={colors.card} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  messageList: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  assistantContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...shadows.sm,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: radius.xs,
  },
  assistantBubble: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: radius.xs,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: colors.card,
  },
  assistantText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  assistantTime: {
    color: colors.textSecondary,
  },
  shapExplanation: {
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: radius.md,
    padding: 10,
    marginTop: 6,
    marginLeft: 4,
    ...shadows.sm,
  },
  shapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shapTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    marginLeft: 6,
  },
  shapContent: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 16,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    marginLeft: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  suggestedContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  suggestedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  promptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  promptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    marginRight: 8,
    marginBottom: 8,
  },
  promptIcon: {
    marginRight: 4,
  },
  promptBtnText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  inputTray: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  micBtn: {
    padding: 10,
    borderRadius: radius.full,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.text,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: radius.full,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
