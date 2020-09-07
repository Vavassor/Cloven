import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Select, SelectProps } from "../../Components/Select";

export default {
  title: "Form/Select",
  component: Select,
} as Meta;

const options = [
  { label: "Trace", id: "trace", value: "trace" },
  { label: "Info", id: "info", value: "info" },
  { label: "Warning", id: "warning", value: "warning" },
  { label: "Error", id: "error", value: "error" },
  { label: "Critical", id: "critical", value: "critical" },
];

const Template: Story<SelectProps> = (args) => {
  const [value, setValue] = useState(options[0]);
  return <Select {...args} handleChange={setValue} value={value} />;
};

export const Normal = Template.bind({});

Normal.args = {
  options,
};
