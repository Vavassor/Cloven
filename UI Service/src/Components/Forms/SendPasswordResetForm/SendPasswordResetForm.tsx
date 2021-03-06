import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../Button";
import { FormControl } from "../../FormControl";
import { RadioGroup, RadioOption } from "../../RadioGroup";

export interface Submission {
  recoveryMethod: RadioOption;
}

interface SendPasswordResetFormProps {
  handleSubmit: (submission: Submission) => Promise<void>;
  handleSubmitFailure: (error: any) => void;
  handleSubmitSuccess: () => void;
  options: RadioOption[];
}

export const SendPasswordResetForm: React.FC<SendPasswordResetFormProps> = ({
  handleSubmit,
  handleSubmitFailure,
  handleSubmitSuccess,
  options,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ recoveryMethod: options[0] }}
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
          <Field name="recoveryMethod">
            {({ field, form, meta }: FieldProps<any>) => (
              <FormControl
                inputId="recoveryMethod"
                label={t(
                  "send_password_reset_form.recovery_method_field_label"
                )}
                labelProps={{
                  Component: "span",
                }}
              >
                <RadioGroup name="recoveryMethod" options={options} />
              </FormControl>
            )}
          </Field>
          <Button type="submit">
            {t("send_password_reset_form.send_button_label")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
