import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginForm";
import { vi } from "vitest";

describe("Component test", () => {
  beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
      clear: vi.fn(),
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
  });
  test("Element test", async () => {
    render(<LoginForm />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute("type", "submit");
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
