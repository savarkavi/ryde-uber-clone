import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full"
      showsUserLocation={true}
    ></MapView>
  );
};

export default Map;
