"use client";
import { useState } from "react";

const LoaderState = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const setLoaderState = (value: boolean) => {
    setIsloading(value);
  };
  return {
    isLoading,
    setLoaderState,
  };
};

export default LoaderState;
