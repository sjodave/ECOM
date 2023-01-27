import { renderHook } from "@testing-library/react";
import useSort from "./use-sort";
import {
  priceHighToLow,
  priceLowToHigh,
  productsList,
  sortByDiscount,
  sortByRating,
} from "../mocks/mockData";
import { act } from "react-test-renderer";

describe("useSort", () => {
  test("should display non sorted data", () => {
    const { result } = renderHook(useSort, {
      initialProps: productsList,
    });
    expect(result.current.sortedData).toBe(productsList.products);
  });

  test("Should display sorted by price high to low", () => {
    const { result } = renderHook(useSort, {
      initialProps: productsList,
    });
    act(() => result.current.setSortBy(["price", "asc"]));
    expect(result.current.sortedData).toEqual(priceLowToHigh);
  });

  test("Should display sorted by price low to high", () => {
    const { result } = renderHook(useSort, {
      initialProps: productsList,
    });
    act(() => result.current.setSortBy(["price", "decs"]));
    expect(result.current.sortedData).toEqual(priceHighToLow);
  });

  test("Should display sorted by rating", () => {
    const { result } = renderHook(useSort, {
      initialProps: productsList,
    });
    act(() => result.current.setSortBy(["rating", "decs"]));
    expect(result.current.sortedData).toEqual(sortByRating);
  });

  test("Should display sorted by discount", () => {
    const { result } = renderHook(useSort, {
      initialProps: productsList,
    });
    act(() => result.current.setSortBy(["discountPercentage", "decs"]));
    expect(result.current.sortedData).toEqual(sortByDiscount);
  });
});
