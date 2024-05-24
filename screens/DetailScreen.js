import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { place } = route.params;
  const navigation = useNavigation();

  const handleNavigateToMap = () => {
    navigation.navigate('Map', {
      selectedPlace: place
    });
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
      <TouchableOpacity style={styles.addButton}>
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
