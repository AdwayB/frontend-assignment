import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectGroupsList, selectProductsList } from "./productsSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useProductsListData = () => {
  const productsList = useSelector(selectProductsList);

  const getOneProduct = (receivedId) => {
    return (
      productsList.find(
        (product) => product.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = productsList.length;

  return {
    productsList,
    getOneProduct,
    listSize,
  };
};

export const useGroupsListData = () => {
  const groupsList = useSelector(selectGroupsList);

  const getOneGroupById = (receivedId) => {
    return (
      groupsList.find(
        (group) => group.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const getOneGroupByName = (receivedName) => {
    return (
      groupsList.find(
        (group) => group.name.toString() === receivedName.toString()
      ) || null
    );
  };

  const listSize = groupsList.length;

  return {
    groupsList,
    getOneGroupById,
    getOneGroupByName,
    listSize,
  };
};
