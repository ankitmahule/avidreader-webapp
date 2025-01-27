import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../scss/addquote.scss";
import ProfilePic from "./ProfilePic";
import {
  getQuotes,
  saveQuote,
  uploadQuote,
} from "../utils/quotes/quoteActions";
import Alert from "./Alert";
import { useEffect, useState } from "react";
import { resetQuotesState } from "../utils/quotes/quoteSlice";
import Modal from "./Modal";
const AddQuote = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { error, success } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && success?.status === 200) {
      dispatch(getQuotes());
    }
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch, success]);

  function onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      setShowModal(true);
      setImage(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  }

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
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

                {image && <img src={image} alt="quote image" />}
                <div className="absolute w-[100%]">
                  <ul className="flex justify-between items-center">
                    <li>
                      <label htmlFor="quotefile">
                        <em className="fa fa-image text-xl"></em>
                        <Field
                          type="file"
                          name="quotefile"
                          id="quotefile"
                          onChange={onFileSelect}
                          className="quote-file-input"
                        ></Field>
                      </label>
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
      <Modal
        open={showModal}
        close={() => handleClose()}
        content={image}
      ></Modal>
    </>
  );
};

export default AddQuote;
