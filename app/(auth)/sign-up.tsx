import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import InputField from "@/components/InputField";

const SignUp = () => {
  return (
    <SafeAreaView>
      <ScrollView className="bg-white h-full">
        <View className="relative">
          <Image
            source={images.signUpCar}
            resizeMode="contain"
            className="w-full h-[250px]"
          />
          <Text className="text-2xl font-JakartaSemiBold font-semibold absolute bottom-3 left-5">
            Create Your Account
          </Text>
        </View>
        <View>
          <InputField label="Name" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
