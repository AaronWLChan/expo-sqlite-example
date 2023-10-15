import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar as RNStatusBar,
} from "react-native";
import TodoList from "./src/TodoList";
import { useEffect } from "react";
import db, { initDatabase } from "./sqlite/sqlite";

export default function App() {
  useEffect(() => {
    initDatabase(db);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TodoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
});
