import React, { useState } from "react";
// import Image from "next/image";
// import { GetServerSideProps } from "next";
import { AllProductsProps } from "@/interfaces";

interface DataProps {
  data: AllProductsProps[];
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch("https://fakestoreapi.com/products?limit=30");
//   const data = await response.json();
//   console.log("server", data);
//   return {
//     props: {
//       data,
//     },
//   };
// };

export default function Carousel({ data }: DataProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Carousel Content */}
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <img
              src={item.image}
              alt="gak onok gambare slur..."
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        Prev
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        Next
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

// export default CarouselComponent;
