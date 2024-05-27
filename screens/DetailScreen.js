import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route }) => {
  const { place } = route.params;
  const navigation = useNavigation();

  const handleNavigateToMap = async () => {
    try {
      const shownPlaces = await AsyncStorage.getItem("shownPlaces");
      const shownPlacesArray = shownPlaces ? JSON.parse(shownPlaces) : [];
      if (!shownPlacesArray.includes(place._id)) {
        shownPlacesArray.push(place._id);
        await AsyncStorage.setItem("shownPlaces", JSON.stringify(shownPlacesArray));
      }
    } catch (error) {
      console.log("Error saving shown place: ", error);
    }
    navigation.navigate('Map', {
      selectedPlace: place
    });
  };

  const addToFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = favorites ? JSON.parse(favorites) : [];
      const isAlreadyFavorite = favoritesArray.some((fav) => fav._id === place._id);

      if (!isAlreadyFavorite) {
        favoritesArray.push(place);
        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
        Alert.alert("Başarılı", "Rotaya Eklendi");
      } else {
        Alert.alert("Bilgi", "Rota Kısmında zaten mevcut.");
      }
    } catch (error) {
      console.log("Error adding to favorites: ", error);
      Alert.alert("Hata", "Rota eklenirken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: place.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.description}>{place.description}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}
          >
            {place.galleryImages && place.galleryImages.length > 0 ? (
              place.galleryImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.galleryImage}
                />
              ))
            ) : (
              <Text style={styles.noImagesText}>No images available</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.routeButton} onPress={handleNavigateToMap}>
        <Text style={styles.routeButtonText}>Haritada Göster</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={addToFavorites}>
        <Text style={styles.addButtonText}>Rotaya Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  imageGallery: {
    flexDirection: "row",
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: "#666",
    alignSelf: "center",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#344955",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  routeButton: {
    backgroundColor: "#344955",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 150,
    left: 0,
    right: 0,
  },
  routeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
