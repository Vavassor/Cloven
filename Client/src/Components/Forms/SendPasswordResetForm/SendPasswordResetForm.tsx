import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { RadioGroup, RadioOption } from "../../RadioGroup";
import { obscureEmail } from "../../../Utilities/Obscure";

export const SendPasswordResetForm = () => {
  const { t } = useTranslation();
  const options: RadioOption[] = [
    {
      id: "copernicus-@hotmail.com",
      label: obscureEmail("copernicus-@hotmail.com"),
      value: "copernicus-@hotmail.com",
    },
  ];

  return (
    <Formik
      initialValues={{ emailOrUsername: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
    >
      {(props: FormikProps<any>) => (
        <Form noValidate>
          <Field name="email">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                inputId="email"
                label={t("sendPasswordResetForm.emailFieldLabel")}
                labelProps={{
                  Component: "span",
                }}
              >
                <RadioGroup name="email" options={options} />
              </FormControl>
            )}
          </Field>
          <Button type="submit">
            {t("sendPasswordResetForm.sendButtonLabel")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
