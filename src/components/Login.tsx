"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "./Alert";
import { userLogin } from "../utils/auth/authActions";
import { resetAuthState } from "../utils/auth/authSlice";
import type { AppDispatch, RootState } from "../utils/store";

import {
  loginSchema,
  type LoginFormValues,
  type LoginFormOutput,
} from "../lib/validation/auth";

import "../scss/forms.scss";

type LoginProps = {
  toggleLoginRegisterView: (showRegister: boolean) => void;
};

const Login = ({ toggleLoginRegisterView }: LoginProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues, undefined, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    shouldFocusError: false,
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userInfo?.status === 200) {
      router.push("/dashboard");
    }
  }, [userInfo, router]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const onSubmit = async (values: LoginFormOutput) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      reset();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {!isSubmitting && error && <Alert {...error} />}

          <div className="login-form-heading">
            <h1>Where Readers Connect</h1>
            <h4>Share the words that inspire you.</h4>
          </div>

          <div className="form-field">
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder=" "
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />

              <label htmlFor="email">Email Address</label>
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
                id="password"
                placeholder=" "
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              <label htmlFor="password">Password</label>

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

          <div className="form-field flex justify-end">
            <Link href="/" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <div className="form-field">
            <button
              className="btn w-full"
              type="submit"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <div className="form-field text-center">
            <p className="text-gray-400">Or</p>
          </div>
          <div className="text-center social-login mt-10 mb-10">
            <button type="button" className="flex items-center">
              <span className="text-4xl mr-2 fa-brands fa-facebook" />
              <p>Continue with Facebook</p>
            </button>
            <button type="button" className="flex items-center">
              <span className="text-4xl mr-2 fa-brands fa-google" />
              <p>Contiue with Google</p>
            </button>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-gray-400">New to Avid Reader?</p>
            <button
              className="signin-btn cursor-pointer"
              type="button"
              onClick={() => toggleLoginRegisterView(true)}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
