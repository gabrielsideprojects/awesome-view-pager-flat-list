import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable, Alert } from "react-native";

export default function App() {
  const [viewPagerModalIsVisible, setViewPagerModalIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.openViewPagerModalButton}
        onPress={() => setViewPagerModalIsVisible(true)}
      >
        <Text>Open the most awesome view pager modal!</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  openViewPagerModalButton: {
    height: 52,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
