import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import SecondaryButton from '../../ui-components/secondarybutton';
import GlobalInputField from '../../ui-components/globalinputfield';
import { BreadCrumb } from 'primereact/breadcrumb';
import GlobalVerticalDots from '../../ui-components/globalverticaldots';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import GlobalDialogIndex from '../../ui-components/globaldialoge';
// import GlobalInputSwitch from '../../ui-components/globalinputswitch';
import AddEditUser from './component';
// import DeleteDialog from './component/deletedialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserList, resetUserSlice } from '../../redux/auth_slice/usermanagement_slice';
import { FilterMatchMode } from "primereact/api";
import { confirmPopup } from 'primereact/confirmpopup';
import { toast } from 'react-toastify';
import CustomLoader from '../../ui-components/globalloading';

const UserManagement = () => {
  const dispatch = useDispatch();
  //Redux Selector
  const userReducer = useSelector((state) => state.userMainList);
  let deleteId;
  const { data, deleteSuccess, deleteError, loading } = userReducer;
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {

    if (deleteSuccess !== undefined) {
      if (deleteSuccess === true) {
        dispatch(getUserList());
        toast.warn("Deleted Successfully")

      } else {
        toast.error(deleteError);
      }
    }
    return () => {
      dispatch(resetUserSlice());
    }
  }, [deleteSuccess, deleteError, dispatch]);


  const confirmDeleteAd = () => {
    confirmPopup({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,

    });
  };
  const accept = () => {
    dispatch(deleteUser(deleteId));
  }

  useEffect(() => {
    dispatch(getUserList());
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
    // console.log(deleteId)
  };
  // console.log(object)

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

  // Bredcrumb
  const items = [{ label: `UserManagement` }];
  const home = { icon: 'pi pi-home' };


  const statusTemplate = (rowData) => {
    return (
      <>
        {rowData.isActive === true ? "Active" : "Inactive"}
      </>
    );
  }



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
                label="Add New User"
                type="button"
                onClick={() => setIsAddDialog(true)}
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
                globalFilterFields={["fullName", "userName", "emailAddress", "isActive", "role"]}

              >
                <Column field="fullName" header="Full Name"></Column>
                <Column field="userName" header="Username"></Column>
                <Column field="emailAddress" header="Email Address"></Column>
                <Column field="phoneNumber" header="Phone No"></Column>
                <Column field="address" header="Address"></Column>
                <Column field="role" header="Role"></Column>
                <Column body={statusTemplate} header="Status"></Column>
                {/* <Column body={activeInavtiveTemplate} header="Active/Inactive"></Column> */}
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
          header={editData == null ? "Add New User" : "Edit User"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "40vw" }}
          component={<AddEditUser editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
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


export default UserManagement
