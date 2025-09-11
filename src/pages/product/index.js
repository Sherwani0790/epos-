import React, { useState } from "react";
//css
import "./product.scss";
//Prime Component
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import SecondaryButton from "../../ui-components/secondarybutton";
import GlobalInputField from "../../ui-components/globalinputfield";
import { FilterMatchMode } from "primereact/api";
import GlobalDialogIndex from "../../ui-components/globaldialoge";
import AddEditProduct from "./component";
import AddEditCategory from "./component/addCategory";

const data = [
    {
        productId: 1,
        productName: "Classic T-Shirt",
        price: 1200,
        gender: "Male",
        category: "Clothes",
        variations: [
            {
                color: "Black",
                sizes: [
                    { size: "S", quantity: 15 },
                    { size: "M", quantity: 10 },
                    { size: "L", quantity: 8 },
                ],
            },
            {
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

const ProductMain = () => {
    // Filter Global
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [isAddEditCategoryDialog, setIsAddEditCategoryDialog] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editDataCategory, setEditDataCategory] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState();
    const [expandedRows, setExpandedRows] = useState(null);
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

    const rowExpansionTemplate = (rowData) => {
        // Flatten sizes for each color so we can show size + quantity properly
        const flattenedData = rowData.variations.flatMap((variation) =>
            variation.sizes.map((s) => ({
                color: variation.color,
                size: s.size,
                quantity: s.quantity,
            }))
        );

        return (
            <DataTable showGridlines={true} value={flattenedData}>
                <Column field="color" header="Color" />
                <Column field="size" header="Size" />
                <Column field="quantity" header="Quantity" />
                <Column
                    body={(rowData) => (
                        <Button
                            tooltip="Edit Category"
                            icon="pi pi-pencil"
                            tooltipOptions={{ position: "top" }}
                            className="eye-icon-btn"
                            onClick={() => {
                                setIsAddEditCategoryDialog(true);
                                setEditDataCategory(rowData);
                            }}
                        />
                    )}
                    header="Action"
                />
            </DataTable>
        );
    };

    const allowExpansion = (rowData) => {
        return rowData.variations && rowData.variations.length > 0;
    };
    const priceTemplate = (rowData) => {
        return (
            <>
                <span className="text-green-500">{` ${rowData.price.toFixed(2)} PKR`}</span>
            </>
        );
    };
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
                        <DataTable
                            expandedRows={expandedRows}
                            rowExpansionTemplate={rowExpansionTemplate}
                            onRowToggle={(e) => {
                                setExpandedRows(e.data);
                            }}
                            filter
                            value={data}
                            responsiveLayout="scroll"
                            key="productId"
                            rows={14}
                            emptyMessage="No record available."
                            paginator
                            filters={filters}
                            globalFilterFields={["productName", "gender", "price", "category"]}
                        >
                            <Column expander={allowExpansion} style={{ width: "3em" }} />
                            <Column field="productName" header="Product Name" />
                            <Column body={priceTemplate} header="Price" />
                            <Column field="gender" header="Gender" />
                            <Column field="category" header="Category" />
                            <Column body={actionTemplate} header="Action" />
                        </DataTable>
                    </div>
                </div>
            </div>
            {/*Add Edit Dialogs */}
            {isAddDialog && (
                <GlobalDialogIndex
                    showHeader={true}
                    visible={isAddDialog}
                    onHide={() => {
                        setIsAddDialog(false);
                        setEditData(null);
                    }}
                    header={editData == null ? "Add New Product" : "Edit Product"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "40vw" }}
                    component={
                        <AddEditProduct
                            editData={editData}
                            onHide={() => {
                                setIsAddDialog(false);
                                setEditData(null);
                            }}
                        />
                    }
                />
            )}
            {/*Add Edit Category Dialogs */}
            {isAddEditCategoryDialog && (
                <GlobalDialogIndex
                    showHeader={true}
                    visible={isAddEditCategoryDialog}
                    onHide={() => {
                        setIsAddEditCategoryDialog(false);
                        setEditDataCategory(null);
                    }}
                    header={editData == null ? "Add New Category" : "Edit Category"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "40vw" }}
                    component={
                        <AddEditCategory
                            editData={editData}
                            onHide={() => {
                                setIsAddEditCategoryDialog(false);
                                setEditDataCategory(null);
                            }}
                        />
                    }
                />
            )}
        </>
    );
};

export default ProductMain;
