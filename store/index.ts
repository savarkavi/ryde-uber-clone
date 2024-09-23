import { LocationStore } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserLocation: ({
    address,
    longitude,
    latitude,
  }: {
    address: string;
    longitude: number;
    latitude: number;
  }) => {
    set(() => ({
      userAddress: address,
      userLongitude: longitude,
      userLatitude: latitude,
    }));
  },
  setDestinationLocation: ({
    address,
    longitude,
    latitude,
  }: {
    address: string;
    longitude: number;
    latitude: number;
  }) => {
    set(() => ({
      destinationAddress: address,
      destinationLongitude: longitude,
      destinationLatitude: latitude,
    }));
  },
}));
