import Counter from "./PlaceholderTest.jsx";
import React from "react";
import { render } from "@testing-library/react";

//ignorar erros, eles são inputs para o Jest.

describe("Counter Component", () => {
  it("renders with initial count", () => {
    const { getByTestId } = render(<Counter initialCount={0} />);
    const countValue = getByTestId("count").textContent;
    expect(countValue).toBe("Count: 0");
  });
});
