import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const getBgVariant = (variant: string) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";

    case "danger":
      return "bg-red-500";

    case "success":
      return "bg-green-500";

    case "outline":
      return "bg-transparent border-neutral-300";

    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariant = (variant: string) => {
  switch (variant) {
    case "primary":
      return "text-black";

    case "secondary":
      return "text-gray-100";

    case "danger":
      return "text-red-100";

    case "success":
      return "text-green-100";

    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  classNames,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className={`w-full rounded-2xl py-4 flex justify-center items-center shadow-md ${classNames} ${getBgVariant(
        bgVariant
      )}`}
    >
      {IconLeft && <IconLeft />}
      <Text className={`${getTextVariant(textVariant)} font-semibold`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
