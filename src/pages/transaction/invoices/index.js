import React, { useState } from 'react'

// Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsTrash } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import { BreadCrumb } from "primereact/breadcrumb";
// Ui-Components
import GlobalDialogIndex from '../../../ui-components/globaldialoge';
import DeleteDialog from './component/deletedialog';
import AddEditInvoice from './component';
import GlobalInputField from '../../../ui-components/globalinputfield';
import SecondaryButton from '../../../ui-components/secondarybutton';
import GlobalVerticalDots from '../../../ui-components/globalverticaldots';
// Css 
import "./invoices.scss"
import GlobalCheckbox from '../../../ui-components/globalcheckbox';
import ChangeStatusModal from './component/changestatusmodal';

const InvoicesView = () => {
  const data = [{ invoiceNo: "test", scheduleno: "temp", clientName: "12PKR", debtorName: "tester", invoiceDate: "12/12/2023", fundingDate: "12/12/2023", status: "Pending", invoiceAmount: "$ 19.00" }]


  // States
  const [showAll, setShowAll] = useState(false);
  const [isAddDialog, setIsAddDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [delDialog, setDelDialog] = useState(false);
  const [ischangestatus, setIsChangeStatus] = useState(false);


  // Filter Kbab Menu Template
  const kebabMenuFilterItems = [
    { id: 1, title: "Change Statues", icon: <FaRegEdit /> },

  ];
  const handleOpenMenuFilterItems = (status) => {

    if (status === 1) {
      setIsChangeStatus(true);
    }
  };
  const kebabMenuItems = [
    { id: 1, title: "Edit", icon: <FaRegEdit /> },
    { id: 2, title: "Delete", icon: <BsTrash /> },
  ];
  const handleOpenMenuItems = (status) => {

    if (status === 1) {
      setIsAddDialog(true);
      setEditData("Edit")
    } else if (status === 2) {
      setDelDialog(true);

    }
  };
  const actionTemplate = () => {
    return (
      <>
        <GlobalVerticalDots
          items={kebabMenuItems}
          handleMenuOpen={handleOpenMenuItems}
          btnclr={false}
        />
      </>
    );
  }
  // Bredcrumb
  const items = [{ label: `Invoices` }];
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
            />
            <div>
              <GlobalVerticalDots
                btnclr={true}
                items={kebabMenuFilterItems}
                handleMenuOpen={handleOpenMenuFilterItems}
              />
            </div>
            <div>
              <SecondaryButton
                label="Add New Invoice"
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
            <DataTable filter value={data} responsiveLayout="scroll" key="_id">
              <Column field="invoiceNo" header="Invoice No"></Column>
              <Column field="scheduleno" header="Schedule No"></Column>
              <Column field="clientName" header="Client Name"></Column>
              <Column field="debtorName" header="Debtor Name"></Column>
              <Column field="invoiceDate" header="Invoice Date"></Column>
              <Column field="fundingDate" header="Funding Date"></Column>
              <Column field="status" header="Status"></Column>
              <Column field="invoiceAmount" header="invoice Amount"></Column>
              <Column body={actionTemplate} header="Action"></Column>
            </DataTable>
          </div>
        </div>
      </div>
      {/*Filter Change Status Dialogs */}
      {ischangestatus && (
        <GlobalDialogIndex
          showHeader={true}
          visible={ischangestatus}
          onHide={() => { setIsChangeStatus(false)}}
          header={"Change Status"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "30vw" }}
          component={<ChangeStatusModal onHide={() => { setIsChangeStatus(false) }} />}
        />
      )
      }
      {/*Add Edit Dialogs */}
      {isAddDialog && (
        <GlobalDialogIndex
          showHeader={true}
          visible={isAddDialog}
          onHide={() => { setIsAddDialog(false); setEditData(null) }}
          header={editData == null ? "Add New Invoice" : "Edit Invoice"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "40vw" }}
          component={<AddEditInvoice editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
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

export default InvoicesView
