import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chip from "./Chip"; // J'ai ajusté le chemin d'import selon l'erreur que vous avez montrée précédemment.

test("it renders the label correctly", () => {
  render(<Chip label="My label" onDelete={() => {}} />);
  const labelElement = screen.getByText(/My label/i);
  expect(labelElement).toBeInTheDocument();
});

test("it displays the FontAwesome close icon", () => {
  render(<Chip label="My label" onDelete={() => {}} />);
  const icon = screen.getByTestId("close-icon");
  expect(icon).toBeInTheDocument();
});

test("it calls onDelete when the close icon is clicked", () => {
  const onDeleteMock = jest.fn();
  render(<Chip label="My label" onDelete={onDeleteMock} />);
  const closeButton = screen.getByRole("button");
  fireEvent.click(closeButton);
  expect(onDeleteMock).toHaveBeenCalled();
});
