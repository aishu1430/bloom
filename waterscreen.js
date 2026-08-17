import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme";
import { Button, Card, Header, Page, ProgressBar } from "../components/UI";
import { useStorage } from "../storage/StorageContext";

export default function WaterScreen() {
  const { data, getDay, addWater } = useStorage();
  const day = getDay();
  const goal = data.settings.waterGoal;
  const pct = Math.round(day.water / goal * 100);
  const glasses = Math.floor(day.water / 250);

  return (
    <Page>
      <Header title="Water Tracker 🌻" subtitle="Stay hydrated, stay glowing." />

      <Card style={styles.center}>
        <Text style={styles.label}>TODAY'S GOAL</Text>
        <Text style={styles.goal}>{goal} ml</Text>
        <View style={styles.circle}>
          <Text style={styles.pct}>{Math.min(100, pct)}%</Text>
          <Text style={styles.current}>{day.water} ml</Text>
        </View>
        <Text style={styles.glasses}>{glasses} / {Math.ceil(goal / 250)} glasses</Text>
        <ProgressBar value={pct} color={COLORS.olive} />
      </Card>

      <Text style={styles.section}>Add water</Text>
      <View style={styles.row}>
        {[100, 250, 500].map(a => (
          <Button key={a} title={`+${a} ml`} active={a === 250} onPress={() => addWater(a)} style={{ flex: 1, marginHorizontal: 4 }} />
        ))}
      </View>

      <Card style={styles.message}>
        <Text style={styles.messageText}>Drink water,{"\n"}watch yourself bloom. 🌻</Text>
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center" },
  label: { color: COLORS.muted, fontSize: 11, letterSpacing: 1, fontWeight: "800" },
  goal: { color: COLORS.brown, fontSize: 20, fontWeight: "900", marginTop: 4 },
  circle: { width: 190, height: 190, borderRadius: 95, borderWidth: 14, borderColor: COLORS.yellow, alignItems: "center", justifyContent: "center", marginVertical: 25 },
  pct: { color: COLORS.brown, fontSize: 38, fontWeight: "900" },
  current: { color: COLORS.muted, fontSize: 13, marginTop: 3 },
  glasses: { color: COLORS.olive, fontWeight: "800", marginBottom: 16 },
  section: { color: COLORS.brown, fontSize: 20, fontWeight: "900", marginBottom: 10 },
  row: { flexDirection: "row", marginHorizontal: -4 },
  message: { backgroundColor: COLORS.paleYellow, alignItems: "center", marginTop: 18 },
  messageText: { color: COLORS.brown, fontSize: 16, lineHeight: 25, fontStyle: "italic", textAlign: "center" }
});