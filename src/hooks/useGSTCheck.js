import { useState } from "react";
import { useGSTValidation } from './useGSTValidation';

export function useGSTCheck(showSnackbar) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGSTValid, setIsGSTValid] = useState(null);
  const validateGST = useGSTValidation();

  const checkGST = async (gstNumber) => {
    if (!validateGST(gstNumber)) {
      setIsGSTValid(false);
      showSnackbar("Invalid GST Number");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://sheet.gstincheck.co.in/check/95b1084a1ffafd6669a7ca59cc88a1bb/${gstNumber}`
      );
      const data = await response.json();
      setIsGSTValid(data.flag);
      if (data.flag) {
        showSnackbar("Valid GST Number");
      } else {
        showSnackbar("Invalid GST Number");
      }
    } catch (error) {
      setIsGSTValid(false);
      showSnackbar("Invalid GST Number");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isGSTValid,
    checkGST
  };
}