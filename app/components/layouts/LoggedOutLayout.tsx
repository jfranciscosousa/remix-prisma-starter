import { ReactNode } from "react";

export default function LoggedOutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
