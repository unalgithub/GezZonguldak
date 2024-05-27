import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from "../../axiosInstance";
import { useNavigation } from '@react-navigation/native';

const MapTab = ({ route }) => {
  const mapRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigation = useNavigation();

  const userLocation = {
    latitude: 41.43548687961983,
    longitude: 31.754350794592725,
  };

  const initialRegion = {
    ...userLocation,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    getAllPlaces();

    async function getAllPlaces() {
      try {
        const response = await axiosInstance.get("/places/allPlaces");
        const placesData = response.data.map((place) => ({
          ...place,
          latitude: parseFloat(place.latitude),
          longitude: parseFloat(place.longitude),
        }));
        setPlaces(placesData);
      } catch (error) {
        console.log("Error fetching places:", error);
      }
    }

    mapRef.current.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    if (route.params?.selectedPlace) {
      const { latitude, longitude } = route.params.selectedPlace;
      setSelectedPlace(route.params.selectedPlace);
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [route.params?.selectedPlace]);

  const handleMapPress = () => {
    setSelectedPlace(null);
  };

  const openInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const goToUserLocation = () => {
    mapRef.current.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={userLocation}
          title="Kendi Konumum"
          description="Burası benim manuel olarak belirlediğim konum."
        >
          <View style={styles.userLocationMarker}>
            <Ionicons name="person" size={24} color="white" />
          </View>
        </Marker>
        {places.length > 0 && places.map((place) => (
          <Marker
            key={place._id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            description={place.description}
            onPress={() => {
              setSelectedPlace(place);
              mapRef.current.animateToRegion({
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
            }}
          >
            <Image
              source={require("../../assets/gray_marker.png")}
              style={styles.markerIcon}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>
      {selectedPlace && (
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPlace(null)}
          >
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedPlace.imageUrl }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{selectedPlace.name}</Text>
            <Text style={styles.cardDescription}>{selectedPlace.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.googleMapsButton}
                onPress={() => openInGoogleMaps(selectedPlace.latitude, selectedPlace.longitude)}
              >
                <Text style={styles.buttonText}>Google Maps'te Aç</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('Detail', { place: selectedPlace })}
              >
                <Text style={styles.buttonText}>Detayları Gör</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.locationButton} onPress={goToUserLocation}>
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  card: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#344955",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleMapsButton: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    backgroundColor: "#4A6572",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsButton: {
    flex: 1,
    marginLeft: 5,
    padding: 10,
    backgroundColor: "#344955",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  locationButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#344955',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userLocationMarker: {
    backgroundColor: '#344955',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStyle = [
  {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f7f1df"
          }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#d0e3b4"
          }
      ]
  },
  {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.medical",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#fbd3da"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#bde6ab"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffe15f"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#efd151"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "black"
          }
      ]
  },
  {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#cfb2db"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#a2daf2"
          }
      ]
  }
]

export default MapTab;
