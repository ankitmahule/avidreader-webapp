import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../scss/forms.scss";
// import useUsers from "../utils/useUsers";
import Alert from "./Alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../utils/auth/authActions";
const Login = () => {
  const navigate = useNavigate();
  // const { userResponse, submitLoginRequest } = useUsers(null);
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(success);
    if (success && success.status === 200) {
      navigate("/dashboard");
    }
  }, [success, navigate]);
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
              errors.password = "Minimum lenght of password should be >= 8";
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
              {!isSubmitting && (error || success) && (
                <Alert {...(error ? error : success)}></Alert>
              )}
              <div className="form-field">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  autoComplete="off"
                />

                <ErrorMessage
                  className="field-error"
                  name="email"
                  component="div"
                />
              </div>
              <div className="form-field">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                />
                <ErrorMessage
                  className="field-error"
                  name="password"
                  component="div"
                />
              </div>
              <div className="form-field flex justify-between items-center">
                <Link className="forgot-password">Forgot Password?</Link>
                <button
                  className="btn"
                  type="submit"
                  disabled={!isValid || loading}
                >
                  {loading ? "Loading" : "Sign In"}
                </button>
              </div>
              <div className="text-center social-login">
                <span className="text-4xl ml-4 fa-brands fa-facebook"></span>
                <span className="text-4xl ml-4 fa-brands fa-google"></span>
              </div>
              <div className="form-field text-center">New User?</div>
              <div className="form-field text-center">
                <Link className="btn" to="/register">
                  Create Account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
