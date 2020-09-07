import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthDispatch, logIn } from "../../../Contexts/AuthDispatch";
import { routes } from "../../../Routes";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { PasswordField } from "../../PasswordField";
import { TextField } from "../../TextField";

export const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useContext(AuthDispatch);
  const history = useHistory();

  return (
    <Formik
      initialValues={{ password: "", username: "" }}
      onSubmit={(values, actions) => {
        dispatch(logIn());
        actions.setSubmitting(false);
        history.push(routes.home);
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
                label={t("loginForm.usernameFieldLabel")}
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
                label={t("loginForm.passwordFieldLabel")}
              >
                <PasswordField inputProps={field} />
              </FormControl>
            )}
          </Field>
          <Button type="submit">{t("loginForm.loginButtonLabel")}</Button>
        </Form>
      )}
    </Formik>
  );
};
