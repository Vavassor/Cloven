import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { Select, SelectProps } from "../../Components/Select";

export default {
  title: "Form/Select",
  component: Select,
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  options: [
    { label: "Trace", id: "trace", value: "trace" },
    { label: "Info", id: "info", value: "info" },
    { label: "Warning", id: "warning", value: "warning" },
    { label: "Error", id: "error", value: "error" },
    { label: "Critical", id: "critical", value: "critical" },
  ],
};
