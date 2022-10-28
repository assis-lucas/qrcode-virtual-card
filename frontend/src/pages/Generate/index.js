import React, { useState } from "react";
import {
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import { Formik, Field } from "formik";

import api from "../../services/api";
import { CardWrapper } from "./styles";

export default function Generate() {
  const [submitedData, setSubmitedData] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setErrors }) => {
    setLoading(true);
    try {
      const {
        data: { slug },
      } = await api.post("/qr-code", values);
      setSubmitedData({ slug, name: values.name });
    } catch (error) {
      const { response } = error;
      if (response.status === 422) {
        const { errors } = response.data;
        setErrors(errors);
      }
    }
    setLoading(false);
  };

  const validationSchema = Yup.object().shape({
    github: Yup.string().required(),
    name: Yup.string().required(),
    linkedin: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{ name: "", github: "", linkedin: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <div className="w-full flex justify-center h-screen">
          <CardWrapper className="w-96">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              QR Code Image Generator
            </CardHeader>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <svg
                  className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <CardBody className="flex flex-col gap-4">
                <Field name="name">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <Input
                        label="Name"
                        size="lg"
                        {...field}
                        error={Boolean(meta.touched && meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 normal-case">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="github">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <Input
                        label="Github"
                        size="lg"
                        {...field}
                        error={Boolean(meta.touched && meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 normal-case">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="linkedin">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <Input
                        label="Linkedin"
                        size="lg"
                        {...field}
                        error={Boolean(meta.touched && meta.error)}
                      />
                      {meta.touched && meta.error && (
                        <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 normal-case">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
              </CardBody>
            )}
            <CardFooter className="pt-0">
              <Button
                disabled={loading}
                onClick={submitForm}
                variant="gradient"
                fullWidth
              >
                Generate Image
              </Button>
              {submitedData && (
                <Navigate
                  to={`/image/${submitedData.slug}`}
                  state={{ name: submitedData.name }}
                />
              )}
            </CardFooter>
          </CardWrapper>
        </div>
      )}
    </Formik>
  );
}
