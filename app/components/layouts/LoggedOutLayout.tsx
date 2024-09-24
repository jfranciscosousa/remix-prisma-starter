import { ReactNode } from "react";

export default function LoggedOutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {children}
    </div>
  );
}
