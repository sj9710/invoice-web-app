import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar
} from "@mui/material";
import { useFormValidation } from "./hooks/useFormValidation";
import { useSnackbar } from "./hooks/useSnackbar";

const OTP_LENGTH = 4;
const OTP = "1234";

const validateOTP = (values) => {
  const errors = {};
  if (values.otp !== OTP) {
    errors.otp = "Incorrect OTP. Please try again.";
  }
  return errors;
};

export default function OTPVerification() {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors
  } = useFormValidation({ otp: "" }, validateOTP);
  const { open, message, showSnackbar, hideSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (handleSubmit(event)) {
      showSnackbar("Invoice uploaded successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      showSnackbar("Incorrect OTP. Please try again.");
    }
  };

  const handleResendOTP = () => {
    showSnackbar('OTP code has been resent.');
  };

  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogTitle>Verify OTP</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Enter OTP"
            margin="normal"
            name="otp"
            value={values.otp}
            onChange={handleChange}
            error={Boolean(errors.otp)}
            helperText={errors.otp || `Enter the ${OTP_LENGTH}-digit OTP sent to you.`}
            inputProps={{ maxLength: OTP_LENGTH }}
          />
          <Button type="button" onClick={handleResendOTP} fullWidth variant="outlined" sx={{ mt: 2 }}>
            Resend OTP
          </Button>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Verify OTP
          </Button>
        </form>
      </DialogContent>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        message={message}
      />
    </Dialog>
  );
}
