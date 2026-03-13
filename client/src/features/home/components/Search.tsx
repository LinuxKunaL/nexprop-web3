import { View } from "react-native";
import React from "react";
import Input from "@components/inputs/Input";
import Icon from "@components/display/Icon";


const Search = () => {
  return (
    <View testID="search">
      <Input placeholder="Search Properties" />
      <Icon className="absolute right-3 top-3" name="magnify" isThemed />
    </View>
  );
};

export default Search;
