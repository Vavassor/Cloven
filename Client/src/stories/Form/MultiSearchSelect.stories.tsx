import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import {
  MultiSearchSelect,
  MultiSearchSelectProps,
  Option,
} from "../../Components/SearchSelect";
import countries from "../Data/countries.json";

export default {
  title: "Form/MultiSearchSelect",
  component: MultiSearchSelect,
} as Meta;

interface Country {
  abbreviation: string;
  name: string;
}

const getCountryArray = (values: Country[]): Option[] => {
  return values.map((value) => ({
    id: value.abbreviation,
    label: value.name,
    value: value.name,
  }));
};

const Template: Story<MultiSearchSelectProps> = (args) => (
  <MultiSearchSelect {...args} />
);

export const Normal = Template.bind({});

Normal.args = {
  options: getCountryArray(countries),
};
