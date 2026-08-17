import { ValidationRule } from "react-hook-form";

export type TRegexPattern = "not-zero" | "only-number" | "only-letters";

export const regexPattern = (pattern: TRegexPattern): ValidationRule<RegExp> => {
  let value,
    message = "";

  switch (pattern) {
    case "not-zero":
      value = /^[1-9][0-9]*$/;
      message = "Number must not start with 0";
      break;
    case "only-letters":
      value = /^[A-Za-z]+$/;
      message = "Only letters are allowed";
      break;
    case "only-number":
      value = /^[1-9]+$/;
      message = "Only numbers are allowed";
    default:
      break;
  }

  return {
    value,
    message,
  };
};
