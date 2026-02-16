import { View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, {
  LongPressEvent,
  MapType,
  Marker,
  MarkerDragStartEndEvent,
} from "react-native-maps";
import IconButton from "@ui/IconButton";
import { useUserLocation } from "@hooks/map/useUserLocation";
import { useTheme } from "@providers/ThemeProvider";

type TCoords = {
  latitude: number;
  longitude: number;
};

type Props = {
  onPinDrag?: ({ latitude, longitude }: TCoords) => null;
  onPinDrop?: ({ latitude, longitude }: TCoords) => any;
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

  const [pinLocation, setPinLocation] = useState<TCoords>({
    longitude: 0,
    latitude: 0,
  });

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

  useEffect(() => {
    setPinLocation(location);
  }, [location]);

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

  const handleDragPin = (e: MarkerDragStartEndEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPinLocation({ longitude, latitude });
    if (props.onPinDrop) {
      props.onPinDrop({ latitude, longitude });
    }
  };

  const handlePinPlaceOnPress = (e: LongPressEvent) => {
    handleDragPin(e);
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
        onLongPress={handlePinPlaceOnPress}
        customMapStyle={theme === "dark" ? darkMapStyle : []}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{
          width: "auto",
          height: 300,
        }}
      >
        <Marker
          draggable
          coordinate={pinLocation}
          title="Drag me"
          onDragEnd={handleDragPin}
        />
      </MapView>
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
