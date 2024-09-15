import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastIndex = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="h-full">
      <TouchableOpacity
        className="items-end self-end p-5"
        onPress={() => router.replace("/(auth)/sign-in")}
      >
        <Text className="font-JakartaBold text-lg">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        onIndexChanged={(index) => setActiveIndex(index)}
        loop={false}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="justify-center items-center">
            <View className="w-full">
              <Image
                source={item.image}
                className="w-full h-[400px]"
                resizeMode="contain"
              />
            </View>
            <View className="p-5">
              <Text className="font-bold text-3xl text-center">
                {item.title}
              </Text>
              <Text className="text-[#858585] font-JakartaSemiBold text-center mt-8">
                Your journey begins with Ryde. Find your ideal ride
                effortlessly.
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className="p-4">
        <CustomButton
          title={isLastIndex ? "Get started" : "Next"}
          onPress={() =>
            isLastIndex
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
