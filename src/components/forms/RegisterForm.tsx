import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../services/authService";
import { AxiosResponse } from "axios";

// Define Schema of validation with Yup
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Username must have 6 letters minimum")
    .max(12, "Username must have maximum 12 letters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password to short")
    .required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("You must confirm your password"),
  age: Yup.date().required("Born date is required"),
});

// Register component
const RegisterForm = () => {
  // Define initial credentials
  const initialCredentials = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    age: "2000-01-01",
  };

  return (
    <div>
      <h4>Register Form</h4>
      <Formik
        initialValues={initialCredentials}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          register(values.name, values.age, values.email, values.password)
            .then((response: AxiosResponse) => {
              if (response.status !== 201) {
                throw new Error("Error while user was register");
              }
              console.log("User registered correctly");
              console.log(response.data);
              alert('User registered correctly')
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
            {/* Name */}
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
            />

            {/* Name Errors */}
            {errors.name && touched.name && (
              <ErrorMessage name="name" component="div"></ErrorMessage>
            )}

            {/* Email */}
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />

            {/* Email Errors */}
            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div"></ErrorMessage>
            )}

            {/* Password */}
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />

            {/* Password Errors */}
            {errors.password && touched.password && (
              <ErrorMessage name="password" component="div"></ErrorMessage>
            )}

            <label htmlFor="confirm">Confirm</label>
            <Field
              id="confirm"
              type="password"
              name="confirm"
              placeholder="Confirm your password"
            />

            {/* Password Errors */}
            {errors.confirm && touched.confirm && (
              <ErrorMessage name="confirm" component="div"></ErrorMessage>
            )}

            {/* Age */}
            <label htmlFor="age">Age</label>
            <Field
              id="age"
              type="date"
              name="age"
              min="1910-01-01"
              max="2020-12-31"
              placeholder="Enter your born date"
            />

            {/* Age Errors */}
            {errors.age && touched.age && (
              <ErrorMessage name="age" component="div"></ErrorMessage>
            )}

            {/* Submit button */}
            <button type="submit">Register</button>

            {/* Message while info is sending */}
            {isSubmitting ? <p>Validating data...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;