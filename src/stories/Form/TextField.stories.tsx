import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { TextField, TextFieldProps } from "../../Components/TextField";

export default {
  title: "Form/TextField",
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  name: "text-field",
};
