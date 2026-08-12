import React from "react";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";
import { cssInterop } from "nativewind";

cssInterop(RNDropdown, {
  containerClassName: {
    target: "containerStyle",
  },
  selectedTextClassName: {
    target: "selectedTextStyle",
  },
  itemTextClassName: {
    target: "itemTextStyle",
  },
  itemContainerClassName: {
    target: "itemContainerStyle",
  },

  iconClassName: {
    target: "iconStyle",
  },
  className: {
    target: "style",
  },
  placeholderClassName: {
    target: "placeholderStyle",
  },
});

type CustomDropdownProps = React.ComponentProps<typeof RNDropdown> & {
  className?: string;
  containerClassName?: string;
  selectedTextClassName?: string;
  itemTextClassName?: string;
  iconClassName?: string;
  itemContainerClassName?: string;
  placeholderClassName?: string;
};

export const Dropdown =
  RNDropdown as unknown as React.ComponentType<CustomDropdownProps>;
