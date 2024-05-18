import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const DetailScreen = ({ route }) => {
  const { place } = route.params;

  const placeDescriptions = {
    "Kozlu Sahili":
      "Kozlu Sahili, altın kumları ve sakin dalgalarıyla huzurlu bir plajdır. Gün batımını izlemek ve güzel manzaranın tadını çıkarmak için mükemmel bir yerdir.",
    Çaycuma:
      "Çaycuma, yeşillikler içinde huzurlu bir kaçamak sunar. Doğa severler ve sessizlik arayanlar için ideal bir yerdir.",
    Ereğli:
      "Ereğli, tarihi ve kültürel zenginlikleri ile ünlüdür. Muhteşem manzaralar ve antik kalıntılar sunar.",
    Devrek:
      "Devrek, el yapımı ahşap bastonları ile tanınır. Doğal güzelliklerle çevrili olan ilçe, kültür ve doğa severler için harika bir destinasyondur.",
    Filyos:
      "Filyos, tarihi kalıntılar ve güzel bir plaj sunar. Doğal güzellikler ve tarih bir arada, herkes için bir şeyler sunar.",
  };

  // Örnek resim URL'leri
  const images = [
    "https://cdn.pixabay.com/photo/2015/09/18/20/17/eiffel-tower-950359_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/02/21/21/00/great-wall-of-china-2088667_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/05/08/rocks-1867416_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/01/19/17/42/sydney-opera-house-1149949_1280.jpg",
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: place.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.description}>{place.description}</Text>
          <Text style={styles.details}>{placeDescriptions[place.name]}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Rotaya Ekle</Text>
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
  details: {
    fontSize: 16,
    color: "#333",
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
  button: {
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
