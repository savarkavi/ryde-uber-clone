import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import Map from "./Map";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({ children }: { children: React.ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="h-screen bg-blue-500 relative">
        <TouchableOpacity
          className="absolute top-8 left-4 z-30 shadow-lg"
          onPress={() => router.back()}
        >
          <View className="p-2 rounded-full bg-white">
            <Image
              source={icons.backArrow}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <Map />
        <BottomSheet ref={bottomSheetRef} snapPoints={["45%", "80%"]} index={0}>
          <BottomSheetView>{children}</BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
