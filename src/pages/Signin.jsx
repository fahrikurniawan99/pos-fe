import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { login } from "../app/api/auth";
import { userLogin } from "../app/features/auth/actions";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-2xl font-bold text-center">Sign In Account</h1>
        <div className="card w-full bg-base-100">
          <div className="card-body">
            {
              <Formik
                {...{ initialValues, validationSchema }}
                onSubmit={(values, props) => {
                  login(values)
                    .then((res) => {
                      const { email, full_name, token } = res;
                      dispatch(
                        userLogin({ user: { email, full_name }, token })
                      );
                      localStorage.setItem(
                        "auth",
                        JSON.stringify({
                          user: { email, full_name },
                          token,
                        })
                      );
                      navigate("/");
                    })
                    .catch((err) => {
                      props.setErrors({
                        email: err.message,
                        password: err.message,
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
                          <span className="label-text">Email*</span>
                        </label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="email"
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
                          <span className="label-text">Password*</span>
                        </label>
                        <Field
                          type="password"
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
                      <div className="form-control mt-6">
                        <button
                          type="submit"
                          disabled={props.isSubmitting}
                          className={`btn ${
                            props.isSubmitting && "loading"
                          } btn-primary`}
                        >
                          {props.isSubmitting ? "please wait..." : "Sign In"}
                        </button>
                      </div>
                      <span className="text-zinc-500 text-sm mt-3 inline-block">
                        Belum punya akun?
                        <Link
                          to={"/signup"}
                          className="ml-1 link link-hover link-primary"
                        >
                          Daftar disini
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
