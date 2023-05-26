import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../scss/forms.scss";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="form-container">
      {/* <div className="login-text">
        <h1 className="text-3xl font-bold">
          Login if you have signed up already
        </h1>
        <h2 className="text-4xl font-bold">OR</h2>
        <Link to="/register" className="text-2xl">
          Sign Up Here
        </Link>
      </div> */}

      <div className="login-form">
        {/* isLoginError && (
          <h4 className="error-text">
            Incorrect Login, Please Check User Email or Password
          </h4>
        ) */}
        <Formik
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
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            /* if (
              values?.email !== user?.email ||
              values?.password !== user?.password
            ) {
              setIsLoginError(true);
              return;
            }
            setIsLoginError(false);
            setUser({
              ...user,
              isUserLoggedIn: true,
            }); */
            navigate("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-field">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  autoComplete="off"
                />

                <ErrorMessage
                  className="error-text"
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
                  className="error-text"
                  name="password"
                  component="div"
                />
              </div>
              <div className="form-field flex justify-between items-center">
                <Link className="forgot-password">Forgot Password?</Link>
                <button className="btn" type="submit" disabled={isSubmitting}>
                  Sign In
                </button>
              </div>
              <div className="social-login flex justify-evenly items-center">
                <div>
                  <span className="text-4xl ml-4 fa-brands fa-facebook"></span>
                  <span className="text-4xl ml-4 fa-brands fa-google"></span>
                </div>
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
