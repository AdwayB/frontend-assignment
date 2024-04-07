export const calculateInvoiceTotal = (groups, taxRate, discountRate) => {
  let subTotal = 0;

  groups.forEach((group) => {
    group.items.forEach((item) => {
      subTotal +=
        parseFloat(item.itemPrice).toFixed(2) * parseInt(item.itemQuantity);
    });
  });

  const taxAmount = parseFloat(subTotal * (taxRate / 100)).toFixed(2);
  const discountAmount = parseFloat(subTotal * (discountRate / 100)).toFixed(2);
  const total = (
    subTotal -
    parseFloat(discountAmount) +
    parseFloat(taxAmount)
  ).toFixed(2);

  return {
    subTotal: subTotal.toFixed(2),
    taxAmount,
    discountAmount,
    total,
  };
};
