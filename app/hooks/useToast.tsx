import uniqueId from "lodash/uniqueId";
import { ReactNode } from "react";
import { create } from "zustand";

type ToastType = "info" | "success" | "warning" | "error";

export interface ToastProps {
  children: ReactNode;
  type?: ToastType;
  isOpen?: boolean;
}

export interface ToastState {
  toasts: (ToastProps & { id: string })[];
  toast: (message: string, type?: ToastType) => void;
}

const TOAST_DURATION = 3500;

const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  toast: (message: string, type?: ToastType) => {
    const id = uniqueId();
    const currentToasters = get().toasts;

    setTimeout(() => {
      set({
        toasts: get().toasts.filter((toaster) => toaster.id !== id),
      });
    }, TOAST_DURATION);

    set({
      toasts: [
        ...currentToasters,
        {
          id,
          children: message,
          type,
          isOpen: true,
        },
      ],
    });
  },
}));

export function ToastsRenderer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-0 right-0 h-screen w-screen pointer-events-none">
      <ul className="flex flex-col justify-end h-full gap-2 p-2">
        {toasts.map((toast) => (
          <li
            key={toast.id}
            className={`alert alert-${toast.type || "info"} w-max ml-auto`}
          >
            {toast.children}
          </li>
        ))}
      </ul>
    </div>
  );
}

function useToast() {
  const toast = useToastStore((state) => state.toast);

  return { toast };
}

export default useToast;
