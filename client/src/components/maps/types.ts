export type TCoords = {
  latitude: number;
  longitude: number;
};

export type TLocation = {
  city: string;
  state: string;
  coords: TCoords;
};