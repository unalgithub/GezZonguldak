import { View, StyleSheet, Dimensions,Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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

const MapTab = ({ route }) => {
  const mapRef = useRef(null);
  const initialRegion = {
    latitude: 41.4565,
    longitude: 31.7987,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerCoordinates = [
    { latitude: 41.455712449162085, longitude: 31.786199842580277, title: "Zonguldak Limanı",markerIcon: require('../../assets/liman.png'), },
    { latitude: 41.4475449782086, longitude: 31.8145918249371, title: "Zonguldak maden müzesi" ,markerIcon: require('../../assets/müze.png'),},
    { latitude: 41.44076328395787, longitude: 31.833154139771036 , title: "Gökgöl mağarası",markerIcon: require('../../assets/mağara.png'), },
    { latitude: 41.561906743741226, longitude: 32.024309313402924 , title: "Filyos Çarşısı",markerIcon: require('../../assets/çarşı.png'), },
    { latitude: 41.573871476167, longitude: 32.03193481279399, title: "Tios antik kenti" ,markerIcon: require('../../assets/antik.png'), },
    { latitude: 41.45266677764984, longitude: 31.98818438970079 , title: "Çakırköy mağarası",markerIcon: require('../../assets/mağara.png'), },
    { latitude: 41.4129454559085, longitude: 31.793449747890175 , title: "Ulutan barajı",markerIcon: require('../../assets/baraj.png'), },
    { latitude: 41.05379472948139, longitude: 31.654335795574134 , title: "Gümeli porsuk ağacı" ,markerIcon: require('../../assets/ağaç.png'),},
    { latitude: 41.05227232173551, longitude: 31.678859394631534 , title: "Bölüklü yaylası",markerIcon: require('../../assets/yayla.png'), },
    { latitude: 41.317708629297826, longitude: 31.451722071694032 , title: "Cehennemağzı mağaraları" ,markerIcon: require('../../assets/mağara.png'),},
    { latitude:41.46428421566327, longitude: 31.787217982614084 , title: "Deniz feneri" ,markerIcon: require('../../assets/fener.png'),},
    { latitude: 41.47213804942162, longitude: 31.80301024315775 , title: "Kapuz plajı" ,markerIcon: require('../../assets/plaj.png'),},
    { latitude:41.39646333586999, longitude: 31.84593684165429 , title: "Zonguldak kent ormanı",markerIcon: require('../../assets/orman.png'), },
    { latitude: 41.225547043113416, longitude: 31.964600830992776, title: "Bastoncular çarşısı" ,markerIcon: require('../../assets/çarşı.png'), },
    { latitude: 41.40840258466706, longitude:31.68452254157608 , title: "Ilıksu plajı" ,markerIcon: require('../../assets/plaj.png'),},
    { latitude: 41.465387392013234, longitude: 31.78834865377808 , title: "Varagel tüneli",markerIcon: require('../../assets/tunel.png'), },
    { latitude: 41.42464796014042, longitude:31.818361901962916 , title: "Harmankaya şelalesi",markerIcon: require('../../assets/şelale.png'), },
    
    
  ];
  

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
        customMapStyle={mapStyle}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {markerCoordinates.map((marker, index) => (
           <Marker
           key={index}
           coordinate={marker}
           title={marker.title}
         >
           <Image source={marker.markerIcon} style={{ width: 30, height: 30 }} />
         </Marker>
          
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default MapTab;
