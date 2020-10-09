import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { TextField } from "../../TextField";

export interface Submission {
  emailOrUsername: string;
}

interface BeginPasswordResetFormProps {
  handleSubmit: (submission: Submission) => Promise<void>;
  handleSubmitFailure: (error: any) => void;
  handleSubmitSuccess: () => void;
}

export const BeginPasswordResetForm: React.FC<BeginPasswordResetFormProps> = ({
  handleSubmit,
  handleSubmitFailure,
  handleSubmitSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ emailOrUsername: "" }}
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
