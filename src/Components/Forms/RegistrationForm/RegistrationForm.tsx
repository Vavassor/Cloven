import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Button } from "../../Button/Button";
import { FormControl } from "../../FormControl";
import { PasswordField } from "../../PasswordField";
import { TextField } from "../../TextField";

const MAX_CHARS_PASSWORD = 64;
const MAX_CHARS_USERNAME = 16;
const MIN_CHARS_PASSWORD = 4;
const MIN_CHARS_USERNAME = 4;

export const RegistrationForm = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={(values, actions) => {
        console.log(`submitted form: ${JSON.stringify(values, null, 2)}`);
        actions.setSubmitting(false);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .trim()
          .email(t("registrationForm.emailValidationError"))
          .required(t("registrationForm.emailRequiredError")),
        password: Yup.string()
          .max(
            MAX_CHARS_PASSWORD,
            t("registrationForm.passwordMaxLengthError", {
              count: MAX_CHARS_PASSWORD,
            })
          )
          .min(
            MIN_CHARS_PASSWORD,
            t("registrationForm.passwordMinLengthError", {
              count: MIN_CHARS_PASSWORD,
            })
          )
          .required(t("registrationForm.passwordRequiredError")),
        username: Yup.string()
          .trim()
          .max(
            MAX_CHARS_USERNAME,
            t("registrationForm.usernameMaxLengthError", {
              count: MAX_CHARS_USERNAME,
            })
          )
          .min(
            MIN_CHARS_USERNAME,
            t("registrationForm.usernameMinLengthError", {
              count: MIN_CHARS_USERNAME,
            })
          )
          .required(t("registrationForm.usernameRequiredError")),
      })}
    >
      {(props: FormikProps<any>) => (
        <Form noValidate>
          <Field name="username">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                error={meta.touched ? meta.error : undefined}
                inputId="username"
                isRequired={true}
                label={t("registrationForm.usernameLabel")}
              >
                <TextField inputProps={field} maxLength={MAX_CHARS_USERNAME} />
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                error={meta.touched ? meta.error : undefined}
                inputId="email"
                isRequired={true}
                label={t("registrationForm.emailLabel")}
              >
                <TextField inputProps={field} type="email" />
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                error={meta.touched ? meta.error : undefined}
                inputId="password"
                isRequired={true}
                label={t("registrationForm.passwordLabel")}
              >
                <PasswordField
                  inputProps={field}
                  maxLength={MAX_CHARS_PASSWORD}
                />
              </FormControl>
            )}
          </Field>
          <Button type="submit">{t("generic.submit")}</Button>
        </Form>
      )}
    </Formik>
  );
};
