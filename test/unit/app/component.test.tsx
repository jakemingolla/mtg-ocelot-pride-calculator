import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Component } from "../../../src/app/component";

afterEach(() => {
  cleanup();
});

test("basic test", async () => {
  const user = userEvent.setup();
  render(<Component />);

  await user.click(screen.getByText("Calculate"));

  const energy = document.getElementById("energy");
  expect(energy?.innerText).toBe("Energy: 1");
});

test("test with changed input", async () => {
  const user = userEvent.setup();
  render(<Component />);

  const ocelots = document.getElementById("ocelots") as HTMLInputElement;
  await user.type(ocelots, "{backspace}2");

  await user.click(screen.getByText("Calculate"));

  const energy = document.getElementById("energy");
  expect(energy?.innerText).toBe("Energy: 2");
});
