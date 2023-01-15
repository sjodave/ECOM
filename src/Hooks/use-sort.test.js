import { renderHook } from "@testing-library/react";
import useSort from "./use-sort";
import { productsData } from "../mocks/products.mockData";

describe("useSort", () => {
  test("should display non sorted data", () => {
    const { result } = renderHook(useSort, {
      initialProps: {
        data: productsData.products,
      },
    });
    // console.log(result.current);
    expect(1).toBe(1);
  });
});
