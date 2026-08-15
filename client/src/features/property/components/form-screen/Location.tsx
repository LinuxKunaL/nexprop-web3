import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { TCoords } from "@components/maps/types";
import CustomMapView from "@components/maps/CustomMapView";
import InputController from "@components/inputs/InputController";
import { getPlaceName } from "@services/location/geocodeService";
import { PropertyFormContext } from "@features/property/form-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const Location = () => {
  const {
    control,
    getValues,
    reset,
    trigger,
    errorTabLevel,
    setErrorTabLevel,
  } = useContext(PropertyFormContext);

  useEffect(() => {
    if (errorTabLevel.trigger && errorTabLevel.tab === "Location") {
      trigger().finally(() => {
        setErrorTabLevel({ tab: null, trigger: false });
      });
    }
  }, [errorTabLevel, trigger]);

  const findAddressByCoords = async (coords: TCoords) => {
    try {
      const address = await getPlaceName(coords);
      reset({
        ...getValues(),
        address: {
          country: address?.country || "",
          state: address?.state || "",
          zipCode: address?.postcode || NaN,
          addressLine: `${address?.name} - ${address?.city}`,
          coordinates: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView
        bottomOffset={10}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col gap-4 flex-1 h-full mb-5">
          <CustomMapView
            height="fixed"
            initialRegion="live"
            onSearchButton={findAddressByCoords}
          />
          <Text className="text-muted dark:text-muted-dark font-sans">
            Drag the pin to adjust the location, or long press anywhere on the
            map to place it.
          </Text>
          <InputController
            isRequired
            control={control}
            name="address.country"
            placeholder="Country"
          />
          <InputController
            isRequired
            control={control}
            name="address.state"
            placeholder="State"
          />
          <InputController
            isRequired
            control={control}
            name="address.zipCode"
            placeholder="Zip Code"
          />
          <InputController
            isRequired
            control={control}
            name="address.addressLine"
            placeholder="Address Line"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Location;
