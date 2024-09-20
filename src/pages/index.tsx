import CategoryTab from "@/components/CategoryTab";
import Navbar from "@/components/Navbar";
// import HeroComponent from "@/components/hero/HeroComponent";
// import CarouselComponent from "@/components/hero/CarouselComponent";
// import TestingDisplay from "@/components/hero/TestingDisplay";
import { GetServerSideProps } from "next";
import { AllProductsProps } from "@/interfaces";

interface DataProps {
  data: AllProductsProps[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=30");
  const data = await response.json();
  console.log("server", data);
  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: DataProps) {
  // export default function Home() {
  return (
    <div>
      <Navbar />
      <CategoryTab data={data} />
    </div>
  );
}
