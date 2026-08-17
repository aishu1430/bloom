import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SUNFLOWER } from "../theme";
import { Button, Card, Header, Page, ProgressBar } from "../components/UI";
import { useStorage } from "../storage/StorageContext";

export default function HomeScreen({ navigation }) {
  const { data, getDay, toggleMeal, addWater } = useStorage();
  const day = getDay();
  const mealsDone = day.meals.filter(m => m.done).length;
  const routinesDone = day.routines.filter(r => r.done).length;
  const total = day.meals.length + day.routines.length + 1;
  const completed = mealsDone + routinesDone + (day.water >= data.settings.waterGoal ? 1 : 0);
  const progress = total ? Math.round(completed / total * 100) : 0;
  const waterPct = Math.round(day.water / data.settings.waterGoal * 100);

  return (
    <Page>
      <Header title={`Hi, ${data.settings.name} 🌻`} subtitle="Make today beautiful, one little habit at a time." />

      <View style={styles.hero}>
        <Image source={{ uri: SUNFLOWER }} style={styles.heroImage} />
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Small steps,</Text>
          <Text style={styles.heroTitle}>big blooms.</Text>
          <Text style={styles.heroCaption}>Your day is yours to grow ♡</Text>
        </View>
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.cardTitle}>Today's Progress</Text>
            <Text style={styles.bigNumber}>{progress}%</Text>
            <Text style={styles.muted}>{completed} of {total} goals completed</Text>
          </View>
          <View style={styles.circle}><Text style={styles.circleText}>{progress}%</Text></View>
        </View>
        <ProgressBar value={progress} color={COLORS.yellow} />
      </Card>

      <Text style={styles.section}>Today's Meals</Text>

      <View style={styles.grid}>
        {day.meals.slice(0, 3).map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <Text style={styles.mealIcon}>{meal.id === "breakfast" ? "☀" : meal.id === "lunch" ? "◉" : "◒"}</Text>
            <Text style={styles.mealTitle}>{meal.type}</Text>
            <Text style={styles.mealTime}>{meal.time}</Text>
            <Button title={meal.done ? "✓ Completed" : "Mark done"} active={meal.done} onPress={() => toggleMeal(meal.id)} />
          </View>
        ))}
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.cardTitle}>Hydration</Text>
            <Text style={styles.muted}>Stay hydrated, stay glowing.</Text>
          </View>
          <Text style={styles.waterAmount}>{day.water} ml</Text>
        </View>
        <ProgressBar value={waterPct} />
        <View style={styles.waterRow}>
          {[100, 250, 500].map(a => (
            <Button key={a} title={`+${a} ml`} active={a === 250} onPress={() => addWater(a)} style={{ flex: 1, marginHorizontal: 3 }} />
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Water")} style={{ marginTop: 12 }}>
          <Text style={styles.link}>Open full water tracker →</Text>
        </TouchableOpacity>
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  hero: { height: 210, borderRadius: 28, overflow: "hidden", marginBottom: 15 },
  heroImage: { width: "100%", height: "100%" },
  heroText: { position: "absolute", left: 20, bottom: 20 },
  heroTitle: { color: "#FFF", fontSize: 25, fontWeight: "800", textShadowColor: "rgba(0,0,0,.35)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 },
  heroCaption: { color: "#FFF", fontSize: 12, marginTop: 6, textShadowColor: "rgba(0,0,0,.35)", textShadowRadius: 4 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: 17, fontWeight: "800", color: COLORS.brown },
  bigNumber: { fontSize: 36, fontWeight: "900", color: COLORS.brown, marginTop: 6 },
  muted: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
  circle: { width: 88, height: 88, borderRadius: 44, borderWidth: 9, borderColor: COLORS.yellow, alignItems: "center", justifyContent: "center" },
  circleText: { color: COLORS.brown, fontWeight: "900", fontSize: 17 },
  section: { fontSize: 20, fontWeight: "800", color: COLORS.brown, marginBottom: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  mealCard: { width: "48.5%", backgroundColor: COLORS.card, borderRadius: 22, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  mealIcon: { fontSize: 25, color: COLORS.yellow, marginBottom: 6 },
  mealTitle: { fontSize: 16, fontWeight: "800", color: COLORS.brown },
  mealTime: { fontSize: 12, color: COLORS.muted, marginVertical: 8 },
  waterAmount: { fontSize: 18, color: COLORS.olive, fontWeight: "900" },
  waterRow: { flexDirection: "row", marginTop: 14 },
  link: { color: COLORS.olive, fontWeight: "800", fontSize: 12 }
});