"use client";
const UseLocalStorage = () => {
  const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  return {
    setLocalStorage,
  };
};

export default UseLocalStorage;
