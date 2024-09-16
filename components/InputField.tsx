import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from "react-native";
import React from "react";

const InputField = ({
  label,
  labelStyle,
  icon,
  containerStyles,
  inputStyles,
}) => {
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback>
        <View className="flex flex-col space-y-3 p-4">
          <View className={`${labelStyle}`}>
            <Text className="font-semibold font-JakartaSemiBold">{label}</Text>
          </View>
          <View
            className={`border border-neutral-200 bg-neutral-100 py-2 rounded-lg ${containerStyles}`}
          >
            {icon && (
              <Image source={icon} className="w-6 h-6" resizeMode="contain" />
            )}
            <TextInput className={`${inputStyles}`} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
