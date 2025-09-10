import React, { useEffect, useState } from 'react'
//Css
import "./support.scss"
//Prime Component
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsTrash } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import { BreadCrumb } from "primereact/breadcrumb";
import GlobalVerticalDots from '../../ui-components/globalverticaldots';
import GlobalInputField from '../../ui-components/globalinputfield';
import SecondaryButton from '../../ui-components/secondarybutton';
import GlobalDialogIndex from '../../ui-components/globaldialoge';
import AddEditTicket from './component';
// import DeleteDialog from './component/deletedialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupport, getSupportList, resetSupportSlice } from '../../redux/auth_slice/support_slice';
import { FilterMatchMode } from "primereact/api";
import { confirmPopup } from 'primereact/confirmpopup';
import { toast } from 'react-toastify';
import moment from 'moment';
import CustomLoader from '../../ui-components/globalloading';
const SupportView = () => {
  const dispatch = useDispatch();
  //Redux Selector
  const supportReducer = useSelector((state) => state.supportMainList);
  let deleteId;
  const { data, deleteSuccess, deleteError,loading } = supportReducer;
  useEffect(() => {
    dispatch(getSupportList());

  }, [dispatch]);
  useEffect(() => {

    if (deleteSuccess !== undefined) {
      if (deleteSuccess === true) {
        dispatch(getSupportList());
        toast.warn("Deleted Successfully")

      } else {
        toast.error(deleteError);
      }
    }
    return () => {
      dispatch(resetSupportSlice());
    }
  }, [deleteSuccess, deleteError, dispatch]);

  const confirmDeleteAd = () => {
    confirmPopup({
      message: 'Do you want to delete this ticket?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,

    });
  };
  const accept = () => {
    dispatch(deleteSupport(deleteId));
  }

  useEffect(() => {
    dispatch(getSupportList());
  }, [dispatch]);

  // States

  const [isAddDialog, setIsAddDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  // const [delDialog, setDelDialog] = useState(false);

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
    { id: 1, title: "Edit", icon: <FaRegEdit /> },
    { id: 2, title: "Delete", icon: <BsTrash /> },
  ];
  const handleOpenMenuItems = (status, rowData) => {

    if (status === 1) {
      setIsAddDialog(true);
      setEditData("Edit");
      setEditData(rowData);
    } else if (status === 2) {
      // setDelDialog(true);
      deleteId = rowData.id;
      confirmDeleteAd(rowData.id);
      // setEditData(rowData.id);
    }
  };
  const actionTemplate = (rowData) => {
    return (
      <>
        <GlobalVerticalDots
          items={kebabMenuItems}
          handleMenuOpen={(status) => handleOpenMenuItems(status, rowData)}
          btnclr={false}

        />
      </>
    );
  }
  const createdDateTemplate = (rowData) => {
    return (
      <>
        {moment(rowData?.created_at).format('YYYY-MM-DD')}
      </>
    )
  }

  // Bredcrumb
  const items = [{ label: `Support` }];
  const home = { icon: 'pi pi-home', to: '/InvoicesView' };
  return (
    <>
      <div className="">
        <BreadCrumb model={items} home={home} />
      </div>
      <div className="grid">
        <div className="md:col-8">

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
              <SecondaryButton
                label="Add New Ticket"
                type="button"
                onClick={() => { setIsAddDialog(true); setEditData(null); }}
                style={{ width: "120px", height: "36px", marginTop: "0px" }}
              />
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
                globalFilterFields={["title", "ticket_type_text", "priority_text", "assignedto", "createdby"]}
              >
                <Column field="title" header="Ticket Title"></Column>
                <Column field="ticket_type_text" header="Ticket Type"></Column>
                <Column field="priority_text" header="Priority"></Column>
                <Column field="status_text" header="Status"></Column>
                <Column field="assignedto" header="Assigned To"></Column>
                <Column field="createdby" header="Created By"></Column>
                <Column body={createdDateTemplate} header="Created At"></Column>
                <Column field="resolution_date" header="Resolution"></Column>
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
          component={<AddEditTicket editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
        />
      )
      }
      {/*Del Dialogs */}

      {/* {delDialog && (
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
  )
}

export default SupportView
