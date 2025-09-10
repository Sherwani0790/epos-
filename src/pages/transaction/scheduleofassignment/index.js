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
import GlobalInputField from '../../../ui-components/globalinputfield';
import SecondaryButton from '../../../ui-components/secondarybutton';
import GlobalVerticalDots from '../../../ui-components/globalverticaldots';
import GlobalCheckbox from '../../../ui-components/globalcheckbox';
import AddEditSchedule from './component';
import VerifySchedule from './component/verifyschedule';
// import VerifyScheduleDialog from './component';
const ScheduleOfAssignment = () => {
  const data = [
    {
      id: 1,
      clientname: "Jess",
      scheduleno: "305",
      fundingdate: " 2023-01-01",
      attachments: "1",
      unverifiedinvoices: "1",
      verifiedinvoices: "1",
      totalinvoices: "1",
      netfunding: "$199,055.00",
      remainingamount: "$199,055.00",
      totalfunding: "$199,055.00",
    },
    {
      id: 2,
      clientname: "Jenefir",
      scheduleno: "305",
      fundingdate: " 2023-03-20",
      attachments: "1",
      unverifiedinvoices: "4",
      verifiedinvoices: "2",
      totalinvoices: "12",
      netfunding: "$199.00",
      remainingamount: "$1,055.00",
      totalfunding: "$9,055.00",
    },]


  // States
  const [showAll, setShowAll] = useState(false);
  const [isAddDialog, setIsAddDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [delDialog, setDelDialog] = useState(false);
  const [isverify, setIsVerify] = useState(false);


  // Filter Kbab Menu Template
  const kebabMenuFilterItems = [
    { id: 1, title: "Verify Schedule", icon: <FaRegEdit /> },

  ];
  const handleOpenMenuFilterItems = (status) => {

    if (status === 1) {
      setIsVerify(true);
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
  const items = [{ label: `Schedule of Assignment` }];
  const home = { icon: 'pi pi-home', to: '/scheduleofassignment' };
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
                label="Add New Schedule"
                type="button"
                onClick={() => setIsAddDialog(true)}
                style={{ width: "140px", height: "36px", marginTop: "5px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid'>
        <div className='md:col-12'>
          <div className='card'>
            <DataTable filter value={data} responsiveLayout="scroll" key="_id">
              <Column field="clientname" header="Client Name"></Column>
              <Column field="scheduleno" header="Schedule No"></Column>
              <Column field="fundingdate" header="Funding Date"></Column>
              <Column field="attachments" header="Attachments"></Column>
              <Column field="unverifiedinvoices" header="Unverified Invoices"></Column>
              <Column field="verifiedinvoices" header="Verified Invoices"></Column>
              <Column field="totalinvoices" header="Total Invoices"></Column>
              <Column field="netfunding" header="Net Funding"></Column>
              <Column field="remainingamount" header="Remaining Amount"></Column>
              <Column field="totalfunding" header="Total Funding"></Column>
              <Column body={actionTemplate} header="Action"></Column>
            </DataTable>
          </div>
        </div>
      </div>
      {/*Filter Change Status Dialogs */}
      {isverify && (
        <GlobalDialogIndex
          showHeader={true}
          visible={isverify}
          onHide={() => { setIsVerify(false) }}
          header={"Verify Schedule"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "30vw" }}
          component={<VerifySchedule onHide={() => { setIsVerify(false) }} />}
        />
      )
      }
      {/*Add Edit Dialogs */}
      {isAddDialog && (
        <GlobalDialogIndex
          showHeader={true}
          visible={isAddDialog}
          onHide={() => { setIsAddDialog(false); setEditData(null) }}
          header={editData == null ? "Add New Schedule" : "Edit Schedule"}
          draggable={false}
          breakpoints={{ "960px": "80vw", "640px": "90vw" }}
          style={{ width: "40vw" }}
          component={<AddEditSchedule editData={editData} onHide={() => { setIsAddDialog(false); setEditData(null) }} />}
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

export default ScheduleOfAssignment
