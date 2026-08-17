import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme";
import { Card, Header, Page, ProgressBar } from "../components/UI";
import { useStorage } from "../storage/StorageContext";

export default function ProgressScreen() {
  const { data, getDay } = useStorage();
  const day = getDay();
  const meals = day.meals.length ? day.meals.filter(m => m.done).length / day.meals.length : 0;
  const routines = day.routines.length ? day.routines.filter(r => r.done).length / day.routines.length : 0;
  const water = Math.min(1, day.water / data.settings.waterGoal);
  const score = Math.round(((meals + routines + water) / 3) * 100);

  const bars = [58, 74, 82, 66, 92, 70, score];

  return (
    <Page>
      <Header title="Your Progress 🌻" subtitle="Keep growing, keep glowing." />

      <Card>
        <Text style={styles.title}>Today's score</Text>
        <Text style={styles.score}>{score}%</Text>
        <ProgressBar value={score} color={COLORS.yellow} />
      </Card>

      <Card>
        <Text style={styles.title}>This week</Text>
        <View style={styles.chart}>
          {bars.map((v, i) => (
            <View key={i} style={styles.column}>
              <View style={styles.barBg}>
                <View style={[styles.bar, { height: `${v}%` }]} />
              </View>
              <Text style={styles.day}>{["M","T","W","T","F","S","S"][i]}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.grid}>
        <Stat title="Meals" value={`${day.meals.filter(m => m.done).length}/${day.meals.length}`} icon="◒" />
        <Stat title="Water" value={`${Math.round(day.water / 250)}/${Math.ceil(data.settings.waterGoal / 250)}`} icon="◌" />
        <Stat title="Routine" value={`${day.routines.filter(r => r.done).length}/${day.routines.length}`} icon="✦" />
        <Stat title="Hydration" value={`${Math.round(water * 100)}%`} icon="🌻" />
      </View>

      <Card style={styles.quote}>
        <Text style={styles.quoteText}>“Consistency is how little habits become a beautiful life.”</Text>
      </Card>
    </Page>
  );
}

function Stat({ title, value, icon }) {
  return (
    <Card style={{ width: "48%" }}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.muted}>{title}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: COLORS.brown, fontSize: 17, fontWeight: "900" },
  score: { color: COLORS.brown, fontSize: 38, fontWeight: "900", marginVertical: 8 },
  chart: { height: 180, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 15 },
  column: { height: "100%", alignItems: "center", justifyContent: "flex-end" },
  barBg: { width: 24, height: 140, backgroundColor: COLORS.paleYellow, borderRadius: 12, justifyContent: "flex-end", overflow: "hidden" },
  bar: { width: "100%", backgroundColor: COLORS.yellow, borderRadius: 12 },
  day: { color: COLORS.muted, fontSize: 11, marginTop: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  icon: { fontSize: 25, color: COLORS.olive },
  value: { color: COLORS.brown, fontSize: 23, fontWeight: "900", marginTop: 8 },
  muted: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
  quote: { backgroundColor: COLORS.paleYellow },
  quoteText: { color: COLORS.brown, fontSize: 15, lineHeight: 23, fontStyle: "italic", textAlign: "center" }
});