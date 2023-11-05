import { useState } from "react";
export function useSnackbar(initialMessage = "") {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const showSnackbar = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return {
    open,
    message,
    showSnackbar,
    hideSnackbar
  };
}
