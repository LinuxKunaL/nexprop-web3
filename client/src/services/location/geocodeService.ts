import axios from "axios";

type TCoords = {
  latitude: number;
  longitude: number;
};

type TDataRespose = {
  type: string;
  features: {
    type: string;
    properties: {
      osm_type: string;
      osm_id: number;
      osm_key: string;
      osm_value: string;
      type: string;
      postcode: string;
      countrycode: string;
      name: string;
      city: string;
      county: string;
      state: string;
      country: string;
    };
    geometry: {
      type: string;
      coordinates: number[];
    };
  }[];
};

type TReturn = {
  status?: number;
  city?: string;
  country?: string;
  postcode?: string;
  name?: string;
  state?: string;
};

export const getPlaceName = async (
  coords: TCoords,
): Promise<TReturn | undefined | unknown> => {
  try {
    const response = await axios.get(
      `https://photon.komoot.io/reverse?lat=${coords.latitude}&lon=${coords.longitude}`,
    );
    const { features } = response.data as TDataRespose;
    if (features.length !== 0) {
      return {
        status: 200,
        city: features[0].properties.city,
        country: features[0].properties.country,
        postcode: features[0].properties.postcode,
        name: features[0].properties.name,
        state: features[0].properties.state,
      };
    }
    throw { status: 404 };
  } catch (error) {
    console.log(error);
    return error;
  }
};
