import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import "../scss/forms.scss";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../utils/auth/authActions";
import { resetAuthState } from "../utils/auth/authSlice";

const Register = ({ toggleLoginRegisterView }) => {
  const { loading, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  function toggleView() {
    toggleLoginRegisterView(false);
  }
  return (
    <div className="form-container">
      <div className="login-form">
        <Formik
          validateOnMount={true}
          initialValues={{
            email: "",
            password: "",
            contactNo: "",
            firstName: "",
            lastName: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) errors.firstName = "This field is required";
            if (!values.lastName) errors.lastName = "This field is required";

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
              <div className="form-field flex justify-between">
                <div class="name-container">
                  <div className="relative">
                    <Field
                      type="text"
                      placeholder=""
                      name="firstName"
                      autoComplete="off"
                    />
                    <label>First Name</label>
                  </div>
                  <ErrorMessage
                    className="field-error"
                    name="firstName"
                    component="div"
                  />
                </div>

                <div className="name-container">
                  <div className="relative">
                    <Field
                      type="text"
                      placeholder=""
                      name="lastName"
                      autoComplete="off"
                    />
                    <label>Last Name</label>
                  </div>
                  <ErrorMessage
                    className="field-error"
                    name="lastName"
                    component="div"
                  />
                </div>
              </div>

              <div className="form-field">
                <div className="relative">
                  <Field
                    type="email"
                    placeholder=""
                    name="email"
                    autoComplete="off"
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
                    placeholder=""
                    name="password"
                    autoComplete="off"
                  />
                  <label>Password</label>
                </div>
                <ErrorMessage
                  className="field-error"
                  name="password"
                  component="div"
                />
              </div>
              <div className="form-field">
                <div className="relative">
                  <Field
                    type="text"
                    name="contactNo"
                    autoComplete="off"
                    placeholder=""
                  />
                  <label>Contact No.</label>
                </div>
                <ErrorMessage
                  className="field-error"
                  name="contactNo"
                  component="div"
                />
              </div>
              <div className="flex justify-between items-center">
                <p
                  className="text-gray-400 cursor-pointer"
                  onClick={toggleView}
                >
                  Already a user? Sign In
                </p>
                <div className="form-field">
                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Loading" : "Submit"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Register;
