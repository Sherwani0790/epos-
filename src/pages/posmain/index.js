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

const POSMain = () => {
    const [data, setData] = useState([]); // must be array, not string
    const [loading, setLoading] = useState(false);
    const [barcode, setBarcode] = useState("");
    const [receiptData, setReceiptData] = useState(null);
    const [processDone, setProcessDone] = useState(false);
    const [receiptNo, setReceiptNo] = useState(() => {
        const saved = localStorage.getItem("receiptNo");
        return saved ? parseInt(saved, 10) : 1;
    });

    const fetchSales = async (barcodeValue) => {
        if (!barcodeValue) return;
        setLoading(true);
        try {
            const response = await apiEPOS.get(`ProductStock/ScanBarcode?barcode=${barcodeValue}`);

            // Ensure always array + add default fields
            const result = Array.isArray(response.data) ? response.data : [response.data];

            const enriched = result.map((item) => ({
                ...item,
                quantity: 1,
                discount: 0,
            }));

            setData((prevData) => {
                const newData = [...prevData];
                enriched.forEach((newItem) => {
                    const index = newData.findIndex((item) => item.productStockId === newItem.productStockId);
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
    // remove row
    const resetRow = (rowData) => {
        const updated = data.filter((item) => item.productStockId !== rowData.productStockId);
        setData(updated);
    };
    // Clear handler
    // const handleClear = () => {
    //     setData([]);
    //     setBarcode("");
    // };
    const handleClear = () => {
        setData([]);
        setBarcode("");
        setProcessDone(false);

        // If you want reset receipt number:
        // setReceiptNo(1);
        // localStorage.setItem("receiptNo", 1);
    };
    // Print receipt
    const handleProcessSale = () => {
        if (data.length === 0) return;

        const now = new Date();
        const receipt = {
            receiptNo: receiptNo,
            date: now.toLocaleString(),
            items: data,
            subtotal: data.reduce((sum, item) => sum + item.price * item.quantity, 0),
            discount: data.reduce((sum, item) => sum + item.discount, 0),
            total: data.reduce((sum, item) => sum + (item.price * item.quantity - item.discount), 0),
        };

        setReceiptData(receipt);
        setProcessDone(true);

        // increment + save to localStorage
        const nextNo = receiptNo + 1;
        setReceiptNo(nextNo);
        localStorage.setItem("receiptNo", nextNo);

        printReceipt(receipt);
    };
    // Print function
    const handleRePrint = () => {
        if (receiptData) {
            printReceipt(receiptData);
        }
    };
    // Print receipt function
    const printReceipt = (receipt) => {
        const printWindow = window.open("", "_blank", "width=800,height=600");
        printWindow.document.write(`
        <html>
            <head>
                <title>Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h2 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
                    .summary { margin-top: 20px; text-align: right; }
                </style>
            </head>
            <body>
                <h2>Receipt</h2>
                <p>Date: ${receipt.date}</p>
                <p>Receipt No: ${receipt.receiptNo}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${receipt.items
                            .map(
                                (item, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${item.productName} ${item.sizeName || ""} ${item.colorName || ""}</td>
                                <td>${item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${item.discount}</td>
                            </tr>
                        `
                            )
                            .join("")}
                    </tbody>
                </table>
                <div class="summary">
                    <p><b>Subtotal:</b> ${receipt.subtotal}</p>
                    <p><b>Discount:</b> ${receipt.discount}</p>
                    <p><b>Grand Total:</b> ${receipt.total}</p>
                </div>
            </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
            <div className="grid">
                <div className="md:col-8"></div>
                <div className="md:col-4 col-12">
                    <div className="equal_space inlineFlex">
                        <GlobalInputField id="searchField" name="searchField" type="text" placeholder="Search by ProductStockId..." className="input_position" value={barcode} onChange={(e) => setBarcode(e.target.value)} onKeyDown={handleKeyDown} />
                        <div>
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
                            <DataTable value={data} responsiveLayout="scroll" key="productStockId" rows={14} emptyMessage="No record available.">
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
                                <Button label="Process Sale" icon="pi pi-check" className="p-button-sm p-button-success" onClick={handleProcessSale} disabled={processDone} />
                                <Button label="Clear" icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={handleClear} />
                                <Button label="Re-Print" icon="pi pi-history" className="p-button-sm p-button-primary" onClick={handleRePrint} disabled={!processDone} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default POSMain;
