import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  labelStyle,
  icon,
  containerStyle,
  inputStyle,
  placeholder,
  value,
  onChangeText,
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback>
        <View className="flex flex-col space-y-3 my-2">
          <View className={`${labelStyle}`}>
            <Text className="font-semibold font-JakartaSemiBold">{label}</Text>
          </View>
          <View
            className={`flex-row items-center border border-neutral-200 bg-neutral-100 rounded-2xl focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image
                source={icon}
                className="w-6 h-6 ml-2"
                resizeMode="contain"
              />
            )}
            <TextInput
              className={`${inputStyle} flex-1 p-3`}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
