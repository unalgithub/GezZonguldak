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
  TextInput,
  Dimensions
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axiosInstance from "../../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlacesTab = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    getAllPlaces();

    async function getAllPlaces() {
      try {
        const _response = await axiosInstance
          .get("/places/allPlaces")
          .then((res) => res.data);

        setPlaces(_response);
        setFilteredPlaces(_response);
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

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    const filtered = places.filter(place => place.around === filter);
    setFilteredPlaces(filtered);
  };

  const clearFilter = () => {
    setSelectedFilter(null);
    setFilteredPlaces(places);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = places.filter(place =>
        place.name.toLowerCase().includes(text.toLowerCase()) ||
        place.around.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces(places);
    }
  };

  const handleNextImage = (placeId) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [placeId]: (prevState[placeId] || 0) + 1
    }));
  };

  const renderFilterButton = (icon, label, filter, color) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.selectedFilterButton,
      ]}
      onPress={() => handleFilterPress(filter)}
    >
      <View style={[styles.iconBackground, { backgroundColor: color }]}>{icon}</View>
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Zonguldak'ı Keşfet
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Konum ara..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.filtersContainer}>
        {renderFilterButton(<FontAwesome5 name="umbrella-beach" size={24} color="white" />, 'Sahil', 'sahil', '#10439F')}
        {renderFilterButton(<MaterialIcons name="museum" size={24} color="white" />, 'Müze', 'müze', '#0C0C0C')}
        {renderFilterButton(<Foundation name="trees" size={24} color="white" />, 'Orman', 'orman', '#0A6847')}
        {renderFilterButton(<MaterialCommunityIcons name="diamond-stone" size={24} color="white" />, 'Mağara', 'mağara', '#C7C8CC')}
        {renderFilterButton(<FontAwesome5 name="umbrella-beach" size={24} color="white" />, 'Plaj', 'plaj', '#5AB2FF')}
        {selectedFilter && (
          <TouchableOpacity style={styles.clearFilterButton} onPress={clearFilter}>
            <Text style={styles.clearFilterButtonText}>Filtreyi Temizle</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {filteredPlaces?.length > 0 &&
          filteredPlaces?.map((place, index) => {
            const imageUrlArray = [place.imageUrl, place.imageUrl2, place.imageUrl3, place.imageUrl4];
            const currentIndex = currentImageIndex[place._id] || 0;
            return (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Detail", { place })}
                >
                  <View style={[
                    styles.imageContainer,
                    !place.imageUrl2 && !place.imageUrl3 && !place.imageUrl4 && { backgroundColor: 'red' }
                  ]}>
                    <Image
                      source={{ uri: imageUrlArray[currentIndex % imageUrlArray.length] }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    {(place.imageUrl2 || place.imageUrl3 || place.imageUrl4) && (
                      <TouchableOpacity style={styles.nextButton} onPress={() => handleNextImage(place._id)}>
                        <Text style={styles.nextButtonText}>></Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{place.name}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => addToFavorites(place)}
                >
                  <Text style={styles.buttonText}>ROTAYA EKLE</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerContainer: {
    backgroundColor: "#344955",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  header: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  filterButton: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  iconBackground: {
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  clearFilterButton: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  clearFilterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  card: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: "100%",
    height: 200,
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#344955",
  },
  button: {
    backgroundColor: "#344955",
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#F7F7F7",
    fontWeight: "bold",
  },
  bottomSpacer: {
    height: 80,
  },
});

export default PlacesTab;
