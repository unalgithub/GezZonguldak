import { View, Text, ScrollView, Image, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileTab({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const userLocation = {
    latitude: 41.43548687961983,
    longitude: 31.754350794592725,
  };

  useEffect(() => {
    async function getUserInfo() {
      const _user = await AsyncStorage.getItem("userInfo");
      setUserInfo(JSON.parse(_user));
    }

    async function getFavorites() {
      const favs = await AsyncStorage.getItem("favorites");
      const favoritesArray = favs ? JSON.parse(favs) : [];
      const sortedFavorites = favoritesArray.sort((a, b) => {
        const distanceA = getDistance(userLocation, { latitude: a.latitude, longitude: a.longitude });
        const distanceB = getDistance(userLocation, { latitude: b.latitude, longitude: b.longitude });
        return distanceA - distanceB;
      });
      setFavorites(sortedFavorites);
    }

    getUserInfo();
    getFavorites();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function getFavorites() {
        const favs = await AsyncStorage.getItem("favorites");
        const favoritesArray = favs ? JSON.parse(favs) : [];
        const sortedFavorites = favoritesArray.sort((a, b) => {
          const distanceA = getDistance(userLocation, { latitude: a.latitude, longitude: a.longitude });
          const distanceB = getDistance(userLocation, { latitude: b.latitude, longitude: b.longitude });
          return distanceA - distanceB;
        });
        setFavorites(sortedFavorites);
      }
      getFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const removeFromFavorites = async (placeId) => {
    try {
      const favs = await AsyncStorage.getItem("favorites");
      let favoritesArray = favs ? JSON.parse(favs) : [];
      favoritesArray = favoritesArray.filter((place) => place._id !== placeId);
      await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
      const sortedFavorites = favoritesArray.sort((a, b) => {
        const distanceA = getDistance(userLocation, { latitude: a.latitude, longitude: a.longitude });
        const distanceB = getDistance(userLocation, { latitude: b.latitude, longitude: b.longitude });
        return distanceA - distanceB;
      });
      setFavorites(sortedFavorites);
    } catch (error) {
      console.log("Error removing from favorites: ", error);
    }
  };

  const getDistance = (location1, location2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (location2.latitude - location1.latitude) * Math.PI / 180;
    const dLon = (location2.longitude - location1.longitude) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat) / 2 + Math.cos(location1.latitude * Math.PI / 180) * Math.cos(location2.latitude * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Bilgileri</Text>
      <Text>Kullanıcı Email : {userInfo?.email}</Text>
      <Text>Kullanıcı Şifre : {userInfo?.password}</Text>

      <Button
        title="Çıkış Yap"
        onPress={async () => {
          await AsyncStorage.removeItem("userInfo");
          navigation.navigate("Welcome");
        }}
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
      />

      <Text style={styles.header}>Favori Yerler</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {favorites?.length > 0 &&
          favorites?.map((place, index) => {
            const distance = getDistance(userLocation, { latitude: place.latitude, longitude: place.longitude });
            return (
              <View key={index} style={styles.card}>
                <Image source={{ uri: place.imageUrl }} style={styles.image} />
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.distance}>Uzaklık: {distance.toFixed(2)} km</Text>
                <Text style={styles.description}>{place.description}</Text>
                <Button
                  title="Favorilerden Kaldır"
                  onPress={() => removeFromFavorites(place._id)}
                />
              </View>
            );
          })}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    width: "100%",
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
  distance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    color: "#555",
  },
  bottomSpacer: {
    height: 50,
  },
});


