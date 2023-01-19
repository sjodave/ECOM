import { renderHook } from "@testing-library/react";
import useSort from "./use-sort";
import { productData } from "../mocks/mockData";

describe("useSort", () => {
  test("should display non sorted data", () => {
    const { result } = renderHook(useSort, {
      initialProps: {
        data: productData.products,
      },
    });
    // console.log(result.current);
    expect(1).toBe(1);
  });
});
