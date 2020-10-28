import { Story } from "@storybook/react/types-6-0";
import React, { Suspense } from "react";
import { AppLoader } from "../../Components/AppLoader";

export const withSuspense = (Story: Story) => (
  <Suspense fallback={<AppLoader />}>
    <Story />
  </Suspense>
);
