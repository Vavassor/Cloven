import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { createAccount } from "../../../Utilities/Api/Account";
import {
  getPasswordValidator,
  getUsernameValidator,
  MAX_CHARS_PASSWORD,
  MAX_CHARS_USERNAME,
} from "../../../Utilities/Validation";
import { Button } from "../../Button/Button";
import { FormControl } from "../../FormControl";
import { PasswordField } from "../../PasswordField";
import { TextField } from "../../TextField";

interface RegistrationFormProps {
  handleSubmitSuccess: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  handleSubmitSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={(values, actions) => {
        createAccount(values.username, values.password, values.email)
          .then((account) => {
            actions.setSubmitting(false);
            handleSubmitSuccess();
          })
          .catch((error) => {
            actions.setSubmitting(false);
          });
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .trim()
          .email(t("registration_form.email_validation_error"))
          .required(t("registration_form.email_required_error")),
        password: getPasswordValidator(t, {
          maxLengthError: "registration_form.password_max_length_error",
          minLengthError: "registration_form.password_min_length_error",
          requiredError: "registration_form.password_required_error",
        }),
        username: getUsernameValidator(t, {
          maxLengthError: "registration_form.username_max_length_error",
          minLengthError: "registration_form.username_min_length_error",
          requiredError: "registration_form.username_required_error",
        }),
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
                label={t("registration_form.username_label")}
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
                label={t("registration_form.email_label")}
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
                label={t("registration_form.password_label")}
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
