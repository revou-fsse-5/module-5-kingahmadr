import React from "react";

// export interface ProductCardProps {
//   id: 1;
//   title: "Test Product";
//   price: 29.99;
//   description: "This is a test product description.";
//   category: {
//     id: 1;
//     name: "Test Category";
//     image: "https://via.placeholder.com/150";
//   };
//   images: "https://via.placeholder.com/150";
// }
export interface ProductCardProps {
  data: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
      id: number;
      name: string;
      image: string;
    };
    images: string[];
  };
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <img className="" src={data.images[0]} alt={data.title} />
      <p>{`Category: ${data.category.name}`}</p>
      <p>{`Price: $${data.price}`}</p>
      <div>
        <button className="rounded border p-2 mt-10">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
