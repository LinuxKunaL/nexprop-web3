import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useUserLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject["coords"]>({
    altitude: 0,
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: null,
    speed: 0,
  });

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status !== "granted") {
        alert("Permission denied");
        return null;
      }
      Location.getCurrentPositionAsync({}).then(({ coords }) => {
        setLocation(coords);
      });
    });
  }, []);

  return { location };
};
