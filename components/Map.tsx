import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();
  const { data, loading, error } = useFetch<Driver[]>("/(api)/driver");

  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (!data || !userLatitude || !userLongitude) return;

    const newMarkers = generateMarkersFromData({
      data,
      userLatitude,
      userLongitude,
    });

    setMarkers(newMarkers);
  }, [data, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length === 0 || !destinationLatitude || !destinationLongitude)
      return;

    calculateDriverTimes({
      markers,
      userLatitude,
      userLongitude,
      destinationLatitude,
      destinationLongitude,
    }).then((driversWithTimes) => {
      setDrivers(driversWithTimes!);
    });
  }, [
    destinationLatitude,
    destinationLongitude,
    markers,
    userLatitude,
    userLongitude,
    setDrivers,
  ]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || !userLatitude || !userLongitude)
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error) {
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full"
      showsUserLocation={true}
      initialRegion={region}
    >
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.driver_id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            icon={
              selectedDriver === marker.driver_id
                ? icons.selectedMarker
                : icons.marker
            }
          />
        );
      })}

      {destinationLatitude && destinationLongitude && (
        <Marker
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          title="Destination"
          icon={icons.pin}
        />
      )}

      <MapViewDirections
        origin={{
          latitude: userLatitude!,
          longitude: userLongitude!,
        }}
        destination={{
          latitude: destinationLatitude!,
          longitude: destinationLongitude!,
        }}
        apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
        strokeColor="#0286ff"
        strokeWidth={4}
      />
    </MapView>
  );
};

export default Map;
