import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const InputField = ({ label }) => {
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback>
        <View>
          <Text>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
