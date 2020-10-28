import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { routes } from "../../../Routes";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { Link } from "../../Link";
import { PasswordField } from "../../PasswordField";
import { TextField } from "../../TextField";

export interface Submission {
  password: string;
  username: string;
}

interface LoginFormProps {
  handleSubmit: (submission: Submission) => Promise<void>;
  handleSubmitFailure: (error: any) => void;
  handleSubmitSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  handleSubmitFailure,
  handleSubmitSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ password: "", username: "" }}
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
    >
      {(props: FormikProps<any>) => (
        <Form noValidate>
          <Field name="username">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                error={meta.touched ? meta.error : undefined}
                inputId="username"
                isRequired={true}
                label={t("login_form.username_field_label")}
              >
                <TextField inputProps={field} />
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                error={meta.touched ? meta.error : undefined}
                inputId="password"
                isRequired={true}
                label={t("login_form.password_field_label")}
              >
                <PasswordField inputProps={field} />
              </FormControl>
            )}
          </Field>
          <Link to={routes.beginPasswordReset}>
            {t("login_form.begin_password_reset_link")}
          </Link>
          <Button type="submit">{t("login_form.login_button_label")}</Button>
        </Form>
      )}
    </Formik>
  );
};
