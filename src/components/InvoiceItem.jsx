import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = (props) => {
  const {
    selectedGroup,
    onItemizedItemEdit,
    currency,
    onRowDel,
    items,
    onRowAdd,
    listKey,
  } = props;

  const itemTable = items.map((item, index) => (
    <ItemRow
      key={`${item.id}-${index}`}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
      selectedGroup={selectedGroup}
    />
  ));

  return (
    <div key={listKey}>
      <Table>
        <thead>
          <tr>
            <th>{`${selectedGroup} Items`}</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item, props.selectedGroup);
  };
  return (
    <tr key={props.key}>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(
              evt,
              props.item.itemId,
              props.selectedGroup
            )
          }
          cellData={{
            type: "text",
            name: "itemName",
            placeholder: "Item name",
            value: props.item.itemName,
            id: props.item.itemId,
          }}
        />
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(
              evt,
              props.item.itemId,
              props.selectedGroup
            )
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: props.item.itemDescription,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(
              evt,
              props.item.itemId,
              props.selectedGroup
            )
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(
              evt,
              props.item.itemId,
              props.selectedGroup
            )
          }
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: props.item.itemPrice,
            id: props.item.itemId,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
