import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import "../scss/addquote.scss";
import ProfilePic from "./ProfilePic";
import { getQuotes, saveQuote } from "../utils/quotes/quoteActions";
import Alert from "./Alert";
import { useEffect, useState } from "react";
import { resetQuotesState } from "../utils/quotes/quoteSlice";
import Modal from "./Modal";
import LinearProgress from "@mui/material/LinearProgress";
const AddQuote = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const { loading, error, success } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && success?.status === 200) {
      setImage(null);
      setFile(null);
      dispatch(getQuotes());
    }
    return () => {
      dispatch(resetQuotesState());
    };
  }, [dispatch, success]);

  function onFileSelect(event) {
    if (event?.target?.files[0]) {
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
      {loading && <LinearProgress />}
      <Formik
        validateOnMount={true}
        initialValues={{ content: "", quotefile: "" }}
        validate={(values) => {
          let errors = {};
          if (file) return {};
          if (!values.content) {
            errors.content = "This field is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("content", values.content);
          dispatch(saveQuote(formData));
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            {!isSubmitting &&
              ((error && error !== "Network Error") || success) && (
                <Alert {...(error || success)}></Alert>
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

                {image && <img src={image} alt="quote" />}
                <div className="absolute w-[100%]">
                  <ul className="flex justify-between items-center">
                    <li>
                      <label htmlFor="quotefileInput">
                        <em className="fa fa-image text-xl"></em>
                        <Field
                          type="file"
                          name="quotefile"
                          id="quotefileInput"
                          onChange={onFileSelect}
                          className="quote-file-input"
                        ></Field>
                      </label>
                    </li>
                    <li>
                      <button
                        type="submit"
                        className="btn btn-small mt-2"
                        disabled={!isValid && !file}
                      >
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
