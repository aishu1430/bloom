import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SUNFLOWER, shadow } from "../theme";

export function Page({ children, scroll = true }) {
  const { ScrollView, SafeAreaView } = require("react-native");
  return (
    <SafeAreaView style={styles.safe}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : <View style={styles.container}>{children}</View>}
    </SafeAreaView>
  );
}

export function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Image source={{ uri: SUNFLOWER }} style={styles.headerFlower} />
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, shadow, style]}>{children}</View>;
}

export function Button({ title, onPress, active = false, danger = false, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, active && styles.buttonActive, danger && styles.buttonDanger, style]}>
      <Text style={[styles.buttonText, active && styles.buttonTextActive, danger && styles.buttonTextDanger]}>{title}</Text>
    </TouchableOpacity>
  );
}

export function ProgressBar({ value, color = COLORS.olive }) {
  return (
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }]} />
    </View>
  );
}

export function SmallFlower() {
  return <Image source={{ uri: SUNFLOWER }} style={styles.smallFlower} />;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.cream },
  container: { padding: 20, paddingBottom: 110 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  title: { fontSize: 29, fontWeight: "800", color: COLORS.brown, letterSpacing: -0.5 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 5, lineHeight: 19 },
  headerFlower: { width: 58, height: 58, borderRadius: 29, marginLeft: 12 },
  card: { backgroundColor: COLORS.card, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, padding: 17, marginBottom: 14 },
  button: { borderRadius: 15, paddingVertical: 10, paddingHorizontal: 13, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.white, alignItems: "center" },
  buttonActive: { backgroundColor: COLORS.yellow, borderColor: COLORS.yellow },
  buttonDanger: { borderColor: "#E8C7BE", backgroundColor: "#FFF2EF" },
  buttonText: { color: COLORS.brown, fontSize: 12, fontWeight: "700" },
  buttonTextActive: { fontWeight: "800" },
  buttonTextDanger: { color: COLORS.danger },
  progressBg: { height: 10, backgroundColor: COLORS.paleYellow, borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 10 },
  smallFlower: { width: 58, height: 58, borderRadius: 29 }
});
