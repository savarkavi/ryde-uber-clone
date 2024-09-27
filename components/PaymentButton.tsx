import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";

const PaymentButton = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  const confirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback
  ) => {
    // explained later
  };

  const didTapCheckoutButton = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        return;
      } else {
        setSuccess(false);
        Alert.alert("Error", error.message);
      }
    } else {
      setSuccess(true);
    }
  };

  return (
    <View className="my-4 mx-4">
      <CustomButton title="Confirm Ride" onPress={didTapCheckoutButton} />
    </View>
  );
};

export default PaymentButton;
