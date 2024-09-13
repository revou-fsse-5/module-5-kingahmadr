import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginForm";

describe("Component test", () => {
  beforeEach(() => {
    localStorage.clear();
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
