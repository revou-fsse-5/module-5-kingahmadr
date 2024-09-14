import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardsAllProducts from "../components/CardsAllProducts";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import { DataProvider } from "../contexts/UseDataContext";
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
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  beforeAll(async () => {
    await delay(10000);
  });
  test("add to cart button", async () => {
    render(
      <DataProvider>
        <MemoryRouter>
          <CardsAllProducts />
        </MemoryRouter>
      </DataProvider>
    );
    userEvent.click(screen.getByLabelText("add to shopping cart"));
    await waitFor(() => {
      expect(isLocalStorageKeyExists("Carted") === true);
    });
  });

  test("should have the add to cart button", async () => {
    // Wait for the button to appear in the DOM
    const addToCartButtons = await screen.findAllByLabelText(
      "add to shopping cart"
    );

    // Check if at least one "add to cart" button exists
    expect(addToCartButtons.length).toBeGreaterThan(0);

    // Optionally, assert on a specific button element
    const addToCartButton = addToCartButtons[0];
    expect(addToCartButton).toBeInTheDocument();
  });
  test("is Image loaded", async () => {
    render(
      <DataProvider>
        <MemoryRouter>
          <CardsAllProducts />
        </MemoryRouter>
      </DataProvider>
    );
    // await waitFor(() => {
    const image =
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg";
    const imgElement = screen.findAllByLabelText("media-card");
    expect(imgElement).toHaveAttribute("src", image);
  });
  // });
});
