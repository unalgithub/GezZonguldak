import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getAllPlaces();

    async function getAllPlaces() {
      try {
        const _response = await fetch(
          "http://192.168.1.106:3000/api/places/allPlaces"
        );
        const data = await _response.json();
        console.log("homescreen places data : ", data);
        setPlaces(data);
      } catch (error) {
        console.log("error in homescreen places get all : ", error);
      }
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Zonguldak'taki Harika Yerleri Keşfedin
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {places?.length > 0 &&
          places?.map((place, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate("Detail", { place })}
            >
              <Image source={{ uri: place.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{place.name}</Text>
              <Text style={styles.description}>{place.description}</Text>
            </TouchableOpacity>
          ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  card: {
    margin: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    color: "#555",
  },
  bottomSpacer: {
    height: 80,
  },
});

export default HomeScreen;
