import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import "../scss/forms.scss";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../utils/auth/authActions";
import { resetAuthState } from "../utils/auth/authSlice";

const Register = () => {
  const { loading, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);
  return (
    <div className="registration-form">
      <div className="form-content">
        <h1 className="text-4xl text-center mt-10 text-[#656322]">
          New User Registration
        </h1>
        <Formik
          validateOnMount={true}
          initialValues={{ email: "", password: "", contactNo: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "This field is required";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = "Invalid email address";

            if (!values.password) errors.password = "This field is required";
            else if (values.password.length < 8)
              errors.password = "Minimum length of password should be >= 8";

            if (!values.contactNo) errors.contactNo = "This field is required";
            else if (!/^[0-9]{10}$/.test(values.contactNo))
              errors.contactNo =
                "Contact no. should be of 10 digits only and a number";
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(registerUser(values));
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
              <div className="form-field">
                <Field
                  type="text"
                  name="contactNo"
                  placeholder="Enter Contact No."
                  autoComplete="off"
                  patter="[0-9]+"
                />
                <ErrorMessage
                  className="field-error"
                  name="contactNo"
                  component="div"
                />
              </div>
              <div className="form-field">
                <button
                  className="btn"
                  type="submit"
                  disabled={!isValid || loading}
                >
                  {loading ? "Loading" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Register;
