import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { useSnackbar } from "./hooks/useSnackbar";
import FileUpload from "./FileUpload";
import { useGSTCheck } from "./hooks/useGSTCheck";
import { useGSTValidation } from './hooks/useGSTValidation';

export default function InvoiceUpload() {
  const [values, setValues] = useState({
    gstNumber: "",
    assignedBuyer: "",
    invoiceAmount: "",
    file: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const validateGST = useGSTValidation();
  const { open, message, showSnackbar, hideSnackbar } = useSnackbar();
  const { isLoading, isGSTValid, checkGST } = useGSTCheck(showSnackbar);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [values, isSubmitted]);

  const validateForm = () => {
    const errors = {};
    if (!validateGST(values.gstNumber)) {
      errors.gstNumber = "Invalid GST Number";
    }
    if (!values.assignedBuyer) {
      errors.assignedBuyer = "Buyer must be selected";
    }
    if (isNaN(values.invoiceAmount) || values.invoiceAmount <= 0) {
      errors.invoiceAmount = "Enter a valid amount";
    }
    if (!values.file) {
      errors.file = "File must be uploaded";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      showSnackbar("Submitting form ....");
      setTimeout(() => {
        navigate("/otp-verification");
      }, 2000);
    }
  };
  const handleGSTCheck = async () => {
    await checkGST(values.gstNumber);
  };

  const handleFileUpload = (files) => {
    setValues({
      ...values,
      file: files[0]
    });
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Invoice Upload
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 1 }}
        >
          <FormControl
            fullWidth
            margin="normal"
          >
            <TextField
              label="GST Number"
              margin="normal"
              name="gstNumber"
              value={values.gstNumber}
              onChange={handleChange}
              error={isSubmitted && Boolean(errors.gstNumber)}
            />
            <Button onClick={handleGSTCheck} disabled={isLoading}>
              {isLoading ? "Checking..." : "Check GST"}
            </Button>
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            error={isSubmitted && Boolean(errors.assignedBuyer)}
          >
            <InputLabel id="assigned-buyer-label">Assigned Buyer</InputLabel>
            <Select
              labelId="assigned-buyer-label"
              id="assigned-buyer-select"
              name="assignedBuyer"
              value={values.assignedBuyer}
              label="Assigned Buyer"
              onChange={handleChange}
            >
              <MenuItem value="Buyer 1">Buyer 1</MenuItem>
              <MenuItem value="Buyer 2">Buyer 2</MenuItem>
              {/* Add additional MenuItem components for more buyers as needed */}
            </Select>
            {isSubmitted && errors.assignedBuyer && (
              <Box sx={{ color: "error.main" }}>{errors.assignedBuyer}</Box>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="Invoice Amount"
            margin="normal"
            name="invoiceAmount"
            value={values.invoiceAmount}
            onChange={handleChange}
            error={isSubmitted && Boolean(errors.invoiceAmount)}
            helperText={isSubmitted && errors.invoiceAmount}
            type="number"
          />
          <FileUpload onFileAccepted={handleFileUpload} />
          {isSubmitted && errors.file && (
            <Box sx={{ color: "error.main" }}>{errors.file}</Box>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Upload Invoice
          </Button>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={hideSnackbar}
          message={message}
        />
      </CardContent>
    </Card>
  );
}
