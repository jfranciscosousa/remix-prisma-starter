import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ReactNode } from "react";

export default function LoggedOutLayout({ children }: { children: ReactNode }) {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      ref={animationParent}
    >
      {children}
    </div>
  );
}
