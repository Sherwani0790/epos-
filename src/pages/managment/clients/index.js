import React, { useEffect, useState } from 'react'
//css
import "./clients.scss"
//Prime Component
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { BsTrash } from 'react-icons/bs';
// import { FaRegEdit } from "react-icons/fa";
import { BreadCrumb } from "primereact/breadcrumb";
import { FilterMatchMode } from "primereact/api";
// import GlobalVerticalDots from '../../../ui-components/globalverticaldots';
import GlobalInputField from '../../../ui-components/globalinputfield';
// import SecondaryButton from '../../../ui-components/secondarybutton';
import GlobalDialogIndex from '../../../ui-components/globaldialoge';
import DeleteDialog from './component/deletedialog';
import GlobalCheckbox from '../../../ui-components/globalcheckbox';
import { getClientList } from '../../../redux/auth_slice/client_slice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CustomLoader from '../../../ui-components/globalloading';
import AddEditClient from './component';
// import SecondaryButton from '../../../ui-components/secondarybutton';
const ClientsScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    //Redux Selector
    const clientReducer = useSelector((state) => state.clientMainList);

    const { data, loading } = clientReducer;
    useEffect(() => {
        dispatch(getClientList());

    }, [dispatch]);
    //States
    const [isAddDialog, setIsAddDialog] = useState(false);
    const [editData, setEditData] = useState(null);
    const [delDialog, setDelDialog] = useState(false);
    const [showAll, setShowAll] = useState(false);

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
    // const kebabMenuItems = [
    // { id: 1, title: "Edit", icon: <FaRegEdit /> },
    // { id: 2, title: "Delete", icon: <BsTrash /> },
    //];
    // const handleOpenMenuItems = (status, rowData) => {

    //   if (status === 1) {
    // setIsAddDialog(true);
    //     setEditData("Edit");
    // setEditData(rowData);
    //} else if (status === 2) {
    //  setDelDialog(true);

    //}
    //};
    const actionTemplate = (rowData) => {
        return (
            <>
                {/* <GlobalVerticalDots
                    items={kebabMenuItems}
                    handleMenuOpen={(status) => handleOpenMenuItems(status, rowData)}
                    btnclr={false}

                /> */}
                <Button
                    tooltip="View Details"
                    icon="pi pi-eye"
                    tooltipOptions={{ position: "top" }}
                    className="eye-icon-btn"

                    onClick={() => {
                        history.push("/api/clientdetails" + rowData.id)
                    }
                    } />
            </>
        );
    }
    const createdDateTemplate = (rowData) => {
        return (
            <>
                {moment(rowData?.application_date).format('YYYY-MM-DD')}
            </>
        )
    }
    // Bredcrumb
    const items = [{ label: `Clients` }];
    const home = { icon: 'pi pi-home', to: '/InvoicesView' };
    return (
        <>
            <div className="">
                <BreadCrumb model={items} home={home} />
            </div>
            <div className="grid">
                <div className="md:col-8">
                    <div className="terminated_check_styles">
                        <GlobalCheckbox name="include_terminated" id="include_terminated" checked={showAll} onChange={(e) => setShowAll(e.checked)} />
                        Include Terminated
                    </div>
                </div>
                <div className="md:col-4 col-12">
                    <div className="equal_space inlineFlex">
                        <GlobalInputField
                            id="searchField"
                            name="searchField"
                            type="text"
                            placeholder="Search..."
                            className="input_position"
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                        />

                        <div>
                            {/* <SecondaryButton
                                label="Add New Client"
                                type="button"
                                onClick={() => setIsAddDialog(true)}
                                style={{ width: "120px", height: "36px", marginTop: "0px" }}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid'>
                <div className='col-12'>
                    {loading === true ? (
                        <CustomLoader />
                    ) : (
                        <div className='card'>
                            <DataTable
                                filter
                                value={data}
                                responsiveLayout="scroll"
                                key="id"
                                rows={16}
                                emptyMessage="No record available."
                                paginator
                                filters={filters}
                                globalFilterFields={["client_name", "phone_no", "client_available_limit",]}
                            >
                                <Column field="client_name" header="Regisered Business Name"></Column>
                                <Column body={createdDateTemplate} header="Application On"></Column>
                                <Column field="client_phone" header="Phone No"></Column>
                                <Column field="client_available_limit" header="Client Available Limit"></Column>
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
                    onHide={() => { setIsAddDialog(false); setEditData(null) }}
                    header={editData == null ? "Add New Ticket" : "Edit Ticket"}
                    draggable={false}
                    breakpoints={{ "960px": "80vw", "640px": "90vw" }}
                    style={{ width: "40vw" }}
                    component={<AddEditClient editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
                />
            )
            }
            {/*Del Dialogs */}

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
            )}

        </>
    )
}

export default ClientsScreen
