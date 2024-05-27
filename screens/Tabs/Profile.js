import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

export default function ProfileTab({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [shownPlaces, setShownPlaces] = useState([]);
  const [logoutIconColor, setLogoutIconColor] = useState("black");

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

    async function getShownPlaces() {
      const shownPlaces = await AsyncStorage.getItem("shownPlaces");
      setShownPlaces(shownPlaces ? JSON.parse(shownPlaces) : []);
    }

    getUserInfo();
    getFavorites();
    getShownPlaces();
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

      async function getShownPlaces() {
        const shownPlaces = await AsyncStorage.getItem("shownPlaces");
        setShownPlaces(shownPlaces ? JSON.parse(shownPlaces) : []);
      }

      getFavorites();
      getShownPlaces();
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.removeItem("favorites");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  const createGoogleMapsRoute = () => {
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const origin = `&origin=${userLocation.latitude},${userLocation.longitude}`;
    const destination = `&destination=${favorites[favorites.length - 1].latitude},${favorites[favorites.length - 1].longitude}`;
    const waypoints = favorites.slice(0, -1).map(place => `${place.latitude},${place.longitude}`).join('|');
    const waypointsParam = waypoints ? `&waypoints=${waypoints}` : '';
    const travelMode = "&travelmode=driving";
    const url = `${baseUrl}${origin}${destination}${waypointsParam}${travelMode}`;

    Linking.openURL(url);
  };

  const handleLogoutPressIn = () => {
    setLogoutIconColor("white");
  };

  const handleLogoutPressOut = () => {
    setLogoutIconColor("black");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>            ROTALAR</Text>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          onPressIn={handleLogoutPressIn}
          onPressOut={handleLogoutPressOut}
        >
          <Ionicons name="exit" size={24} color={logoutIconColor} />
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
      {favorites.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz favorilere eklenmiş bir yer yok.</Text>
        </View>
      )}
      {favorites.length > 0 && (
        <>
          <Text style={styles.infoText}>
            Gezilecek yerler, konumunuza yakınlığa göre sıralanmıştır.
          </Text>
          <TouchableOpacity style={styles.routeButton} onPress={createGoogleMapsRoute}>
            <Text style={styles.routeButtonText}>Google Maps'te Rota Oluştur</Text>
          </TouchableOpacity>
        </>
      )}
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {favorites?.length > 0 &&
          favorites?.map((place, index) => {
            const distance = getDistance(userLocation, { latitude: place.latitude, longitude: place.longitude });
            const isShown = shownPlaces.includes(place._id);
            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate("Detail", { place })}
              >
                <Image source={{ uri: place.imageUrl }} style={styles.image} />
                {isShown && <View style={styles.shownBadge}><Text style={styles.shownBadgeText}>ROTA OLUŞTURULDU</Text></View>}
                <Text style={styles.distanceBadge}>{distance.toFixed(2)} km</Text>
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.distance}>Uzaklık: {distance.toFixed(2)} km</Text>
                <Text style={styles.description}>{place.description}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromFavorites(place._id)}
                >
                  <Text style={styles.removeButtonText}>Rotadan Kaldır</Text>
                </TouchableOpacity>
              </TouchableOpacity>
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
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#344955",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: 'center',
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
  distanceBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#344955',
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  shownBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  },
  shownBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
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
  removeButton: {
    backgroundColor: "#344955",
    paddingVertical: 10,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomSpacer: {
    height: 50,
  },
  routeButton: {
    backgroundColor: "#344955",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  routeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
