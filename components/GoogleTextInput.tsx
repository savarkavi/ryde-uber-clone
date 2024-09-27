import { Image, View } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";

const GoogleTextInput = ({
  icon,
  containerStyle,
  initialLocation,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl border ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={initialLocation ?? "Where do you want to go?"}
        debounce={200}
        onPress={(data, details = null) =>
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          })
        }
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

export default GoogleTextInput;
