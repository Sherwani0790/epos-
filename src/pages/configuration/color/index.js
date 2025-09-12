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
import AddEditColor from "./component";
import GlobalDialogIndex from "../../../ui-components/globaldialoge";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteDialog from "./component/deleteDialog";

const ColorMain = () => {
    // Filter Global
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [deleteColorId, setDeleteColorId] = useState(null);
    // const [delDialog, setIsDelDialog] = useState(false);
    // const [isAddDialog, setIsAddDialog] = useState(false);
    // const [editData, setEditData] = useState(null);
    // const [globalFilterValue, setGlobalFilterValue] = useState();
    // const [filters, setFilters] = useState({
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // });

    const [data, setData] = useState([]);
    const [delDialog, setIsDelDialog] = useState(false);
    const [deleteColorId, setDeleteColorId] = useState(null);
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
        <>
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
            <Button
                tooltip="Delete"
                icon="pi pi-trash"
                tooltipOptions={{ position: "top" }}
                className="eye-icon-btn"
                onClick={() => {
                    setDeleteColorId(rowData.colorId); // ✅ store selected colorId
                    setIsDelDialog(true); // ✅ open dialog
                }}
            />
        </>
    );
    const createdDateTemplate = (rowData) => {
        return <>{moment(rowData?.createdDate).format("YYYY-MM-DD")}</>;
    };
    const updatedDateTemplate = (rowData) => {
        return <>{moment(rowData?.lastModifiedDate).format("YYYY-MM-DD")}</>;
    };

    // Fetch Color Data
    const fetchColorData = async () => {
        try {
            const response = await apiEPOS.get("ProductColor/Retrive");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };
    const deleteColor = async (colorId) => {
        try {
            const response = await apiEPOS.delete(`ProductColor/Delete?colorId=${colorId}`);
            if (response.status === 200) {
                toast.success("Color deleted successfully!");
                setIsDelDialog(false);
                fetchColorData(); // Refresh the list after deletion
            } else {
                toast.error("Failed to delete color.");
            }
        } catch (error) {
            console.error("Error deleting color:", error);
            toast.error("An error occurred while deleting the color.");
        }
    };
    React.useEffect(() => {
        fetchColorData();
        // deleteColor();
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
                            <Column body={createdDateTemplate} header="Created At" />
                            <Column body={updatedDateTemplate} header="Updated At" />
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
                    header={editData == null ? "Add New Color" : "Edit color"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "30vw" }}
                    component={
                        <AddEditColor
                            onSuccess={fetchColorData}
                            editData={editData}
                            onHide={() => {
                                setIsAddDialog(false);
                                setEditData(null);
                            }}
                        />
                    }
                />
            )}
            {/* //Del Dialog */}
            {delDialog && (
                <GlobalDialogIndex
                    showHeader={true}
                    visible={delDialog}
                    onHide={() => setIsDelDialog(false)}
                    header={false}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "20vw" }}
                    component={
                        <DeleteDialog
                            onHide={() => setIsDelDialog(false)}
                            onConfirm={() => {
                                deleteColor(deleteColorId); // ✅ call delete on confirm
                                setIsDelDialog(false);
                            }}
                        />
                    }
                />
            )}
        </>
    );
};

export default ColorMain;
