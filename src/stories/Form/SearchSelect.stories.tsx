import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import {
  Option,
  SearchSelect,
  SearchSelectProps,
} from "../../Components/SearchSelect";
import states from "../Data/states.json";

export default {
  title: "Form/SearchSelect",
  component: SearchSelect,
} as Meta;

interface State {
  abbreviation: string;
  name: string;
}

const getStateArray = (values: State[]): Option[] => {
  return values.map((value) => ({
    id: value.abbreviation,
    label: value.name,
    value: value.name,
  }));
};

const Template: Story<SearchSelectProps> = (args) => <SearchSelect {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  idPrefix: "state",
  options: getStateArray(states),
};
