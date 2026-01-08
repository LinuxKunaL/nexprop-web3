import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href="/(protected)/(tabs)/home" />;
};

export default Index;
