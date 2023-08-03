import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Alert = ({ message, errorCode }) => {
  const [isAlertMessageVisible, setIsAlertVisible] = useState(true);

  useEffect(() => {
    let alertTime;
    if (errorCode) {
      alertTime = setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
    return () => {
      if (alertTime) clearTimeout(alertTime);
    };
  }, [errorCode]);

  return (
    isAlertMessageVisible && (
      <p
        className={
          errorCode
            ? "error-text alert-response"
            : "success-text alert-response"
        }
      >
        {errorCode ? (
          message
        ) : (
          <>
            {message}. Please proceed with&nbsp;
            <Link className="link" to="/">
              Login
            </Link>
            &nbsp;and enjoy the app.
          </>
        )}
      </p>
    )
  );
};

export default Alert;
