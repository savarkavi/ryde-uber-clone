import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";

const PaymentButton = ({
  username,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
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
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
          const { paymentIntent, customer } = await fetchAPI(
            "/(api)/(stripe)/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: username,
                email,
                amount,
                paymentMethodId: paymentMethod.id,
              }),
            }
          );

          const { client_secret, error } = await response.json();
          if (client_secret) {
            intentCreationCallback({ clientSecret: client_secret });
          } else {
            intentCreationCallback({ error });
          }
        },
      },
    });
    if (error) {
      Alert.alert("Errror", error.message);
    }
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
