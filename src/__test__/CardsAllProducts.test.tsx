import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardsAllProducts from "../components/CardsAllProducts";
import "@testing-library/jest-dom";
// import { useState } from "react";

// interface CategoryProps {
//   id: number;
//   name: string;
//   image: string;
// }
// interface ProductCardProps {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: CategoryProps;
//   images: [];
// }

// const mockProductData: ProductCardProps["data"] = {
//   id: 1,
//   title: "Test Product",
//   price: 29.99,
//   description: "This is a test product description.",
//   category: {
//     id: 1,
//     name: "Test Category",
//     image: "https://via.placeholder.com/150",
//   },
//   images: ["https://via.placeholder.com/150"],
// };

const isLocalStorageKeyExists = (key: string) => {
  return localStorage.getItem(key) !== null;
};

describe("Component test", () => {
  test("add to cart button", async () => {
    render(<CardsAllProducts />);
    userEvent.click(screen.getByLabelText("add to shopping cart"));
    await waitFor(() => {
      expect(isLocalStorageKeyExists("Carted") === true);
    });
  });

  test("is Image loaded", () => {
    render(<CardsAllProducts />);
    const image =
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg";
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("src", image);
  });
});
