import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Message = ({ status, children }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
const Error = ({ status, children }) => {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  });
  return (
    alert && (
      <Alert status={status}>
        <AlertIcon />
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    )
  );
};

export { Message, Error };
