import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";
import { ActivityIndicator, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  if (!userLatitude && !userLongitude)
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  console.log(region);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full"
      showsUserLocation={true}
      initialRegion={region}
    ></MapView>
  );
};

export default Map;
