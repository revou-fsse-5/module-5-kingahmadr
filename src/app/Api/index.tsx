const API_URL: string = "https://fakestoreapi.com";
import LoaderState from "./LoaderState";
import { AllProductsProps, registerUserProps, UserProps } from "../interfaces";
import UseLocalStorage from "./UseLocalStorage";

interface LoginProps extends UserProps {
  username?: string;
}
const { setLoaderState } = LoaderState();
const { setLocalStorage } = UseLocalStorage();
const userAuth = async (data: LoginProps, isChecked: boolean) => {
  const bodyData = JSON.stringify(data);

  try {
    setLoaderState(true);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    if (!response.ok) {
      alert(`Error On Login: ${response.statusText}`);
      return;
    }
    const responseData = await response.json();
    //   handleToken(responseData.token);
    //   console.log(userToken);
    if (isChecked) {
      setLocalStorage("rememberMe", "True");
    }
    alert(`Login Success`);
    setLocalStorage("token", responseData.token);
  } catch (error) {
    alert(`Error On Login: ${error}`);
  } finally {
    setLoaderState(true);
  }
};

const getAllProducts = async (): Promise<AllProductsProps[] | undefined> => {
  const trailing: string = "/products?limit=30";

  try {
    setLoaderState(true);
    const response = await fetch(`${API_URL}${trailing}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(`Error fetching Products: ${response.statusText}`);
      return;
    }
    const responseData: AllProductsProps[] = await response.json();
    console.log(responseData);
    return responseData; // Return the data here
  } catch (error) {
    alert(`Error fetching data Products: ${error}`);
  } finally {
    setLoaderState(false);
  }
};

export { getAllProducts, userAuth };
