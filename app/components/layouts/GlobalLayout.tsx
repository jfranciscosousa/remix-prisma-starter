import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="contents" ref={animationParent}>
      {children}
    </div>
  );
}
