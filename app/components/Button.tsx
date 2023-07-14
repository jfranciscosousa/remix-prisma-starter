import classNames from "classnames";
import { ComponentPropsWithRef, forwardRef } from "react";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = "primary",
    isLoading,
    className: initialClassName,
    ...restOfProps
  } = props;
  const className = classNames(
    initialClassName,
    "btn",
    "disabled:btn-disabled",
    "disabled:cursor-not-allowed",
    {
      "btn-primary": variant === "primary",
      "btn-secondary": variant === "secondary",
    },
  );
  const disabledAttrs = isLoading
    ? { disabled: true }
    : { disabled: props.disabled };

  return (
    // eslint-disable-next-line react/button-has-type
    <button ref={ref} {...restOfProps} {...disabledAttrs} className={className}>
      {isLoading && <span className="loading loading-spinner"></span>}
      {!isLoading && children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
