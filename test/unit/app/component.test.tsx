import { test, expect } from "bun:test";
import { renderToString } from "react-dom/server";
import { Component } from "../../../src/app/component";

test("dom test", async () => {
  document.body.innerHTML = renderToString(<Component />);
  const input = document.querySelector(
    'input[name="ocelots"]',
  ) as HTMLInputElement;

  expect(input?.value).toEqual("1");

  const button = document.querySelector("button") as HTMLButtonElement;
  button.click();

  const energy = document.querySelector("p#energy") as HTMLDivElement;
  expect(energy.textContent).toEqual("Energy: 1");
});
