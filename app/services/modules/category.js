import { useBaseApi } from "../baseApi";

export const categoryController = () => {
  const { get, post } = useBaseApi();

  const getCategory_Services = () => get("categories");

  // Public services view
  const getPublicCategory_Services = () => get("get/categories");

  return {
    getCategory_Services,
    getPublicCategory_Services,
  };
};
