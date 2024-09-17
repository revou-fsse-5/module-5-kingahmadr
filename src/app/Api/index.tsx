// import LoaderState from "./LoaderState";
import { AllProductsProps, registerUserProps, UserProps } from "../interfaces";
import UseLocalStorage from "../lib/UseLocalStorage";
import { setCookie } from "cookies-next";
interface LoginProps extends UserProps {
  username?: string;
}

// const { setLoaderState } = LoaderState();
const { setLocalStorage, removeLocalStorage } = UseLocalStorage();
const API_URL: string = "https://fakestoreapi.com";

const userAuth = async (data: LoginProps, isChecked: boolean) => {
  const bodyData = JSON.stringify(data);

  try {
    // setLoaderState(true);
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
    console.log(responseData);
    if (isChecked) {
      setLocalStorage("rememberMe", "true");
    } else {
      removeLocalStorage("rememberMe");
    }

    alert(`Login Success`);

    setCookie("token", responseData.token, {
      maxAge: 60 * 5, // 1 day
      path: "/", // Set the cookie for the entire site
      httpOnly: false,
      sameSite: "strict", // Prevent CSRF attacks
    });
    return responseData;
  } catch (error) {
    alert(`Error On Login: ${error}`);
  } finally {
    // setLoaderState(true);
  }
};
const addUsersMultiStep = async (data: registerUserProps) => {
  const bodyData = JSON.stringify(data);
  try {
    // setIsLoading(true);
    // await delay(5000);
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    });
    if (!response.ok) {
      alert(`Error Adding new user: ${response.statusText}`);
      return;
    }
    const responseData = await response.json();
    alert(`Success adding new user`);
    console.log(responseData);
    return responseData;
  } catch (error) {
    alert(`Error Adding new user: ${error}`);
  } finally {
    // setIsLoading(false);
  }
};

const getAllProducts = async (): Promise<AllProductsProps[] | undefined> => {
  const trailing: string = "/products?limit=30";

  try {
    // setLoaderState(true);
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
    // setLoaderState(false);
  }
};

const getSingleProducts = async (
  id: string | undefined
): Promise<AllProductsProps[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      alert(`Error fetching Products: ${response.statusText}`);
      return;
    }
    const responseData: AllProductsProps[] = await response.json();
    // console.log(responseData);
    // setSingleDataProduct([responseData]);
    console.log("single products ", responseData);
    return responseData;
  } catch (error) {
    alert(`Error fetching data Single Products: ${error}`);
    // navigate("/products");
  }
};

export { getSingleProducts, getAllProducts, userAuth, addUsersMultiStep };
