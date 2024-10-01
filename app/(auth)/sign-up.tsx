import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        setVerification({ ...verification, state: "success" });
        await setActive({ session: completeSignUp.createdSessionId });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

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
            Create Your Account
          </Text>
        </View>
        <View className="px-4">
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
          {/* <OAuth /> */}
          <View className="flex-row space-x-2 justify-center mt-6">
            <Text>Already have an account?</Text>
            <Link href={"/(auth)/sign-in"} className="text-primary-500">
              Sign In
            </Link>
          </View>
        </View>
        <ReactNativeModal isVisible={verification.state === "pending"}>
          <View className="w-full h-[300px] rounded-xl bg-white p-4 space-y-2">
            <Text className="font-JakartaSemiBold text-2xl">Verification</Text>
            <Text className="text-gray-400">
              We've sent you a verification code. Check the Email you entered.
            </Text>
            <InputField
              label="code"
              labelStyle="mt-6"
              icon={icons.lock}
              value={verification.code}
              placeholder="123456"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 mt-2">{verification.error}</Text>
            )}
            <CustomButton
              title="Verify"
              onPress={onPressVerify}
              classNames="mt-2"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="w-full h-[300px] rounded-xl bg-white items-center px-4 space-y-4">
            <Image
              source={images.check}
              className="w-[80px] h-[80px] mt-8"
              resizeMode="contain"
            />
            <Text className="font-JakartaSemiBold text-2xl">Verified</Text>
            <Text className="text-gray-400 text-center">
              You have successfully verified your account
            </Text>
            <CustomButton
              title="Country roads take me home"
              classNames="mt-4"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
