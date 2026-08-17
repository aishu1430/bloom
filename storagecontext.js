import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@bloomday_v1";

const todayKey = () => new Date().toISOString().slice(0, 10);

const defaultData = {
  settings: {
    name: "Sunshine",
    waterGoal: 2000
  },
  days: {}
};

const defaultDay = () => ({
  water: 0,
  meals: [
    { id: "breakfast", type: "Breakfast", time: "08:00 AM", foods: "Oats + Honey • Banana • Milk", done: false },
    { id: "lunch", type: "Lunch", time: "01:00 PM", foods: "Rice • Vegetables • Curd", done: false },
    { id: "dinner", type: "Dinner", time: "08:00 PM", foods: "Roti • Vegetable Curry • Salad", done: false }
  ],
  routines: [
    { id: "wake", time: "06:30 AM", title: "Wake Up", done: false },
    { id: "exercise", time: "07:00 AM", title: "Exercise / Walk", done: false },
    { id: "study", time: "10:00 AM", title: "Study / Work", done: false },
    { id: "break", time: "05:00 PM", title: "Walk / Break", done: false },
    { id: "sleep", time: "10:30 PM", title: "Sleep", done: false }
  ]
});

const StorageContext = createContext(null);

export function StorageProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setData({ ...defaultData, ...JSON.parse(raw) });
      } catch (e) {
        console.log("Storage load error", e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(KEY, JSON.stringify(data)).catch(console.log);
  }, [data, ready]);

  const ensureDay = (state, key = todayKey()) => ({
    ...state,
    days: {
      ...state.days,
      [key]: state.days[key] || defaultDay()
    }
  });

  const getDay = (key = todayKey()) => data.days[key] || defaultDay();

  const updateDay = (patch, key = todayKey()) => {
    setData(prev => {
      const next = ensureDay(prev, key);
      next.days[key] = { ...next.days[key], ...patch };
      return { ...next };
    });
  };

  const toggleMeal = (id, key = todayKey()) => {
    const day = getDay(key);
    updateDay({ meals: day.meals.map(m => m.id === id ? { ...m, done: !m.done } : m) }, key);
  };

  const saveMeal = (meal, key = todayKey()) => {
    const day = getDay(key);
    const exists = day.meals.some(m => m.id === meal.id);
    const meals = exists ? day.meals.map(m => m.id === meal.id ? meal : m) : [...day.meals, meal];
    updateDay({ meals }, key);
  };

  const deleteMeal = (id, key = todayKey()) => {
    const day = getDay(key);
    updateDay({ meals: day.meals.filter(m => m.id !== id) }, key);
  };

  const toggleRoutine = (id, key = todayKey()) => {
    const day = getDay(key);
    updateDay({ routines: day.routines.map(r => r.id === id ? { ...r, done: !r.done } : r) }, key);
  };

  const addRoutine = (routine, key = todayKey()) => {
    const day = getDay(key);
    updateDay({ routines: [...day.routines, routine] }, key);
  };

  const deleteRoutine = (id, key = todayKey()) => {
    const day = getDay(key);
    updateDay({ routines: day.routines.filter(r => r.id !== id) }, key);
  };

  const addWater = (amount, key = todayKey()) => {
    const day = getDay(key);
    const goal = data.settings.waterGoal;
    updateDay({ water: Math.min(goal, Math.max(0, day.water + amount)) }, key);
  };

  const setWaterGoal = (goal) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, waterGoal: goal } }));
  };

  const setName = (name) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, name } }));
  };

  const resetToday = () => {
    setData(prev => ({
      ...prev,
      days: { ...prev.days, [todayKey()]: defaultDay() }
    }));
  };

  const value = useMemo(() => ({
    data, ready, todayKey, getDay, updateDay, toggleMeal, saveMeal, deleteMeal,
    toggleRoutine, addRoutine, deleteRoutine, addWater, setWaterGoal, setName, resetToday
  }), [data, ready]);

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}

export function useStorage() {
  const value = useContext(StorageContext);
  if (!value) throw new Error("useStorage must be used inside StorageProvider");
  return value;
}