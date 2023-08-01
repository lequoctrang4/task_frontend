import axios from "axios";
import { ProductType } from "../types/product";

let URL = process.env.PORT_BACKEND || "http://127.0.0.1:8000";

export const getCategories = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${URL}/category/list`,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;

  } catch (error: any) {
    return { error: 1, ...error.response.data };
  }
};

export const addProduct = async (formValue: ProductType) => {
  try {
    console.log(`${URL}/product`);
    const res = await axios({
      method: "post",
      url: `${URL}/product/`,
      data: formValue,
      headers: { "Content-Type": "application/json" },
    });
    return res.data
  } catch (error: any) {
    return { error: 1, ...error.response.data };
  }
};
