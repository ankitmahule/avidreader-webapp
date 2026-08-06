"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "../utils/auth/authActions";
import { resetAuthState } from "../utils/auth/authSlice";
import type { AppDispatch, RootState } from "../utils/store";

import {
  registerSchema,
  type RegisterFormValues,
  type RegisterFormOutput,
} from "../lib/validation/auth";

import "../scss/forms.scss";

type RegisterProps = {
  toggleLoginRegisterView: (showRegister: boolean) => void;
};

const getResponseMessage = (value: unknown, fallback: string) => {
  if (typeof value === "string") return value;

  if (value && typeof value === "object" && "message" in value) {
    const message = value.message;
    if (typeof message === "string") return message;
  }

  return fallback;
};

const Register = ({ toggleLoginRegisterView }: RegisterProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues, undefined, RegisterFormOutput>({
    resolver: zodResolver(registerSchema),
    shouldFocusError: false,
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = async (values: RegisterFormOutput) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const errorMessage = error
    ? getResponseMessage(error, "Unable to create your account. Please try again.")
    : null;

  const successMessage = success
    ? getResponseMessage(success, "Account created successfully.")
    : null;

  return (
    <div className="form-container">
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-form-heading">
            <h1>Create your profile</h1>
            <h4>Join the community of curious readers.</h4>
          </div>

          {!isSubmitting && errorMessage && (
            <div
              className="error-text alert-response"
              role="alert"
              aria-live="assertive"
            >
              {errorMessage}
            </div>
          )}

          {!isSubmitting && !errorMessage && successMessage && (
            <div
              className="success-text alert-response"
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          <div className="form-field flex justify-between">
            <div className="name-container">
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  placeholder=" "
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                  {...registerField("firstName")}
                />

                <label htmlFor="firstName">First Name</label>
              </div>

              {errors.firstName && (
                <div className="field-error" role="alert">
                  {errors.firstName.message}
                </div>
              )}
            </div>

            <div className="name-container">
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  placeholder=" "
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                  {...registerField("lastName")}
                />

                <label htmlFor="lastName">Last Name</label>
              </div>

              {errors.lastName && (
                <div className="field-error" role="alert">
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>
          <div className="form-field">
            <div className="relative">
              <input
                type="email"
                id="registerEmail"
                placeholder=" "
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...registerField("email")}
              />

              <label htmlFor="registerEmail">Email Address</label>
            </div>

            {errors.email && (
              <div className="field-error" role="alert">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="form-field">
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="registerPassword"
                placeholder=" "
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                {...registerField("password")}
              />

              <label htmlFor="registerPassword">Password</label>

              <button
                type="button"
                className="password-toggle"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                <i
                  className={`fa ${
                    passwordVisible ? "fa-eye" : "fa-eye-slash"
                  } password-show`}
                />
              </button>
            </div>

            {errors.password && (
              <div className="field-error" role="alert">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="form-field">
            <button
              className="btn w-full"
              type="submit"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? "Creating account..." : "Submit"}
            </button>
          </div>
          <div className="form-field flex items-center justify-center">
            <p className="text-gray-400">Already a user?</p>
            <button
              type="button"
              className="signin-btn cursor-pointer"
              onClick={() => toggleLoginRegisterView(false)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
