import { render, screen } from "../../test-utils";
import SignIn from "./Signin.page";
import userEvent from "@testing-library/user-event";

import { act } from "react-test-renderer";

const user = userEvent.setup();

describe("Sign In page", () => {
  test("renders correctly", () => {
    render(<SignIn />);

    const headind = screen.getByRole("heading", {
      name: /sign in/i,
    });
    expect(headind).toBeInTheDocument();

    const username = screen.getByText(/username/i);
    expect(username).toBeInTheDocument();

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    expect(usernameInput).toBeInTheDocument();

    // const passwordLable = screen.getByTestId("password");
    // expect(passwordLable).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const signinButton = screen.getByRole("button", { name: /sign in/i });
    expect(signinButton).toBeInTheDocument();
    ////should not present
    const signOutButton = screen.queryByRole("button", { name: /sign out/i });
    expect(signOutButton).not.toBeInTheDocument();
  });

  test("tab click", async () => {
    render(<SignIn />);
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const forgetPassword = screen.getByRole("link", {
      name: /forgot your password\?/i,
    });
    const signinButton = screen.getByRole("button", { name: /sign in/i });

    await user.tab();
    expect(usernameInput).toHaveFocus();
    await user.tab();
    expect(passwordInput).toHaveFocus();
    await user.tab();
    expect(forgetPassword).toHaveFocus();
    await user.tab();
    expect(signinButton).toHaveFocus();
  });

  test("Input field value", async () => {
    render(<SignIn />);
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "kminchelle");
    expect(usernameInput).toHaveValue("kminchelle");

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, "0lelplR");
    expect(passwordInput).toHaveValue("0lelplR");
  });
});
