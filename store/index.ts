import { DriverStore, LocationStore, MarkerData } from "@/types/type";
import { LocationGeocodedAddress } from "expo-location";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  longUserAddress: null,
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
  setLongUserAddress: (address: LocationGeocodedAddress) => {
    set(() => ({
      longUserAddress: address,
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

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) => {
    set(() => ({ selectedDriver: driverId }));
  },
  setDrivers: (drivers: MarkerData[]) => {
    set(() => ({ drivers: drivers }));
  },
  clearSelectedDriver: () => {
    set(() => ({ selectedDriver: null }));
  },
}));
