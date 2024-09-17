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
  const getLocalStorage = (key: string) => {
    const state = localStorage.getItem(key);
    return state;
  };
  return {
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage,
  };
};

export default UseLocalStorage;
