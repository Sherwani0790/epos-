import React, { useState } from "react";
//css
import "./config.scss";
//Prime Component
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import SecondaryButton from "../../ui-components/secondarybutton";
import GlobalInputField from "../../ui-components/globalinputfield";
import { FilterMatchMode } from "primereact/api";

const data = [
    {
        productId: 1,
        productName: "Classic T-Shirt",
        gender: "Male",
        category: "Clothes",
        variations: [
            {
                price: 1200,
                color: "Black",
                sizes: [
                    { size: "S", quantity: 15 },
                    { size: "M", quantity: 10 },
                    { size: "L", quantity: 8 },
                ],
            },
            {
                price: 1200,
                color: "White",
                sizes: [
                    { size: "M", quantity: 12 },
                    { size: "L", quantity: 9 },
                ],
            },
        ],
    },
    {
        productId: 2,
        productName: "Summer Dress",
        price: 2500,
        gender: "Female",
        category: "Clothes",
        variations: [
            {
                color: "Red",
                sizes: [
                    { size: "S", quantity: 20 },
                    { size: "M", quantity: 15 },
                ],
            },
            {
                color: "Blue",
                sizes: [
                    { size: "M", quantity: 14 },
                    { size: "L", quantity: 11 },
                ],
            },
        ],
    },
    {
        productId: 3,
        productName: "Kids Hoodie",
        price: 1800,
        gender: "Kid",
        category: "Clothes",
        variations: [
            {
                color: "Yellow",
                sizes: [
                    { size: "XS", quantity: 25 },
                    { size: "S", quantity: 18 },
                ],
            },
        ],
    },
    {
        productId: 4,
        productName: "Luxury Perfume",
        price: 5500,
        gender: "Female",
        category: "Perfume",
        variations: [
            {
                color: "N/A",
                sizes: [
                    { size: "100ml", quantity: 30 },
                    { size: "50ml", quantity: 20 },
                ],
            },
        ],
    },
    {
        productId: 5,
        productName: "Denim Pants",
        price: 3000,
        gender: "Male",
        category: "Pant-Shirt",
        variations: [
            {
                color: "Blue",
                sizes: [
                    { size: "30", quantity: 10 },
                    { size: "32", quantity: 8 },
                    { size: "34", quantity: 6 },
                ],
            },
        ],
    },
];

const ConfigurationMain = () => {
    // Filter Global
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [isAddEditCategoryDialog, setIsAddEditCategoryDialog] = useState(false);

    const [editDataCategory, setEditDataCategory] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    // Templates
    const actionTemplate = (rowData) => (
        <Button
            tooltip="Add New Category"
            icon="pi pi-plus"
            tooltipOptions={{ position: "top" }}
            className="eye-icon-btn"
            onClick={() => {
                setIsAddEditCategoryDialog(true);
                setEditDataCategory(rowData);
            }}
        />
    );

    return (
        <>
            <div className="grid">
                <div className="md:col-8"></div>
                <div className="md:col-4 col-12">
                    <div className="equal_space inlineFlex">
                        <GlobalInputField id="searchField" name="searchField" type="text" placeholder="Search..." className="input_position" value={globalFilterValue} onChange={onGlobalFilterChange} />

                        <div>
                            <SecondaryButton
                                label="Add New Product"
                                type="button"
                                style={{
                                    width: "120px",
                                    height: "36px",
                                    marginTop: "0px",
                                }}
                                onClick={() => setIsAddDialog(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <DataTable filter value={data} responsiveLayout="scroll" key="productId" rows={14} emptyMessage="No record available." paginator filters={filters} globalFilterFields={["productName", "gender", "price", "category"]}>
                            <Column field="productName" header="Product Name" />
                            <Column field="gender" header="Gender" />
                            <Column field="category" header="Category" />
                            <Column body={actionTemplate} header="Action" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfigurationMain;
