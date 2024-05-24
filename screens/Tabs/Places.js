import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlacesTab = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getAllPlaces();

    async function getAllPlaces() {
      try {
        const _response = await axiosInstance
          .get("/places/allPlaces")
          .then((res) => res.data);

        setPlaces(_response);
      } catch (error) {
        console.log("error in PlacesTab places get all : ", error);
      }
    }
  }, []);

  const addToFavorites = async (place) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = favorites ? JSON.parse(favorites) : [];
      const isAlreadyFavorite = favoritesArray.some((fav) => fav._id === place._id);

      if (!isAlreadyFavorite) {
        favoritesArray.push(place);
        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.log("Error adding to favorites: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Zonguldak'taki Harika Yerleri Keşfedin
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {places?.length > 0 &&
          places?.map((place, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { place })}
              >
                <Image source={{ uri: place.imageUrl }} style={styles.image} />
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.description}>{place.description}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToFavorites(place)}
              >
                <Text style={styles.buttonText}>ROTAYA EKLE</Text>
              </TouchableOpacity>
            </View>
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
  button: {
    backgroundColor: "#344955", // Button background color matching the tab bar
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#F7F7F7", // Button text color for readability
    fontWeight: "bold",
  },
  bottomSpacer: {
    height: 80,
  },
});

export default PlacesTab;
