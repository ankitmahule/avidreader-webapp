import { useEffect, useState } from "react";

const Alert = ({ message, errorCode }) => {
  const [isAlertMessageVisible, setIsAlertVisible] = useState(true);

  useEffect(() => {
    // ssetIsAlertVisible(true);
    const alertTime = setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
    return () => {
      clearTimeout(alertTime);
    };
  }, []);

  return (
    isAlertMessageVisible && (
      <p
        className={
          errorCode
            ? "error-text alert-response"
            : "success-text alert-response"
        }
      >
        {message}
      </p>
    )
  );
};

export default Alert;
