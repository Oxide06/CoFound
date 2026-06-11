import toast from "react-hot-toast";

export const useToast = () => ({
  success: toast.success,
  error: toast.error,
  promise: toast.promise
});
