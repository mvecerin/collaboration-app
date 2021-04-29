import { useRef } from "react";

export const useScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => {
    elRef.current &&
      elRef.current.scrollTo({
        top: elRef.current.scrollHeight,
        behavior: "smooth",
      });
  };
  return [elRef, executeScroll] as const;
};
