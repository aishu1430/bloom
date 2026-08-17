import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, SUNFLOWER } from "../theme";
import { Button, Card, Header, Page } from "../components/UI";
import { useStorage } from "../storage/StorageContext";
import { Image } from "react-native";

export default function ProfileScreen() {
  const { data, setName, setWaterGoal, resetToday } = useStorage();
  const [name, setNameInput] = useState(data.settings.name);
  const [goal, setGoal] = useState(String(data.settings.waterGoal));

  const save = () => {
    const numericGoal = Number(goal);
    if (!name.trim() || !numericGoal || numericGoal < 500) {
      Alert.alert("Check settings", "Enter a name and a water goal of at least 500 ml.");
      return;
    }
    setName(name.trim());
    setWaterGoal(numericGoal);
    Alert.alert("Saved", "Your BloomDay settings were updated.");
  };

  return (
    <Page>
      <Header title="Profile 🌻" subtitle="Make BloomDay yours." />

      <Card style={styles.profile}>
        <Image source={{ uri: SUNFLOWER }} style={styles.avatar} />
        <Text style={styles.profileName}>{data.settings.name}</Text>
        <Text style={styles.profileText}>Keep growing, keep glowing.</Text>
      </Card>

      <Card>
        <Text style={styles.formTitle}>Daily settings</Text>
        <Text style={styles.label}>Your name</Text>
        <TextInput value={name} onChangeText={setNameInput} style={styles.input} />
        <Text style={styles.label}>Water goal (ml)</Text>
        <TextInput value={goal} onChangeText={setGoal} keyboardType="numeric" style={styles.input} />
        <Button title="Save settings" active onPress={save} />
      </Card>

      <Card>
        <Text style={styles.formTitle}>Today</Text>
        <Text style={styles.info}>Reset today's meals, water and routine progress.</Text>
        <Button title="Reset today" danger onPress={() => Alert.alert("Reset today?", "This removes today's progress.", [
          { text: "Cancel", style: "cancel" },
          { text: "Reset", style: "destructive", onPress: resetToday }
        ])} />
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  profile: { alignItems: "center", backgroundColor: COLORS.paleYellow },
  avatar: { width: 105, height: 105, borderRadius: 53 },
  profileName: { color: COLORS.brown, fontSize: 23, fontWeight: "900", marginTop: 12 },
  profileText: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  formTitle: { color: COLORS.brown, fontSize: 18, fontWeight: "900", marginBottom: 12 },
  label: { color: COLORS.brown, fontSize: 12, fontWeight: "700", marginBottom: 6, marginTop: 7 },
  input: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 12, color: COLORS.brown, marginBottom: 8 },
  info: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginBottom: 13 }
});