import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type ToastType = "success" | "error" | "info";

interface ToastStore {
  toast: { type: ToastType; message: string } | null;
  showToast: (type: ToastType, message: string) => void;
  clearToast: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (type, message) => set({ toast: { type, message } }),
  clearToast: () => set({ toast: null }),
}));

export const useToastState = () =>
  useToastStore(
    useShallow((state) => ({
      toast: state.toast,
      showToast: state.showToast,
      clearToast: state.clearToast,
    }))
  );
