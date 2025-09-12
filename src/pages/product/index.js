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
import { apiEPOS } from "../../constants/global";

// const data = [
//     {
//         productId: 1,
//         categoryId: 1,
//         genderId: 1,
//         productName: "Classic T-Shirt",
//         gender: "Male",
//         category: "Clothes",
//         variations: [
//             { productstockId: 1, colorId: 1, sizeId: 1, color: "Black", size: "S", quantity: 15, price: 100.0 },
//             { productstockId: 1, colorId: 1, sizeId: 1, color: "Black", size: "S", quantity: 15, price: 100.0 },
//         ],
//     },
//     {
//         productId: 2,
//         categoryId: 2,
//         genderId: 2,
//         productName: "Classic T-Shirt",
//         gender: "Male",
//         category: "Clothes",
//         variations: [
//             { productstockId: 2, colorId: 2, sizeId: 2, color: "Black", size: "S", quantity: 15, price: 100.0 },
//             { productstockId: 2, colorId: 2, sizeId: 2, color: "Black", size: "S", quantity: 15, price: 100.0 },
//         ],
//     },
// ];

const ProductMain = () => {
    // Filter Global
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
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
        <>
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
            <Button
                tooltip="Edit Product"
                icon="pi pi-pencil"
                tooltipOptions={{ position: "top" }}
                className="eye-icon-btn"
                onClick={() => {
                    setIsAddDialog(true);
                    setEditData(rowData);
                }}
            />
        </>
    );

    const rowExpansionTemplate = (rowData) => {
        return (
            <DataTable showGridlines={true} value={rowData.productStocks} responsiveLayout="scroll">
                <Column field="color" header="Color" />
                <Column field="size" header="Size" />
                <Column field="quantity" header="Quantity" />
                <Column field="price" header="Price" />
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

    // Fetch Products

    const fetchProducts = async () => {
        //fetch products from api
        setLoading(true);
        try {
            const response = await apiEPOS.get("ProductStock/Retrive");
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

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
                            {/* <Column body={priceTemplate} header="Price" /> */}
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
                    header={editDataCategory == null ? "Add New Category" : "Edit Category"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "40vw" }}
                    component={
                        <AddEditCategory
                            editData={editDataCategory}
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
