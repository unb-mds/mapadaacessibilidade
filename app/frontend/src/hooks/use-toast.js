// src/hooks/use-toast.js
import { toast } from "react-toastify";

export const useToast = () => {
  const showToast = (title, description, variant = "default") => {
    const content = `${title}: ${description}`;
    const options = {
      position: "top-right",
      autoClose: 5000,
    };

    switch (variant) {
      case "success":
        toast.success(content, options);
        break;
      case "error":
      case "destructive": // mapeia destructive como error
        toast.error(content, options);
        break;
      case "info":
        toast.info(content, options);
        break;
      case "warn":
      case "warning":
        toast.warn(content, options);
        break;
      default:
        toast(content, options);
    }
  };

  return {
    toast: showToast,
  };
};
