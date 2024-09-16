"use client";
const UseLocalStorage = () => {
  const setLocalStorage = (key: string, value: string) => {
    const state = localStorage.setItem(key, value);
    return state;
  };
  const removeLocalStorage = (key: string) => {
    const state = localStorage.removeItem(key);
    return state;
  };
  return {
    setLocalStorage,
    removeLocalStorage,
  };
};

export default UseLocalStorage;
