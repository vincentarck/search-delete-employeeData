import { render, screen } from '@testing-library/react';
import App from './App';

test("inputs should initially empty", () => {
  render(<App />)
  const emailInputField = screen.getByRole("textbox");
  const passwordField = screen.getByLabelText("Password")
  expect(emailInputField.value).toBe("");
  expect(passwordField.value).toBe("")
})
