import Counter from "./PlaceholderTest.jsx";
import React from "react";
import { render } from "@testing-library/react";

describe("Counter Component", () => {
  it("renders with initial count", () => {
    const { getByTestId } = render(<Counter initialCount={0} />);
    const countValue = getByTestId("count").textContent;
    expect(countValue).toBe("Count: 0");
  });
});
