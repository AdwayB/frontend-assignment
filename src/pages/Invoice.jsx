import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductsList from "../components/ProductsList";

const Invoice = () => {
  const [activeTab, setActiveTab] = useState("invoice");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer">
          <Link to="/">
            <h5>Go Back</h5>
          </Link>
        </div>
      </div>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        style={{ marginLeft: "0.2rem" }}
        className="fw-bold"
      >
        <Tab eventKey="invoice" title="Invoice Form" key={0}>
          <InvoiceForm />
        </Tab>
        <Tab eventKey="products-list" title="Products  List" key={1}>
          <ProductsList />
        </Tab>
      </Tabs>
    </>
  );
};

export default Invoice;
