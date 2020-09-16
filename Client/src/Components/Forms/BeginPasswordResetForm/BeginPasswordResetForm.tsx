import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { routes } from "../../../Routes";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { TextField } from "../../TextField";

export const BeginPasswordResetForm = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ emailOrUsername: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        history.push(routes.sendPasswordReset);
      }}
      validationSchema={Yup.object({
        emailOrUsername: Yup.string().trim().required(),
      })}
    >
      {(props: FormikProps<any>) => (
        <Form noValidate>
          <Field name="emailOrUsername">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                inputId="emailOrUsername"
                label={t("beginPasswordResetForm.emailOrUsernameFieldLabel")}
              >
                <TextField inputProps={field} />
              </FormControl>
            )}
          </Field>
          <Button type="submit">
            {t("beginPasswordResetForm.searchButtonLabel")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
