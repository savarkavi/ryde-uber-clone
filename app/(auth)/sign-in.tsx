import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignIn = () => {
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
            resizeMode="cover"
            className="w-full h-[230px]"
          />
          <Text className="text-2xl font-JakartaSemiBold font-semibold absolute bottom-3 left-5">
            Sign In To Your Account
          </Text>
        </View>
        <View className="px-4">
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
            title="Sign In"
            onPress={onSignUpPress}
            classNames="mt-6"
          />
          <OAuth />
          <View className="flex-row space-x-2 justify-center mt-6">
            <Text>Dont have an account?</Text>
            <Link href={"/(auth)/sign-up"} className="text-primary-500">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
