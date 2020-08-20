import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { RadioGroup, RadioGroupProps } from "../../Components/RadioGroup";

export default {
  title: "Form/RadioGroup",
  component: RadioGroup,
} as Meta;

const Template: Story<RadioGroupProps> = (args) => <RadioGroup {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  name: "radio-group",
  options: [
    { label: "Apple", id: "apple", value: "apple" },
    { label: "Orange", id: "orange", value: "orange" },
    { label: "Pear", id: "pear", value: "pear" },
  ],
};
