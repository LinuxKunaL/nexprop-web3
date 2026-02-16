import React from "react";
import Input from "@ui/Input";
import { View, Text } from "react-native";
import CustomMapView from "@ui/CustomMapView";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { getPlaceName } from "src/services/location/geocodeService";

const Location = () => {
  return (
    <View className="flex-1 mb-6 px-4">
      <KeyboardAwareScrollView
        bottomOffset={10}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col gap-4 flex-1 h-full mb-5">
          <CustomMapView
            onPinDrop={async (coords) => {
              const address = await getPlaceName(coords);
              console.log(address);
            }}
          />
          <Text className="text-muted dark:text-muted-dark font-sans">
            Drag the pin to adjust the location, or long press anywhere on the
            map to place it.
          </Text>
          <Input placeholder="Country" />
          <Input placeholder="State" />
          <Input placeholder="Zip Code" />
          <Input placeholder="Address Line 1" />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Location;
