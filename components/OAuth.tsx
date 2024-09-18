import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  return (
    <View className="mt-4">
      <View className="flex flex-row space-x-2 items-center">
        <View className="h-[1px] bg-black flex-1"></View>
        <Text className="text-black">Or</Text>
        <View className="h-[1px] bg-black flex-1"></View>
      </View>
      <CustomButton
        classNames="mt-4"
        title="Sign in with Google"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
      />
    </View>
  );
};

export default OAuth;
