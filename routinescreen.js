import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme";
import { Button, Card, Header, Page } from "../components/UI";
import { useStorage } from "../storage/StorageContext";

export default function RoutineScreen() {
  const { getDay, toggleRoutine, addRoutine, deleteRoutine } = useStorage();
  const day = getDay();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const add = () => {
    if (!title.trim() || !time.trim()) {
      Alert.alert("Missing details", "Enter a routine name and time.");
      return;
    }
    addRoutine({ id: `${Date.now()}`, title: title.trim(), time: time.trim(), done: false });
    setTitle("");
    setTime("");
  };

  return (
    <Page>
      <Header title="My Routine 🌻" subtitle="Plan • Track • Achieve" />

      {day.routines.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => toggleRoutine(item.id)} activeOpacity={0.85}>
          <Card style={styles.item}>
            <View style={styles.flower}><Text>🌻</Text></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={[styles.name, item.done && styles.done]}>{item.title}</Text>
            </View>
            <View style={[styles.check, item.done && styles.checkDone]}>
              {item.done ? <Text style={styles.checkText}>✓</Text> : null}
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <Card>
        <Text style={styles.formTitle}>Add routine</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Study / Exercise / Reading" placeholderTextColor={COLORS.muted} />
        <TextInput value={time} onChangeText={setTime} style={styles.input} placeholder="07:00 AM" placeholderTextColor={COLORS.muted} />
        <Button title="Add routine" active onPress={add} />
      </Card>

      <Text style={styles.hint}>Tap a routine to mark it complete.</Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center" },
  flower: { width: 46, height: 46, borderRadius: 23, backgroundColor: COLORS.paleYellow, alignItems: "center", justifyContent: "center" },
  time: { color: COLORS.muted, fontSize: 11 },
  name: { color: COLORS.brown, fontSize: 16, fontWeight: "800", marginTop: 3 },
  done: { textDecorationLine: "line-through", color: COLORS.olive },
  check: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  checkDone: { backgroundColor: COLORS.yellow, borderColor: COLORS.yellow },
  checkText: { color: COLORS.brown, fontWeight: "900" },
  formTitle: { color: COLORS.brown, fontSize: 18, fontWeight: "900", marginBottom: 12 },
  input: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 12, color: COLORS.brown, marginBottom: 10 },
  hint: { color: COLORS.muted, textAlign: "center", fontSize: 12 }
});