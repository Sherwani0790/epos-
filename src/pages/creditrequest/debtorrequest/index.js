import React, { useState } from 'react'
//css
import "./debtorequest.scss"
//Prime Component
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsTrash } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import { BreadCrumb } from "primereact/breadcrumb";
import { FilterMatchMode } from "primereact/api";
import GlobalCheckbox from '../../../ui-components/globalcheckbox';
import GlobalInputField from '../../../ui-components/globalinputfield';
import SecondaryButton from '../../../ui-components/secondarybutton';
import GlobalDialogIndex from '../../../ui-components/globaldialoge';
import DeleteDialog from './component/deletedialog';
import GlobalVerticalDots from '../../../ui-components/globalverticaldots';
// import AddeditRequest from './component';
import AddeditDebtor from './component';
const DebtorRequest = () => {
  const data = [
    {
      id: 1,
      clientname: "Josep",
      debtorname: "Josepal",
      status: "Approve",
      phoneno: "(+335) 134-124",
      request_date: " 2023-01-01 ",
      previous_credit_limit: "$199.00",
      requested_credit_limit: "$10.00",
      current_credit_limit: "$10.00",
    },
    {
      id: 2,
      clientname: "Josep",
      debtorname: "Jess",
      phoneno: "(+335) 134-124",
      status: "Deny",
      request_date: " 2023-01-01",
      previous_credit_limit: "$145.00",
      requested_credit_limit: "$10.00",
      current_credit_limit: "$10.00",
    },
  ];

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
      setDelDialog(true);

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
  // Bredcrumb
  const items = [{ label: `Debtor Request` }];
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
              <SecondaryButton
                label="Add New Debtor"
                type="button"
                onClick={() => setIsAddDialog(true)}
                style={{ width: "120px", height: "36px", marginTop: "5px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid'>
        <div className='md:col-12'>
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
              globalFilterFields={["clientname", "phoneno","status"]}
            >
              <Column field="clientname" header="Client Name"></Column>
              <Column field="debtorname" header="Debtor Name"></Column>
              <Column field="phoneno" header="Phone No"></Column>
              <Column field="status" header="Status"></Column>
              <Column field="request_date" header="Request Date"></Column>
              <Column field="previous_credit_limit" header="Previous Credit Limit"></Column>
              <Column field="requested_credit_limit" header="Request Credit Limit"></Column>
              <Column field="current_credit_limit" header="Current Credit Limit"></Column>
              <Column body={actionTemplate} header="Action"></Column>
            </DataTable>
          </div>
        </div>
      </div>
      {/*Add Edit Dialogs */}
      {isAddDialog && (
        <GlobalDialogIndex
          showHeader={true}
          visible={isAddDialog}
          onHide={() => { setIsAddDialog(false); setEditData(null) }}
          header={editData == null ? "Add New Debtor" : "Edit Debtor"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "40vw" }}
        component={<AddeditDebtor editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
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


export default DebtorRequest
