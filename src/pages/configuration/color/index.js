import React, { useState } from "react";
//css
import "../config.scss";
//Prime Component
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import GlobalInputField from "../../../ui-components/globalinputfield";
import SecondaryButton from "../../../ui-components/secondarybutton";
import { apiEPOS } from "../../../constants/global";

const ColorMain = () => {
    // Filter Global
    const [data, setData] = useState([]);
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [editData, setEditData] = useState(null);
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
            tooltip="Edit Color"
            icon="pi pi-pencil"
            tooltipOptions={{ position: "top" }}
            className="eye-icon-btn"
            onClick={() => {
                setIsAddDialog(true);
                setEditData(rowData);
            }}
        />
    );
    const fetchColorData = async () => {
        try {
            const response = await apiEPOS.get("ProductColor/Retrive");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };
    React.useEffect(() => {
        fetchColorData();
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
                                label="Add New Color"
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
                        <DataTable filter value={data} responsiveLayout="scroll" key="colorId" rows={14} emptyMessage="No record available." paginator filters={filters} globalFilterFields={["colorName", "createdDate", "lastModifiedDate"]}>
                            <Column field="colorName" header="Color Name" />
                            <Column field="createdDate" header="Created At" />
                            <Column field="lastModifiedDate" header="Updated At" />
                            <Column body={actionTemplate} header="Action" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ColorMain;
