import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../scss/addquote.scss";
import ProfilePic from "./ProfilePic";
import { getQuotes, saveQuote } from "../utils/quotes/quoteActions";
import Alert from "./Alert";
import { useEffect } from "react";
import { resetQuotesState } from "../utils/quotes/quoteSlice";
const AddQuote = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, success, quotes } = useSelector(
    (state) => state.quotes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (quotes && quotes?.status === 200) {
      console.log("calling");
      dispatch(getQuotes(userInfo.id));
    }
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch, quotes, userInfo]);

  return (
    <Formik
      validateOnMount={true}
      initialValues={{ content: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.content) {
          errors.content = "This field is required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const request = { content: values.content, userId: userInfo.id };
        dispatch(saveQuote(request));
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
          <section className="add-quote flex">
            <ProfilePic />
            <div className="quote-input relative flex-1">
              <Field
                as="textarea"
                name="content"
                placeholder="Add your favorite quote, excerpt etc."
                className="quotes-text"
              />
              <ErrorMessage
                className="field-error"
                name="content"
                component="div"
              />
              <div className="absolute w-[100%]">
                <ul className="flex justify-between items-center">
                  <li>
                    <em className="fa fa-image text-xl"></em>
                  </li>
                  <li>
                    <button className="btn btn-small mt-2" type="submit">
                      Post
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default AddQuote;
