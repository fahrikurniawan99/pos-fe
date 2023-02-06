import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { register } from "../app/api/auth";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
    full_name: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
    full_name: yup.string().required().min(4),
  });

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-2xl font-bold text-center">Sign Up Account</h1>
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            {
              <Formik
                {...{ initialValues, validationSchema }}
                onSubmit={(values, props) => {
                  register(values)
                    .then((res) => {
                      navigate("/signin");
                    })
                    .catch((err) => {
                      props.setErrors({
                        email: err.message,
                      });
                    })
                    .finally(() => {
                      props.setSubmitting(false);
                    });
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <Field
                          type="text"
                          name="full_name"
                          placeholder="John"
                          className={`input ${
                            props.errors.full_name
                              ? "input-error"
                              : "input-primary"
                          }`}
                        />
                        <ErrorMessage name="full_name">
                          {(err) => (
                            <span className="label label-text-alt text-error">
                              {err}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="john@gmail.com"
                          className={`input ${
                            props.errors.email ? "input-error" : "input-primary"
                          }`}
                        />
                        <ErrorMessage name="email">
                          {(err) => (
                            <span className="label label-text-alt text-error">
                              {err}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <Field
                          type="text"
                          name="password"
                          placeholder="password"
                          className={`input ${
                            props.errors.password
                              ? "input-error"
                              : "input-primary"
                          }`}
                        />
                        <ErrorMessage name="password">
                          {(err) => (
                            <span className="label label-text-alt text-error">
                              {err}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Password confirmation
                          </span>
                        </label>
                        <Field
                          type="text"
                          name="passwordConfirmation"
                          placeholder="password confirmation"
                          className={`input ${
                            props.errors.password
                              ? "input-error"
                              : "input-primary"
                          }`}
                        />
                        <ErrorMessage name="passwordConfirmation">
                          {(err) => (
                            <span className="label label-text-alt text-error">
                              {err}
                            </span>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="form-control mt-6">
                        <button
                          type="submit"
                          disabled={props.isSubmitting}
                          className={`btn ${
                            props.isSubmitting && "loading"
                          } btn-primary`}
                        >
                          {props.isSubmitting ? "please wait..." : "Sign Up"}
                        </button>
                      </div>
                      <span className="text-zinc-500 text-sm mt-3 inline-block">
                        Sudah punya akun?
                        <Link
                          to={"/signin"}
                          className="ml-1 link link-hover link-primary"
                        >
                          Masuk disini
                        </Link>
                      </span>
                    </Form>
                  );
                }}
              </Formik>
            }
          </div>
          <Link to="/" className="block text-center link link-neutral">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
