// useGSTValidation.js
export function useGSTValidation() {
    const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[A-Z0-9]{1}$/;
  
    const validateGST = (gstNumber) => {
      return GST_REGEX.test(gstNumber);
    };
  
    return validateGST;
  }
  