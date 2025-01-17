import { toast } from "react-toastify";

// Success toast
export const showSuccessToast = (message:string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // Auto close after 3 seconds
  });
};

// Error toast
export const showErrorToast = (message:string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

// Info toast
export const showInfoToast = (message:string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

// Warning toast
export const showWarningToast = (message:string) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 3000,
  });
};
