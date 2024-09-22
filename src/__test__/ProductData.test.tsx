import ProductCard, { ProductCardProps } from "../components/ProductCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";

const mockProductData: ProductCardProps["data"] = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  description: "This is a test product description.",
  category: {
    id: 1,
    name: "Test Category",
    image: "https://via.placeholder.com/150",
  },
  images: ["https://via.placeholder.com/150"],
};

describe("ProductCard Component", () => {
  test("renders product data correctly", () => {
    render(<ProductCard data={mockProductData} />);

    // Assert the image is rendered with the correct alt text and source
    const productImage = screen.getByRole("img", { name: /test product/i });
    expect(productImage).toHaveAttribute("src", mockProductData.images[0]);

    // Assert the title is rendered
    const productTitle = screen.getByText(/test product/i);
    expect(productTitle).toBeInTheDocument();
    expect(screen.getByText(/test product/i)).toBeInTheDocument();

    // Assert the category is rendered
    const productCategory = screen.getByText(/test category/i);
    expect(productCategory).toBeInTheDocument();

    // Assert the price is rendered
    const productPrice = screen.getByText(/\$29.99/);
    expect(productPrice).toBeInTheDocument();

    // Assert the "Add to Cart" button is rendered
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();
  });
});
