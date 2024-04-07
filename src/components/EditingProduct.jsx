import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import EditableField from "./EditableField";

const EditingProduct = (props) => {
  const { product, onSave, onCancel } = props;
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { groupName, ...itemToUpdate } = editedProduct;
    onSave(editedProduct.itemId, itemToUpdate);
  };

  return (
    <Modal show centered onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Name</Form.Label>
            <EditableField
              cellData={{
                type: "text",
                placeholder: "Enter Product Name",
                name: "itemName",
                value: editedProduct.itemName,
                id: "itemName",
              }}
              onItemizedItemEdit={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <EditableField
              cellData={{
                type: "text",
                placeholder: "Enter product description",
                name: "itemDescription",
                value: editedProduct.itemDescription,
                id: "itemDescription",
              }}
              onItemizedItemEdit={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Price</Form.Label>
            <EditableField
              cellData={{
                type: "text",
                placeholder: "Enter product price",
                name: "itemPrice",
                value: editedProduct.itemPrice,
                id: "itemPrice",
              }}
              onItemizedItemEdit={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EditingProduct };
