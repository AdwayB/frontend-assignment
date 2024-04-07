import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useGroupsListData, useInvoiceListData } from "../redux/hooks"; // Adjust the import path as necessary
// import { updateProduct } from "../redux/productsSlice";
import { Card, Table, Form } from "react-bootstrap";
import EditableField from "./EditableField";
import { BiArrowToBottom, BiArrowToTop, BiSolidPencil } from "react-icons/bi";

const ProductsList = () => {
  const { invoiceList } = useInvoiceListData();
  const itemsList = invoiceList;
  const { groupsList } = useGroupsListData();
  const dispatch = useDispatch();
  const [sortAscending, setSortAscending] = useState(true);
  const [groupName, setGroupName] = useState("");

  const sortedProducts = useMemo(() => {
    const sorted = [...itemsList];
    sorted.sort((a, b) => {
      const groupA =
        groupsList.find((group) => group.groupName === a.groupName)?.name || "";
      const groupB =
        groupsList.find((group) => group.name === b.groupName)?.name || "";
      return sortAscending
        ? groupA.localeCompare(groupB)
        : groupB.localeCompare(groupA);
    });
    return sorted;
  }, [itemsList, groupsList, sortAscending]);

  const handleUpdateProduct = (id) => {
    // Placeholder for product edit functionality
    // Potentially opens a modal with product form, then dispatch updateProduct
  };

  const toggleSortDirection = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <div className="h-100">
      <Card>
        <Table striped bordered responsive="sm" style={{ height: "70vh" }}>
          <thead>
            <tr>
              <th className="align-middle">
                <span className="ms-2">Product Name</span>
              </th>
              <th className="align-middle">Description</th>
              <th className="align-middle">Price</th>
              <th style={{ width: "20vw" }}>
                <div className="d-flex flex-row align-items-center justify-content-evenly">
                  <Form.Label className="fw-bold w-25 mb-1 ms-4 me-2">
                    Group Name:
                  </Form.Label>
                  <EditableField
                    className="w-50 me-4"
                    cellData={{
                      type: "text",
                      placeholder: "Ex: Labour",
                      name: "groupName",
                      value: groupName,
                      id: "groupName",
                      textAlign: "mb-1",
                    }}
                    onItemizedItemEdit={(e) => setGroupName(e.target.value)}
                  />
                  {sortAscending ? (
                    <BiArrowToBottom
                      className="mb-1"
                      size={"1.4rem"}
                      onClick={toggleSortDirection}
                    />
                  ) : (
                    <BiArrowToTop
                      className="mb-1"
                      size={"1.4rem"}
                      onClick={toggleSortDirection}
                    />
                  )}
                </div>
              </th>
              <th className="align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => {
              const groupName = groupsList.find(
                (group) => group.id === product.items
              )?.name;
              return (
                <tr key={product.id}>
                  <td>{product.itemName}</td>
                  <td>{product.itemDescription}</td>
                  <td>{product.itemPrice}</td>
                  <td>{groupName}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <BiSolidPencil />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {sortedProducts.length === 0 && (
          <FriendlyText productsList={itemsList} groupsList={groupsList} />
        )}
      </Card>
    </div>
  );
};

const FriendlyText = ({ productsList, groupsList }) => {
  return (
    <div
      className="text-black fw-bold d-flex align-items-center justify-content-center"
      style={{
        height: "40vh",
        marginTop: "6rem",
        position: "absolute",
        inset: 0,
      }}
    >
      <h1>No Data!</h1>
    </div>
  );
};

export default ProductsList;
