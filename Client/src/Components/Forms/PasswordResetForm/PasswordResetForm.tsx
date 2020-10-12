import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  getPasswordValidator,
  MAX_CHARS_PASSWORD,
} from "../../../Utilities/Validation";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { PasswordField } from "../../PasswordField";

export interface Submission {
  password: string;
}

interface PasswordResetFormProps {
  handleSubmit: (submission: Submission) => Promise<void>;
  handleSubmitFailure: (error: any) => void;
  handleSubmitSuccess: () => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  handleSubmit,
  handleSubmitFailure,
  handleSubmitSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ password: "" }}
      onSubmit={(values, actions) => {
        handleSubmit(values)
          .then(() => {
            actions.setSubmitting(false);
            handleSubmitSuccess();
          })
          .catch((error) => {
            actions.setSubmitting(false);
            handleSubmitFailure(error);
          });
      }}
      validationSchema={Yup.object({
        password: getPasswordValidator(t, {
          maxLengthError: "registration_form.password_max_length_error",
          minLengthError: "registration_form.password_min_length_error",
          requiredError: "registration_form.password_required_error",
        }),
      })}
    >
      {(props: FormikProps<any>) => (
        <Form noValidate>
          <Field name="password">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                error={meta.touched ? meta.error : undefined}
                inputId="password"
                isRequired={true}
                label={t("password_reset_form.password_field_label")}
              >
                <PasswordField
                  inputProps={field}
                  maxLength={MAX_CHARS_PASSWORD}
                />
              </FormControl>
            )}
          </Field>
          <Button type="submit">
            {t("password_reset_form.change_password_button_label")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
