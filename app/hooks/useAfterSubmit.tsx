import { useEffect } from "react";
import { usePrevious } from "react-use";
import { useTransition } from "remix";

export default function useAfterSubmit(callback: CallableFunction) {
  const transition = useTransition();
  const previousTransition = usePrevious(transition);

  const hadSubmission = Boolean(previousTransition?.submission);
  const isNowIdle = transition.type === "idle";

  useEffect(() => {
    if (hadSubmission && isNowIdle) {
      callback();
    }
  }, [callback, hadSubmission, isNowIdle]);
}
