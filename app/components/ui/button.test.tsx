import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./button";

const TEXT_CONTENT = "foobar";

describe("Button", () => {
  it("renders a button", () => {
    render(<Button>{TEXT_CONTENT}</Button>);

    expect(screen.getByRole("button")).toHaveTextContent(TEXT_CONTENT);
  });

  it("disables the button when it's loading", () => {
    render(<Button isLoading>{TEXT_CONTENT}</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
