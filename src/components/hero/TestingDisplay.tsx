import React from "react";
import { AllProductsProps } from "@/interfaces";

interface DataProps {
  data: AllProductsProps[];
}
const TestingDisplay = ({ data }: DataProps) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <img
            src={`${item.image}`}
            alt="gak onok gambare slur"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </div>
      ))}
    </div>
  );
};

export default TestingDisplay;
