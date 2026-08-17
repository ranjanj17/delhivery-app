import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { ArrowLeft, MessageSquare, ChevronDown, ChevronUp, ChevronRight, MessageCircleQuestion } from 'lucide-react-native';
import { Stack, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MotiView, AnimatePresence } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FAQAccordion = ({ title, items, initiallyExpanded = false }: { title: string, items: string[], initiallyExpanded?: boolean }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <Pressable onPress={toggle} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        {expanded ? (
          <ChevronUp color={Colors.textDark} size={20} strokeWidth={2.5} />
        ) : (
          <ChevronDown color={Colors.textDark} size={20} strokeWidth={2.5} />
        )}
      </Pressable>
      <AnimatePresence>
        {expanded && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'timing', duration: 300 }}
            style={{ overflow: 'hidden' }}
          >
            <View style={styles.accordionContent}>
              {items.map((item, index) => (
                <Pressable 
                  key={index} 
                  style={[styles.accordionItem, index === items.length - 1 && { borderBottomWidth: 0 }]}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                >
                  <Text style={styles.accordionItemText}>{item}</Text>
                  <ChevronRight color={Colors.textMuted} size={16} strokeWidth={2.5} />
                </Pressable>
              ))}
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

export default function HelpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable 
              style={styles.backButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
              }}
            >
              <ArrowLeft color={Colors.textDark} size={24} strokeWidth={2.5} />
            </Pressable>
            <Text style={styles.headerTitle}>Help</Text>
          </View>
          <Pressable 
            style={styles.contactButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Conversations Section */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 100 }}
          >
            <Text style={styles.sectionTitle}>Conversations</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 200 }}
          >
            <View style={styles.conversationsCard}>
              <MessageSquare color={Colors.textMuted} size={32} strokeWidth={2} style={styles.convoIcon} />
              <Text style={styles.convoText}>You don't have any active{'\n'}conversations</Text>
              <Pressable 
                style={styles.showPastButton}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              >
                <Text style={styles.showPastText}>Show Past Conversation</Text>
              </Pressable>
            </View>
          </MotiView>

          {/* FAQs Section Container */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 300 }}
            style={styles.faqContainerBg}
          >
            <View style={styles.faqHeaderRow}>
              <View style={styles.faqTitleContainer}>
                <MessageCircleQuestion color="#E63946" size={20} strokeWidth={2.5} />
                <Text style={styles.faqSectionTitle}>FAQs</Text>
              </View>
            </View>

            <View style={styles.faqList}>
              <FAQAccordion 
                title="NATIONAL COURIER" 
                initiallyExpanded={true}
                items={['General queries', 'Shipment Status', 'Address And Contact Detail Update', 'Issue Reporting']}
              />
              <FAQAccordion 
                title="LOCAL (INTRACITY)" 
                items={['General queries']}
              />
              <FAQAccordion 
                title="GENERAL QUERIES" 
                items={['General queries', 'Account Settings']}
              />
            </View>
          </MotiView>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDark,
  },
  contactButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  conversationsCard: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: Spacing.lg,
    borderRadius: 16,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  convoIcon: {
    marginBottom: Spacing.sm,
  },
  convoText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  showPastButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  showPastText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
  },
  faqContainerBg: {
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingTop: 24,
    paddingBottom: 40,
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  faqTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  faqSectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textDark,
  },
  faqList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  accordionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: '#F9F9F9',
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textDark,
  },
  accordionContent: {
    backgroundColor: '#FFF',
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  accordionItemText: {
    fontSize: 14,
    color: Colors.textDark,
    fontWeight: '500',
  },
});
