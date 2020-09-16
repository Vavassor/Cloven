import { isValidObjectId } from "mongoose";

export const isObjectId = (value: any): boolean => {
  if (!isValidObjectId(value)) {
    throw new Error("The ID format is invalid.");
  }
  return true;
};

export const isObjectIdList = (value: any): boolean => {
  if (typeof value === "undefined") {
    throw new Error("The value is required, but missing.");
  }

  if (typeof value !== "string") {
    throw new Error("The type is invalid.");
  }

  const ids = value.split(",");

  for (const id of ids) {
    if (!isValidObjectId(id)) {
      throw new Error("The ID format is invalid.");
    }
  }

  return true;
};
