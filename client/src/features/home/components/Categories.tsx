import React from "react";
import { View, ScrollView } from "react-native";
import Badge from "@components/feedback/Badge";

const Categories = () => {
  const categories = ["Department", "Office", "Bungalow", "Area", "Villa"];

  return (
    <View testID="categories">
      <ScrollView horizontal>
        <View className="flex-row gap-4">
          {categories.map((category, idx) => (
            <Badge key={idx} variant="graySolid">
              {category}
            </Badge>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
