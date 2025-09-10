import React, { useEffect, useState } from "react";
//css
import "./clientrequest.scss";
//Prime Component
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BsCheck2Circle, BsXCircle } from "react-icons/bs";
import { BreadCrumb } from "primereact/breadcrumb";
import { FilterMatchMode } from "primereact/api";
// import GlobalCheckbox from '../../../ui-components/globalcheckbox';
import GlobalInputField from "../../../ui-components/globalinputfield";
import SecondaryButton from "../../../ui-components/secondarybutton";
import GlobalDialogIndex from "../../../ui-components/globaldialoge";
// import DeleteDialog from './component/deletedialog';
import GlobalVerticalDots from "../../../ui-components/globalverticaldots";
import AddeditRequest from "./component";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { confirmPopup } from "primereact/confirmpopup";
// import { toast } from "react-toastify";
import { getClientCreditRequestMainList } from "../../../redux/auth_slice/clientcreditreq_slice";
import CustomLoader from "../../../ui-components/globalloading";

const ClientRequest = () => {
    const dispatch = useDispatch();
    //Redux Selector
    const clientRequestReducer = useSelector((state) => state.clientCreditRequestMainList);
    const { data, loading } = clientRequestReducer;

    useEffect(() => {
        dispatch(getClientCreditRequestMainList());
    }, [dispatch]);

    // useEffect(() => {

    //   if (deleteSuccess !== undefined) {
    //     if (deleteSuccess === true) {
    //       dispatch(getClientCreditRequestMainList());
    //       toast.warn("Deleted Successfully")

    //     } else {
    //       toast.error(deleteError);
    //     }
    //   }
    //   return () => {
    //     dispatch(resetClientCreditRequestMainListSlice());
    //   }
    // }, [deleteSuccess, deleteError, dispatch]);

    // const confirmDeleteAd = () => {
    //   confirmPopup({
    //     message: 'Do you want to delete this request?',
    //     header: 'Delete Confirmation',
    //     icon: 'pi pi-info-circle',
    //     acceptClassName: 'p-button-danger',
    //     accept,

    //   });
    // };
    // const accept = () => {
    //   dispatch(deleteCreditRequest(deleteId));
    // }

    // useEffect(() => {
    //   dispatch(getClientCreditRequestMainList());
    // }, [dispatch]);

    //States
    const [isAddDialog, setIsAddDialog] = useState(false);
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

    // Kbaba Menu Grid
    const kebabMenuItems = [
        { id: 1, title: "Approve", icon: <BsCheck2Circle style={{ color: "#12ba15", fontSize: "18px" }} /> },
        { id: 2, title: "Deny", icon: <BsXCircle style={{ color: "#ba2b12", fontSize: "16px" }} /> },
    ];
    const handleOpenMenuItems = (status, rowData) => {
        if (status === 1) {
            // setIsAddDialog(true);
            // setEditData("Edit");
            // setEditData(rowData);
        } else if (status === 2) {
            // setDelDialog(true);
            // deleteId = rowData.id;
            // confirmDeleteAd(rowData.id);
        }
    };
    const actionTemplate = (rowData) => {
        return (
            <>
                <GlobalVerticalDots items={kebabMenuItems} handleMenuOpen={(status) => handleOpenMenuItems(status, rowData)} btnclr={false} />
            </>
        );
    };
    const createdDateTemplate = (rowData) => {
        return <>{moment(rowData?.createdDate).format("YYYY-MM-DD")}</>;
    };
    // Bredcrumb
    const items = [{ label: `Clients Request` }];
    const home = { icon: "pi pi-home", to: "/InvoicesView" };
    return (
        <>
            <div className="">
                <BreadCrumb model={items} home={home} />
            </div>
            <div className="grid">
                <div className="md:col-8">
                    <div className="terminated_check_styles">
                        {/* <GlobalCheckbox name="include_terminated" id="include_terminated" checked={showAll} onChange={(e) => setShowAll(e.checked)} />
            Include Terminated */}
                    </div>
                </div>
                <div className="md:col-4 col-12">
                    <div className="equal_space inlineFlex">
                        <GlobalInputField id="searchField" name="searchField" type="text" placeholder="Search..." className="input_position" value={globalFilterValue} onChange={onGlobalFilterChange} />

                        <div>
                            <SecondaryButton label="Add New Client" type="button" onClick={() => setIsAddDialog(true)} style={{ width: "120px", height: "36px", marginTop: "0px" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="col-12">
                    {loading === true ? (
                        <CustomLoader />
                    ) : (
                        <div className="card">
                            <DataTable filter value={data} responsiveLayout="scroll" key="id" rows={16} emptyMessage="No record available." paginator filters={filters} globalFilterFields={["client_name", "status", "createdBy", "request_type"]}>
                                <Column field="client_name" header="Client Name"></Column>
                                <Column field="status" header="Status"></Column>
                                <Column field="createdBy" header="Created By"></Column>
                                <Column field="request_type" header="Request Type"></Column>
                                <Column body={createdDateTemplate} header="Request Date"></Column>
                                <Column field="previous_credit_limit" header="Previous Credit Limit"></Column>
                                <Column field="requested_Credit_Limit" header="Request Credit Limit"></Column>
                                <Column field="current_Credit_Limit" header="Current Credit Limit"></Column>
                                <Column body={actionTemplate} header="Action"></Column>
                            </DataTable>
                        </div>
                    )}
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
                    header={editData == null ? "Add New Request" : "Edit Request"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "40vw" }}
                    component={
                        <AddeditRequest
                            editData={editData}
                            onHide={() => {
                                setIsAddDialog(false);
                                setEditData(null);
                            }}
                        />
                    }
                />
            )}
            {/*Del Dialogs */}
            {/* 
      {delDialog && (
        <GlobalDialogIndex
          showHeader={true}
          visible={delDialog}
          onHide={() => setDelDialog(false)}
          header={false}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "20vw" }}
          component={<DeleteDialog onHide={() => setDelDialog(false)} />}
        />
      )} */}
        </>
    );
};

export default ClientRequest;
