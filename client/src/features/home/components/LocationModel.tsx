import { HomeContext } from "../context";
import Input from "@components/inputs/Input";
import Modal from "@components/overlays/Model";
import Button from "@components/buttons/Button";
import { TCoords, TLocation } from "@components/maps/types";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import CustomMapView from "@components/maps/CustomMapView";
import { getPlaceName } from "src/services/location/geocodeService";
import { usePersistentState } from "@hooks/other/use-persistent-state";
import { useMeStore } from "@stores/me.store";

const LocationModel = () => {
  const [selectedLocation, setSelectedLocation] = useState<TLocation>(
    {} as TLocation,
  );

  const { userLocation, setUserLocation } = useMeStore();
  const [isAddressFound, setIsAddressFound] = useState(true);
  const { locationModel, setLocationModel } = useContext(HomeContext);
  const [mapDragHappen, setMapDragHappen] = useState(false);

  useEffect(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);
    }
  }, [userLocation]);

  const handleSubmitLocation = () => {
    if (selectedLocation) {
      setUserLocation(selectedLocation);
    }
  };

  const handleGetAddress = async (coords: TCoords) => {
    const address = await getPlaceName(coords);
    if (coords) {
      setMapDragHappen(true);
    }
    if (address?.status == 200) {
      setIsAddressFound(true);
      setSelectedLocation({
        city: (address?.city == undefined ? address?.name : address.city) || "",
        state: address?.state || "",
        coords,
      });
    } else {
      setSelectedLocation((pre) => ({
        city: "",
        state: "",
        coords,
      }));
      ToastAndroid.show("Address not found, Enter manually", 1);
      setIsAddressFound(false);
    }
  };

  return (
    <Modal
      setVisible={setLocationModel}
      visible={locationModel}
      title="Set location"
      height="h-2/3"
      scrollType="keyboardAware"
    >
      <View className="flex-1 gap-4">
        <View className="flex-1">
          <CustomMapView
            initialRegion={userLocation?.coords}
            onPinDrop={handleGetAddress}
          />
        </View>
        {isAddressFound ? (
          <View className="gap-1">
            <View className="flex-row gap-1">
              <Text className="font-sans text-foreground dark:text-foreground-dark">
                City:
              </Text>
              <Text className="font-sans text-muted dark:text-muted-dark italic">
                {selectedLocation.city || null}
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Text className="font-sans text-foreground dark:text-foreground-dark">
                State:
              </Text>
              <Text className="font-sans text-muted dark:text-muted-dark italic">
                {selectedLocation.state || null}
              </Text>
            </View>
          </View>
        ) : (
          <View className="gap-3">
            <Input
              onChangeText={(value) => {
                if (value) {
                  setSelectedLocation((prev) => ({
                    ...prev,
                    city: value,
                  }));
                }
              }}
              placeholder="Enter city name"
            />
            <Input
              onChangeText={(value) => {
                if (value) {
                  setSelectedLocation((prev) => ({
                    ...prev,
                    state: value,
                  }));
                }
              }}
              placeholder="Enter state name"
            />
          </View>
        )}
        <Button disabled={!mapDragHappen} onPress={handleSubmitLocation}>
          Submit
        </Button>
      </View>
    </Modal>
  );
};

export default LocationModel;
