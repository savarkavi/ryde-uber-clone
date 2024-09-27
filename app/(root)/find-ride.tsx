import { View, Text } from "react-native";
import React from "react";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    destinationAddress,
    userAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout>
      <View className="p-3 flex-col space-y-4">
        <View className="flex-col">
          <Text className="font-JakartaSemiBold">From</Text>
          <GoogleTextInput
            icon={icons.target}
            handlePress={(location) => setUserLocation(location)}
            containerStyle="my-4"
            initialLocation={userAddress!}
          />
        </View>
        <View className="flex-col">
          <Text className="font-JakartaSemiBold">To</Text>
          <GoogleTextInput
            icon={icons.map}
            handlePress={(location) => setDestinationLocation(location)}
            containerStyle="my-4"
            initialLocation={destinationAddress!}
          />
        </View>
        <CustomButton
          title="Book now"
          classNames="mt-4"
          onPress={() => router.push("/(root)/confirm-ride")}
        />
      </View>
    </RideLayout>
  );
};

export default FindRide;
