import { View } from "react-native";
import MapPin from "@assets/images/svgs/map-pin.svg";
import React from "react";
import clsx from "clsx";

type Props = {
  isPinDrag: boolean;
};

const MapMarker = ({ isPinDrag }: Props) => {
  return (
    <View
      pointerEvents="none"
      className={clsx(
        "absolute self-centers top-1/2 left-1/2 -ml-6 transition-all",
        isPinDrag ? "-mt-16 rotate-12" : "-mt-12  rotate-0",
      )}
    >
      <MapPin width={43} height={43} />
    </View>
  );
};

export default MapMarker;
