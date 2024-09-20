// "use client";

import { AllProductsProps } from "@/interfaces";
// import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { maxWidthMediaQuery, fontSizeMediaQuery } from "@/constans";
// import { useEffect, useState } from "react";
import { addSingleProductToCart } from "@/api";
// import { RotatingLoader } from "@/components/Loader/NewLoader";
import { useRouter } from "next/navigation";
import { UseDataContext } from "@/contexts/UseDataContext";
import { Authorization } from "@/lib/Authorization";
import { GetStaticProps, GetStaticPaths } from "next";

// import Loader from "@/app/components/Loader/Loader";

interface SingleProductProps extends AllProductsProps {
  images: string[];
  image: string;
  title: string;
  // other properties...
}

interface DataProps {
  data: AllProductsProps;
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch("http://localhost:9000/books?_limit=10");
//   const books: IBook[] = await response.json();
//   console.log("path");
//   const paths = books.map((book) => ({
//     params: { bookId: book.id.toString() },
//   }));

//   return { paths, fallback: true };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=30");

  const data: AllProductsProps[] = await response.json();
  // if (!data) {
  //   return { paths: [], fallback: true };
  // }
  console.log("path");
  const paths = data
    .filter((product) => product.id !== undefined)
    .map((product) => ({
      params: { productsID: product.id!.toString() },
    }));

  return { paths, fallback: true };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const router = useRouter()
//   // const notFound = router.push('/not-found')
//   const { params } = context;
//   if (!params?.productsID) {
//     return { notFound: true };
//   }
//   const response = await fetch(
//     `https://fakestoreapi.com/products/${params.productsID}`
//   );
//   const data: AllProductsProps[] = await response.json();
//   console.log("server", data);
//   return {
//     props: {
//       data,
//     },
//   };
// };
export const getStaticProps: GetStaticProps = async (context) => {
  // const router = useRouter()
  // const notFound = router.push('/not-found')
  const { params } = context;
  if (!params?.productsID) {
    return { notFound: true };
  }
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.productsID}`
  );

  if (!response.ok) {
    return { notFound: true };
  }
  const data: AllProductsProps[] = await response.json();
  if (!data) {
    return { notFound: true };
  }
  console.log("server", data);
  return {
    props: {
      data,
      revalidate: 3,
    },
  };
};

const ProductDetailPage = ({ data }: DataProps) => {
  // const [singleDataProduct, setSingleDataProduct] = useState<
  //   AllProductsProps[] | undefined
  // >([]);
  const router = useRouter();
  const { addCartTotalContext } = UseDataContext();
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getSingleProducts(params.productsID);
  //     setSingleDataProduct(data);
  //     console.log("data", data);
  //   }
  //   fetchData();
  // }, [params.productsID]);
  // //   const singleDataProduct: AllProductsProps[] | undefined =
  // //     await getSingleProducts(params.productsID);
  // console.log("Data products", singleDataProduct);
  // if (!singleDataProduct) {
  //   return (
  //     <div className="flex gap-10 p-10 justify-center">
  //       <RotatingLoader />
  //       {/* <p>Loading ...</p> */}
  //     </div>
  //   );
  // }

  const addToCart = async (id?: string | number) => {
    const rememberMe: string | null = localStorage.getItem("rememberMe");

    const authorized = await Authorization();

    if (
      rememberMe === "true" &&
      authorized !== null &&
      authorized !== undefined
    ) {
      console.log("remember me", rememberMe);
      await addSingleProductToCart(id);
      addCartTotalContext();
    } else {
      if (authorized === null || authorized === undefined) {
        alert(`You must login first to add product to cart`);
        console.log("authorized from products", authorized);
        // console.log(accessTokenCookies);
        router.push("/login");
      } else {
        await addSingleProductToCart(id);
        addCartTotalContext();
      }
    }
  };

  const renderSingleProduct = Array.isArray(data) ? (
    data.map((product, index) => (
      <Box
        component="section"
        key={index}
        sx={{
          p: 4,
          display: "flex",
          border: 1,
          borderColor: "grey.500",
          m: "2rem",
          maxWidth: maxWidthMediaQuery,
          mx: "auto",
          mt: "10rem",
        }}
      >
        <Card
          sx={{ maxWidth: 345, maxHeight: 250, p: 1, alignContent: "center" }}
        >
          <CardMedia
            component="img"
            height="auto"
            // image={
            //   product.images?.[0] ? product.images[0] : "fallback-image-url"
            // }
            image={product.image}
            alt="Product image"
          />
        </Card>
        <div>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              // fontSize: 40,
              fontSize: fontSizeMediaQuery,
              ml: "1.5rem",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            display={{
              xs: "none",
              sm: "block",
              md: "block",
            }}
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: 15,
                sm: 15,
                md: 20,
              },
              m: "1.5rem",
            }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: 20,
              m: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {`Price: $${product.price},00`}
          </Typography>
          <Button
            sx={{ p: 1, m: "1rem" }}
            onClick={() => {
              addToCart(product.id);
            }}
            variant="contained"
          >
            Add To Cart
          </Button>
        </div>
      </Box>
    ))
  ) : (
    <Box
      component="section"
      sx={{
        p: 4,
        display: "flex",
        border: 1,
        borderColor: "grey.500",
        m: "2rem",
        maxWidth: "md",
        mx: "auto",
        mt: "10rem",
      }}
    >
      <Card
        sx={{ maxWidth: 345, maxHeight: 250, p: 1, alignContent: "center" }}
      >
        <CardMedia
          component="img"
          height="auto"
          image={(data as SingleProductProps).image}
          alt="Product image"
        />
      </Card>
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: 10,
              sm: 20,
              md: 40,
            },
            ml: "1.5rem",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {(data as SingleProductProps).title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: {
              xs: 5,
              sm: 10,
              md: 20,
            },
            m: "1.5rem",
          }}
        >
          {(data as SingleProductProps).description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: 20,
            m: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {`Price: $${(data as SingleProductProps).price},00`}
        </Typography>
        <Button
          sx={{ p: 1, m: "1rem" }}
          onClick={() => {
            if (
              (data as SingleProductProps) &&
              (data as SingleProductProps).id
            ) {
              addToCart((data as SingleProductProps).id);
            } else {
              console.error("Product ID is not available");
            }
          }}
          variant="contained"
        >
          Add To Cart
        </Button>
      </div>
    </Box>
  );
  return (
    <div>
      <Navbar />
      {renderSingleProduct}
    </div>
  );
};

export default ProductDetailPage;
