import { useEffect, useState } from "react";
import Link from "next/link";

const Alert = (message) => {
  const [isAlertMessageVisible, setIsAlertVisible] = useState(true);
  useEffect(() => {
    let alertTime;
    if (message && (message.code || message.errorCode)) {
      alertTime = setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
    return () => {
      if (alertTime) clearTimeout(alertTime);
      setIsAlertVisible(false);
    };
  }, [message]);

  /* return (
    isAlertMessageVisible && (
      /*<p
        className={
          errorCode
            ? "error-text alert-response"
            : "success-text alert-response"
        }
      >
        {{message ? (
          message
        ) : (
          <>
            {message}. Please proceed with&nbsp;
            <Link className="link" href="/">
              Login
            </Link>
            &nbsp;and enjoy the app.
          </>
        ) } }
      </p>
    )
  );*/

  return (
    message &&
    (message.code || message.errorCode) &&
    isAlertMessageVisible && (
      <p className="error-text alert-response">{message.message}</p>
    )
  );
};

export default Alert;
