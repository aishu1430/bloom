import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../theme";
import { Button, Card, Header, Page } from "../components/UI";
import { useStorage } from "../storage/StorageContext";

export default function MealsScreen() {
  const { getDay, saveMeal, deleteMeal, toggleMeal } = useStorage();
  const day = getDay();
  const [editing, setEditing] = useState(null);
  const [type, setType] = useState("Breakfast");
  const [time, setTime] = useState("08:00 AM");
  const [foods, setFoods] = useState("");

  const openEdit = (meal) => {
    setEditing(meal.id);
    setType(meal.type);
    setTime(meal.time);
    setFoods(meal.foods);
  };

  const save = () => {
    if (!type.trim() || !time.trim()) {
      Alert.alert("Missing details", "Please enter a meal name and time.");
      return;
    }
    saveMeal({
      id: editing || `${Date.now()}`,
      type: type.trim(),
      time: time.trim(),
      foods: foods.trim() || "Add your meal items",
      done: editing ? day.meals.find(m => m.id === editing)?.done || false : false
    });
    setEditing(null);
    setType("Breakfast");
    setTime("08:00 AM");
    setFoods("");
  };

  return (
    <Page>
      <Header title="Meals 🌻" subtitle="Plan your meals and keep your day nourished." />

      {day.meals.map(meal => (
        <Card key={meal.id}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{meal.type}</Text>
              <Text style={styles.time}>{meal.time}</Text>
              <Text style={styles.foods}>{meal.foods}</Text>
            </View>
            <Text style={styles.flower}>🌻</Text>
          </View>
          <View style={styles.actions}>
            <Button title={meal.done ? "✓ Completed" : "Mark done"} active={meal.done} onPress={() => toggleMeal(meal.id)} style={{ flex: 1, marginRight: 6 }} />
            <Button title="Edit" onPress={() => openEdit(meal)} style={{ flex: 1, marginHorizontal: 3 }} />
            <Button title="Delete" danger onPress={() => deleteMeal(meal.id)} style={{ flex: 1, marginLeft: 6 }} />
          </View>
        </Card>
      ))}

      <Card>
        <Text style={styles.formTitle}>{editing ? "Edit meal" : "Add a meal"}</Text>
        <Text style={styles.label}>Meal</Text>
        <TextInput value={type} onChangeText={setType} style={styles.input} placeholder="Breakfast" placeholderTextColor={COLORS.muted} />
        <Text style={styles.label}>Time</Text>
        <TextInput value={time} onChangeText={setTime} style={styles.input} placeholder="08:00 AM" placeholderTextColor={COLORS.muted} />
        <Text style={styles.label}>Food items</Text>
        <TextInput value={foods} onChangeText={setFoods} style={[styles.input, styles.multiline]} multiline placeholder="Oats + Honey • Banana • Milk" placeholderTextColor={COLORS.muted} />
        <Button title={editing ? "Save changes" : "Add meal"} active onPress={save} />
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  title: { color: COLORS.brown, fontSize: 18, fontWeight: "900" },
  time: { color: COLORS.muted, fontSize: 12, marginTop: 4 },
  foods: { color: COLORS.olive, fontSize: 12, marginTop: 8, lineHeight: 18 },
  flower: { fontSize: 38, marginLeft: 10 },
  actions: { flexDirection: "row", marginTop: 14 },
  formTitle: { color: COLORS.brown, fontSize: 18, fontWeight: "900", marginBottom: 14 },
  label: { color: COLORS.brown, fontWeight: "700", fontSize: 12, marginBottom: 6, marginTop: 8 },
  input: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, paddingHorizontal: 13, paddingVertical: 11, color: COLORS.brown },
  multiline: { minHeight: 75, textAlignVertical: "top" }
});