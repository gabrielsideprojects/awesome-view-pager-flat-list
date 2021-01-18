import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import Dots from "react-native-dots-pagination";

export default function App() {
  const [activeDot, setActiveDot] = useState(0);
  const [viewPagerModalIsVisible, setViewPagerModalIsVisible] = useState(false);
  const texts = [
    {
      id: "1",
      text: "Teste 1",
    },
    {
      id: "2",
      text: "Teste 2",
    },
    {
      id: "3",
      text: "Teste 3",
    },
  ];
  // useCallback "cachea" a function para ela não ser criada a cada render.
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const handleVieweableItemsChanged = useCallback(({ viewableItems }) => {
    console.log("entrou aqui");
    setActiveDot(viewableItems[0].index);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.openViewPagerModalButton}
        onPress={() => setViewPagerModalIsVisible(true)}
      >
        <Text>Open the most awesome view pager modal!</Text>
      </Pressable>
      <Modal
        testID="viewPagerModal"
        onRequestClose={() => setViewPagerModalIsVisible(false)}
        visible={viewPagerModalIsVisible}
      >
        <View style={styles.modalMainContainer}>
          <View style={styles.modalSubContainer}>
            <FlatList
              testID="viewPagerList"
              contentContainerStyle={styles.alignItemsCenter}
              data={texts}
              horizontal
              keyExtractor={(item) => item.id}
              pagingEnabled
              onViewableItemsChanged={handleVieweableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Text
                  testID={String(index)}
                  key={index}
                  style={styles.viewPagerTextStyle}
                >
                  {item.text}
                </Text>
              )}
            />
            <View style={styles.dotsContainer}>
              <Dots
                activeDotWidth={6}
                activeDotHeight={6}
                passiveDotHeight={6}
                passiveDotWidth={6}
                length={3}
                activeColor={"#000"}
                active={activeDot}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalMainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalSubContainer: {
    backgroundColor: "#FFF",
    //  marginHorizontal: normalizeWidPx(8),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 190,
    width: 320,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
  },
  pixModalSubContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  viewPagerTextStyle: {
    width: 320,
    textAlign: "center",
  },
  alignItemsCenter: {
    alignItems: "center",
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
  dotsContainer: {
    height: 15,
    marginBottom: 10,
  },
});
