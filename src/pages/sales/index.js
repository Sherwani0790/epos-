import React, { useState } from "react";
//css
import "./sales.scss";
//Prime Component
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import SecondaryButton from "../../ui-components/secondarybutton";
import GlobalInputField from "../../ui-components/globalinputfield";
import { apiEPOS } from "../../constants/global";

const SalesMain = () => {
    const [data, setData] = useState([]); // must be array, not string
    const [loading, setLoading] = useState(false);
    const [barcode, setBarcode] = useState("");

const fetchSales = async (barcodeValue) => {
    if (!barcodeValue) return;
    setLoading(true);
    try {
        const response = await apiEPOS.get(
            `ProductStock/ScanBarcode?barcode=${barcodeValue}`
        );

        // Ensure always array + add default fields
        const result = Array.isArray(response.data)
            ? response.data
            : [response.data];

        const enriched = result.map((item) => ({
            ...item,
            quantity: 1,
            discount: 0,
        }));

        setData((prevData) => {
            const newData = [...prevData];
            enriched.forEach((newItem) => {
                const index = newData.findIndex(
                    (item) => item.productStockId === newItem.productStockId
                );
                if (index !== -1) {
                    // Already exists → increase quantity
                    newData[index] = {
                        ...newData[index],
                        quantity: newData[index].quantity + 1,
                    };
                } else {
                    // Not in table → add as new row
                    newData.push(newItem);
                }
            });
            return newData;
        });
    } catch (error) {
        console.error("Error fetching Products:", error);
    } finally {
        setLoading(false);
    }
};

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchSales(barcode);
        }
    };

    const handleSearchClick = () => {
        fetchSales(barcode);
    };

    // Update quantity
    const updateQuantity = (rowData, newQuantity) => {
        const updated = data.map((item) => (item.productStockId === rowData.productStockId ? { ...item, quantity: newQuantity } : item));
        setData(updated);
    };

    // Update discount
    const updateDiscount = (rowData, newDiscount) => {
        const updated = data.map((item) => (item.productStockId === rowData.productStockId ? { ...item, discount: newDiscount } : item));
        setData(updated);
    };

    // Calculate price dynamically
    const calculatePrice = (rowData) => {
        const gross = rowData.price * rowData.quantity;
        const net = gross - rowData.discount;
        return net >= 0 ? net : 0;
    };

    // Templates
    const productTemplate = (rowData) => (
        <span>
            {rowData.productName} {rowData.sizeName} {rowData.colorName}
        </span>
    );

    const quantityTemplate = (rowData) => <GlobalInputField type="number" value={rowData.quantity} style={{ width: "80px" }} onChange={(e) => updateQuantity(rowData, Number(e.target.value))} />;

    const discountTemplate = (rowData) => <GlobalInputField type="number" value={rowData.discount} style={{ width: "80px" }} onChange={(e) => updateDiscount(rowData, Number(e.target.value))} />;

    const priceTemplate = (rowData) => <span>{calculatePrice(rowData)}</span>;

    const actionTemplate = (rowData) => <Button tooltip="Delete" icon="pi pi-trash" tooltipOptions={{ position: "top" }} className="eye-icon-btn" onClick={() => resetRow(rowData)} />;
    //reset row
    const resetRow = (rowData) => {
        const updated = data.map((item) => (item.productStockId === rowData.productStockId ? { ...item, quantity: 1, discount: 0 } : item));
        setData(updated);
    };

    // Clear handler
    const handleClear = () => {
        setData([]);
        setBarcode("");
    };
    return (
        <>
            <div className="grid">
                <div className="md:col-8"></div>
                <div className="md:col-4 col-12">
                    <div className="equal_space inlineFlex">
                        <GlobalInputField id="searchField" name="searchField" type="text" placeholder="Search by ProductStockId..." className="input_position" value={barcode} onChange={(e) => setBarcode(e.target.value)} onKeyDown={handleKeyDown} />
                        <div>
                            {/* <Button icon="pi pi-search" className="p-button-sm p-button-primary"/> */}
                            <SecondaryButton icon="pi pi-search" type="button" onClick={handleSearchClick} style={{ height: "36px", marginTop: "0px" }} />
                        </div>
                        <div>
                            <SecondaryButton label="Return Sale" type="button" style={{ width: "120px", height: "36px", marginTop: "0px" }} />
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <>Loading....</>
            ) : (
                <div className="grid">
                    <div className="md:col-8 col-12">
                        <div className="card">
                            <DataTable value={data} responsiveLayout="scroll" key="productStockId" rows={14} emptyMessage="No record available." paginator>
                                <Column body={productTemplate} header="Product Name" />
                                <Column body={quantityTemplate} header="Quantity" />
                                <Column body={priceTemplate} header="Price" />
                                <Column body={discountTemplate} header="Discount" />
                                <Column body={actionTemplate} header="Action" />
                            </DataTable>
                        </div>
                    </div>
                    <div className="md:col-4 col-12">
                        <div className="card">
                            <h3>Summary</h3>
                            <div className="grid">
                                <div className="md:col-6 col-6">Subtotal:</div>
                                <div className="md:col-6 col-6 text_align_right">{data.reduce((sum, item) => sum + item.price * item.quantity, 0)}</div>
                                <div className="md:col-6 col-6">Total Discount:</div>
                                <div className="md:col-6 col-6 text_align_right">{data.reduce((sum, item) => sum + item.discount, 0)}</div>
                                <div className="md:col-6 col-6">Total:</div>
                                <div className="md:col-6 col-6 text_align_right">{data.reduce((sum, item) => sum + calculatePrice(item), 0)}</div>
                            </div>
                            <div className="mt-3 flex flex-row gap-5 justify-content-between">
                                <Button label="Process Sale" icon="pi pi-check" className="p-button-sm p-button-success" />
                                <Button label="Clear" icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={handleClear} />
                                <Button label="Re-Print" icon="pi pi-history" className="p-button-sm p-button-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SalesMain;
