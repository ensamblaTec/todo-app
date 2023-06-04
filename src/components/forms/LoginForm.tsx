import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/authService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

// Define Schema of validation with Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Passowrd is required"),
});

// Login Component
const LoginForm = () => {
  // Define initial credentials
  const initialCredentials = {
    email: "",
    password: "",
  };

  let navigate = useNavigate();

  return (
    <div>
      <h4>Login Form</h4>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          login(values.email, values.password)
            .then(async (response: AxiosResponse) => {
              if (response.status !== 200) {
                throw new Error("Invalid Credentials");
              }
              if (!response.data.token)
                throw new Error("Error generating Login Token");
              await sessionStorage.setItem("sessionToken", response.data.token);
              navigate("/");
              console.table(response.data);
            })
            .catch((err) =>
              console.error(`[LOGIN ERROR] Something has occurred: ${err}`)
            );
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />

            {/* Email errors */}
            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div"></ErrorMessage>
            )}

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="********"
            />

            {/* Email errors */}
            {errors.password && touched.password && (
              <ErrorMessage name="password" component="div"></ErrorMessage>
            )}

            {/* Submit button */}
            <button type="submit">Login</button>

            {/* Message while info is sending */}
            {isSubmitting ? <p>Checking credentials</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
