import React, { useState } from "react";
//css
import "./document.scss";
//Prime Component
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
// import GlobalCheckbox from '../../ui-components/globalcheckbox';
import GlobalInputField from "../../ui-components/globalinputfield";
// import SecondaryButton from '../../ui-components/secondarybutton';
import GlobalDialogIndex from "../../ui-components/globaldialoge";
import ViewDocument from "./component";
import SecondaryButton from "../../ui-components/secondarybutton";

const Document = () => {
    const data = [
        {
            id: 1,
            clientname: "Josep",
            filecount: "10",
        },
        {
            id: 2,
            clientname: "Josep",
            filecount: "20",
        },
        {
            id: 2,
            clientname: "Josep Aloy",
            filecount: "25",
        },
    ];

    //States
    const [isViewDialog, setIsViewDialog] = useState(false);
    const [editData, setEditData] = useState(null);
    // const [delDialog, setDelDialog] = useState(false);
    // const [showAll, setShowAll] = useState(false);

    // Filter Global
    const [globalFilterValue, setGlobalFilterValue] = useState("");
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

    const actionTemplate = (rowData) => {
        return (
            <>
                <Button
                    tooltip="View Details"
                    icon="pi pi-eye"
                    tooltipOptions={{ position: "top" }}
                    className="eye-icon-btn"
                    onClick={(e) => {
                        setIsViewDialog(true);
                        e.preventDefault();
                        setEditData(rowData);

                        // history.push("/api/clientdetails" + rowData.id)
                    }}
                />
            </>
        );
    };
    // Bredcrumb
    const items = [{ label: `Document` }];
    const home = { icon: "pi pi-home", to: "/api/document" };
    return (
        <>
            <div className="">
                <BreadCrumb model={items} home={home} />
            </div>
            <div className="grid">
                <div className="md:col-8"></div>
                <div className="md:col-4 col-12">
                    <div className="equal_space inlineFlex">
                        <GlobalInputField id="searchField" name="searchField" type="text" placeholder="Search..." className="input_position" value={globalFilterValue} onChange={onGlobalFilterChange} />

                        <div>
                            <SecondaryButton
                                label="Upload Document"
                                type="button"
                                // onClick={() => setIsViewDialog(true)}
                                style={{ width: "120px", height: "36px", marginTop: "0px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="md:col-12">
                    <div className="card">
                        <DataTable filter value={data} responsiveLayout="scroll" key="id" rows={16} emptyMessage="No record available." paginator filters={filters} globalFilterFields={["clientname"]}>
                            <Column field="clientname" header="Client Name"></Column>
                            <Column field="filecount" header="File Count"></Column>
                            <Column body={actionTemplate} header="Action"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            {/*Add Edit Dialogs */}
            {isViewDialog && (
                <GlobalDialogIndex
                    showHeader={true}
                    visible={isViewDialog}
                    onHide={() => {
                        setIsViewDialog(false);
                    }}
                    header={"View Document"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "40vw" }}
                    component={
                        <ViewDocument
                            editData={editData}
                            onHide={() => {
                                setIsViewDialog(false);
                                setEditData(null);
                            }}
                        />
                    }
                />
            )}
        </>
    );
};

export default Document;
