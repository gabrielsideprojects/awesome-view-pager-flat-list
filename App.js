import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  FlatList,
} from "react-native";

export default function App() {
  const [viewPagerModalIsVisible, setViewPagerModalIsVisible] = useState(true);
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
  const _onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems[0].index != null) {
      if (viewableItems[0].index === 2) {
      } else {
      }
      // this.setState({ activePixKnowMoreViewPager: viewableItems[0].index });
    }
  };

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.openViewPagerModalButton}
        onPress={() => setViewPagerModalIsVisible(true)}
      >
        <Text>Open the most awesome view pager modal!</Text>
      </Pressable>
      <Modal visible={viewPagerModalIsVisible}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalSubContainer}>
            <FlatList
              contentContainerStyle={styles.alignItemsCenter}
              data={texts}
              horizontal
              keyExtractor={(item) => item.id}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Text style={styles.viewPagerTextStyle}>{item.text}</Text>
              )}
            />
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
});
