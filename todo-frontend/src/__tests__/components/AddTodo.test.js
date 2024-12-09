import React from "react";
import { render, screen } from "@testing-library/react";
import AddTodo from "../../components/AddTodo";

describe("Testing the AddTodo component", () => {
  test("Render the input field and add button", () => {
    render(<AddTodo onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("Enter a new todo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add todo/i })).toBeInTheDocument();
  });
});
