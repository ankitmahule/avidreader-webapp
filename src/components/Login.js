import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../scss/forms.scss";
// import useUsers from "../utils/useUsers";
import Alert from "./Alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../utils/auth/authActions";
import { resetAuthState } from "../utils/auth/authSlice";

const Login = ({ toggleLoginRegisterView }) => {
  const navigate = useNavigate();
  const { loading, error, success, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo?.status === 200) {
      // sessionStorage.setItem("userId", success?.data?._id);
      navigate("/dashboard");
    }
    return () => {
      // dispatch(resetAuthState());
    };
  }, [userInfo, navigate, dispatch]);

  function toggleView() {
    toggleLoginRegisterView(true);
  }
  return (
    <div className="form-container">
      <div className="login-form">
        <Formik
          validateOnMount={true}
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "This field is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "This field is required";
            } else if (values.password.length < 8) {
              errors.password = "Minimum length of password should be >= 8";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(userLogin(values));
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              {!isSubmitting &&
                ((error && error !== "Network Error") || success) && (
                  <Alert {...(error ? error : success)}></Alert>
                )}
              <div className="form-field">
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder=""
                  />
                  <label>Email Address</label>
                </div>
                <ErrorMessage
                  className="field-error"
                  name="email"
                  component="div"
                />
              </div>
              <div className="form-field">
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder=""
                  />
                  <label>Password</label>
                </div>
                <ErrorMessage
                  className="field-error"
                  name="password"
                  component="div"
                />
              </div>
              <div className="form-field flex justify-between items-center">
                <Link className="forgot-password">Forgot Password?</Link>
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "Loading" : "Sign In"}
                </button>
              </div>
              <div className="text-center social-login">
                <span className="text-4xl ml-4 fa-brands fa-facebook"></span>
                <span className="text-4xl ml-4 fa-brands fa-google"></span>
              </div>
              <div className="form-field text-center text-gray-400">
                New User?
              </div>
              <div className="form-field text-center">
                <button className="btn" onClick={toggleView}>
                  Create Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
