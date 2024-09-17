import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = () => {};

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
        <View className="p-4">
          <InputField
            label="Name"
            icon={icons.person}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
          />
          <InputField
            label="Email"
            icon={icons.email}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
          />
          <InputField
            label="Password"
            icon={icons.lock}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) =>
              setFormData({ ...formData, password: value })
            }
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            classNames="mt-8"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
