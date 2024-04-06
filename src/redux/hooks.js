import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductsList } from "./productsSlice";

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

  const getOneInvoice = (receivedId) => {
    return (
      productsList.find(
        (product) => product.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = productsList.length;

  return {
    productsList,
    getOneInvoice,
    listSize,
  };
};
