import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TCoords } from "@components/maps/types";
import CustomMapView from "@components/maps/CustomMapView";
import InputController from "@components/inputs/InputController";
import { getPlaceName } from "@services/location/geocodeService";
import { PropertyFormContext } from "@features/property/form-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const Location = () => {
  const { control, setValue } = useContext(PropertyFormContext);

  const findAddressByCoords = async (coords: TCoords) => {
    const address = await getPlaceName(coords);
    if (address) {
      setValue("address.country", address?.country || "");
      setValue("address.state", address?.state || "");
      setValue("address.zipCode", address?.postcode || 0);
      setValue("address.addressLine", `${address?.city} ${address.name}` || "");
      setValue("address.coordinates.latitude", coords.latitude);
      setValue("address.coordinates.longitude", coords.longitude);
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
