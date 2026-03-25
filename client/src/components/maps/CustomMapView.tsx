import { Image, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, {
  LongPressEvent,
  MapType,
  Marker,
  MarkerDragStartEndEvent,
  Region,
} from "react-native-maps";
import IconButton from "@components/buttons/IconButton";
import { useUserLocation } from "@hooks/map/use-user-location";
import { useTheme } from "@providers/ThemeProvider";
import { TCoords } from "./types";
import clsx from "clsx";
import MapMarker from "./MapMarker";
import Button from "@components/buttons/Button";

type Props = {
  onPinDrag?: ({ latitude, longitude }: TCoords) => null;
  onPinDrop?: ({ latitude, longitude }: TCoords) => any;
  onSearchIcon?: ({ latitude, longitude }: TCoords) => any;
  onLoad?: () => any;
  height?: "fixed" | "full";
  initialRegion?: {
    latitude: number;
    longitude: number;
  };
};

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8ec3b9" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1a3646" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
];

const CustomMapView = (props: Props) => {
  const { location } = useUserLocation();
  const { theme } = useTheme();
  const [mapType, setmapType] = useState<MapType>("standard");
  const mapRef = useRef<MapView>(null);
  const [isPinDrag, setIsPinDrag] = useState(false);

  const [pinLocation, setPinLocation] = useState<TCoords>({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    if (props.initialRegion) {
      setPinLocation(props.initialRegion);
      mapRef.current?.animateToRegion(
        {
          ...props.initialRegion,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        300,
      );
    }
  }, [props.initialRegion]);

  useEffect(() => {
    if (!props.initialRegion) {
      setPinLocation(location);
    }
  }, [location]);

  const handlePinFocus = useCallback(() => {
    mapRef.current?.animateToRegion(
      {
        ...pinLocation,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      300,
    );
  }, [pinLocation]);

  const handleRefreshPin = () => {
    setPinLocation(location);
    handlePinFocus();
  };

  const handleSwitchLayer = () => {
    if (mapType === "standard") {
      setmapType("hybrid");
    } else {
      setmapType("standard");
    }
  };

  const handleDragPin = ({ longitude, latitude }: Region) => {
    setPinLocation({ longitude, latitude });
    if (props.onPinDrop) {
      props.onPinDrop({ latitude, longitude });
    }
  };

  const handleFindAddressByPinDrop = () => {
    if (props.onSearchIcon) {
      props.onSearchIcon(pinLocation);
    }
  };

  return (
    <View className="flex-1 rounded-lg overflow-hidden">
      <MapView
        scrollEnabled
        ref={mapRef}
        mapType={mapType}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        moveOnMarkerPress
        onMapLoaded={props.onLoad}
        customMapStyle={theme === "dark" ? darkMapStyle : []}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{
          width: "auto",
          height: props.height == "fixed" ? 300 : "100%",
        }}
        onRegionChange={() => {
          setIsPinDrag(true);
        }}
        onRegionChangeComplete={(e) => {
          setTimeout(() => {
            handleDragPin(e);
            setIsPinDrag(false);
          }, 1000);
        }}
      />
      <MapMarker isPinDrag={isPinDrag} />
      <IconButton
        testID="focus-pin"
        color="white"
        variant="primary"
        name="map-marker"
        onPress={handlePinFocus}
        className="absolute bottom-14 left-2"
      />
      <IconButton
        testID="pin-refresh"
        color="white"
        variant="primary"
        name="refresh"
        onPress={handleRefreshPin}
        className="absolute bottom-2 left-14"
      />
      {props.onSearchIcon && (
        <IconButton
          disabled={isPinDrag}
          color="white"
          variant="primary"
          name="map-search"
          testID="search-address"
          className="absolute bottom-14 left-14"
          onPress={handleFindAddressByPinDrop}
        />
      )}
      <IconButton
        testID="layers"
        color="white"
        variant="primary"
        name="layers"
        onPress={handleSwitchLayer}
        className="absolute bottom-2 left-2"
      />
    </View>
  );
};

export default CustomMapView;
