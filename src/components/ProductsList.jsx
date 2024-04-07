import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useInvoiceListData } from "../redux/hooks";
import { Card, Table, Form } from "react-bootstrap";
import EditableField from "./EditableField";
import { BiArrowToBottom, BiArrowToTop, BiSolidPencil } from "react-icons/bi";
import { updateItem } from "../redux/invoicesSlice";
import { EditingProduct } from "./EditingProduct";

const ProductsList = () => {
  const { invoiceList } = useInvoiceListData();
  const dispatch = useDispatch();
  const [sortAscending, setSortAscending] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const itemsList = useMemo(() => {
    let items = [];
    invoiceList.forEach((invoice) => {
      invoice.groups.forEach((group) => {
        group.items.forEach((item) => {
          items.push({
            ...item,
            groupName: group.groupName,
          });
        });
      });
    });
    return items;
  }, [invoiceList]);

  const sortedItems = useMemo(() => {
    const filteredList = itemsList.filter((item) =>
      item.groupName.includes(groupName)
    );
    return filteredList.sort((a, b) => {
      const groupA = a.groupName.toLowerCase();
      const groupB = b.groupName.toLowerCase();
      return sortAscending
        ? groupA.localeCompare(groupB)
        : groupB.localeCompare(groupA);
    });
  }, [itemsList, groupName, sortAscending]);

  const toggleSortDirection = () => {
    setSortAscending(!sortAscending);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = (id, updatedItem) => {
    dispatch(updateItem({ itemId: id, updatedItem: updatedItem }));
    setEditingItem(null);
  };

  return (
    <div className="h-100">
      <Card className="d-flex flex-column align-items-center justify-content-center ">
        <Table striped bordered style={{ height: "70vh", fontSize: "1rem" }}>
          <thead>
            <tr>
              <th className="align-middle">
                <span className="ms-2">Name</span>
              </th>
              <th className="align-middle">Description</th>
              <th className="align-middle">Price</th>
              <th style={{ width: "20vw" }}>
                <div className="d-flex flex-row align-items-center justify-content-evenly">
                  <Form.Label className="fw-bold w-25 mb-1 me-2">
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
            {sortedItems.map((item) => (
              <tr key={`${item.itemId}-${item.groupName}`}>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
                <td>{item.itemPrice}</td>
                <td>{item.groupName}</td>
                <td>
                  <div
                    className="p-1 btn btn-primary btn-sm"
                    style={{ cursor: "pointer", width: "2rem" }}
                    onClick={() => handleEditItem(item)}
                  >
                    <BiSolidPencil style={{ fontSize: "1rem" }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {sortedItems.length === 0 && <FriendlyText />}
        {editingItem && (
          <EditingProduct
            product={editingItem}
            onSave={handleUpdateItem}
            onCancel={() => setEditingItem(null)}
          />
        )}
      </Card>
    </div>
  );
};

const FriendlyText = () => {
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
