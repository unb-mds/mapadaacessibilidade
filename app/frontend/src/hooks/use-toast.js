// src/hooks/use-toast.js
import { toast } from 'react-toastify';

export const useToast = () => {
  const showToast = (title, description, variant = 'default') => {
    toast[variant](`${title}: ${description}`, {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return {
    toast: showToast
  };
};