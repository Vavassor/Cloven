import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { MultiSelect, MultiSelectProps } from "../../Components/MultiSelect";
import { Option } from "../../Components/MultiSelectList";
import { toKebabCase } from "../../Utilities/String";
import productTypes from "../Data/ProductTypes.json";

export default {
  title: "Form/MultiSelect",
  component: MultiSelect,
} as Meta;

const getStringArray = (values: string[]): Option[] => {
  return values.map((value) => ({
    id: toKebabCase(value),
    label: value,
    value: toKebabCase(value),
  }));
};

const Template: Story<MultiSelectProps> = (args) => <MultiSelect {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  options: getStringArray(productTypes),
};
