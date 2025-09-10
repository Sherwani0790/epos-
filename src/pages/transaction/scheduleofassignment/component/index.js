import React, { useState } from 'react'
import GlobalDropdown from '../../../../ui-components/globaldropdown';
import GlobalInputField from '../../../../ui-components/globalinputfield';
import GlobalInputdate from '../../../../ui-components/globalinputdate';
import DefaultButton from '../../../../ui-components/defaultbutton';
import SecondaryButton from '../../../../ui-components/secondarybutton';

const AddEditSchedule = (props) => {
  //Props
  const { onHide, editData } = props;
  //States
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDebtorContact, setSelectedDebtorContact] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [selectedstatus, setSelectedstatus] = useState(null);
  //OnChange Function
  const onClientChange = (e) => {
    setSelectedClient(e.value);
  };
  const onDebtorContactChange = (e) => {
    setSelectedDebtorContact(e.value);
  };
  const onPaymentModeChange = (e) => {
    setSelectedPaymentMode(e.value);
  };
  const onStatusChange = (e) => {
    setSelectedstatus(e.value);
  };
  //Drpdown List
  const clientName = [
    { name: "Amir", code: "HG" },
    { name: "Saad", code: "MD" },
    { name: "Lamda", code: "LW" },
  ];
  const debotrContact = [
    { name: "1238-00-99", code: "HG" },
    { name: "1238-00-44", code: "MD" },
    { name: "1238-00-00", code: "LW" },
  ];
  const paymentMode = [
    { name: "AIRE", code: "HG" },
    { name: "DOME", code: "MD" },
    { name: "TIER", code: "LW" },
  ];
  const status = [
    { name: "Pending", code: "HG" },
    { name: "Approved", code: "MD" },
    { name: "Rejected", code: "LW" },
  ];

  return (
    <div className='container-fluid'>
      <div className="grid">
        <div className="col-12 md:col-6 pb-3">
          <GlobalDropdown
            label="Client Name"
            id="client_Name"
            name="client_Name"
            value={selectedClient}
            options={clientName}
            onChange={onClientChange}
            optionLabel="name"
            placeholder="Select"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputField
            label="Schedule No"
            name="schedule_no"
            id="schedule_no"
            placeholder="Enter Schedule No"
            isRequired
          />
        </div>
        {/* Schedule Add More Data */}


        <div className="col-12 md:col-6 pb-3">
          <GlobalDropdown
            label="Debtor Name"
            id="debtor_Name"
            name="debtor_Name"
            value={selectedClient}
            options={clientName}
            onChange={onClientChange}
            optionLabel="name"
            placeholder="Select"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalDropdown
            label="Debtor Contact"
            id="debtor_Contact"
            name="debtor_Contact"
            value={selectedDebtorContact}
            options={debotrContact}
            onChange={onDebtorContactChange}
            optionLabel="name"
            placeholder="Select"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputField
            label="Invoice No"
            name="invoice_No"
            id="invoice_No"
            placeholder="Enter Invoice No"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputField
            label="Invoice Amount"
            name="invoice_Amount"
            id="invoice_Amount"
            placeholder="Enter Invoice Amount"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputdate
            label="Invoice Date"
            name="invoice_Date"
            id="invoice_Date"
            placeholder="mm/dd/yyyy"
            mask="99/99/9999"
            showIcon
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputdate
            label="Commitment Date"
            name="commitment_Date"
            id="commitment_Date"
            placeholder="mm/dd/yyyy"
            mask="99/99/9999"
            showIcon
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputdate
            label="Invoice Due Date"
            name="invoice_due_Date"
            id="invoice_due_Date"
            placeholder="mm/dd/yyyy"
            mask="99/99/9999"
            showIcon
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalDropdown
            label="Payment Mode"
            id="payment_mode"
            name="payment_mode"
            value={selectedPaymentMode}
            options={paymentMode}
            onChange={onPaymentModeChange}
            optionLabel="name"
            placeholder="Select"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalDropdown
            label="Status"
            id="status"
            name="status"
            value={selectedstatus}
            options={status}
            onChange={onStatusChange}
            optionLabel="name"
            placeholder="Select"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalDropdown
            label="Payment Type"
            id="payment_type"
            name="payment_type"
            value={selectedPaymentMode}
            options={paymentMode}
            onChange={onPaymentModeChange}
            optionLabel="name"
            placeholder="Select"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputField
            label="Advance Amount"
            name="advance_Amount"
            id="advance_Amount"
            placeholder="Enter Advance Amount"
            isRequired
          />
        </div>
        <div className="col-12 md:col-6 pb-3">
          <GlobalInputField
            type="file"
            label="Attachement"
            name="attachment"
            id="attachment"
            isRequired
          />
        </div>

        {/* Schedule Add More Data ENd */}

        <div className='col-12 mb-3'>
          <div className='text-center'>
            <DefaultButton label="Cancel"
              style={{ marginRight: "7px" }}
              onClick={(e) => {
                e.preventDefault();
                onHide()
              }} />
            <SecondaryButton
              style={{ marginLeft: "7px" }}
              label={editData == null ? "Save" : "Update"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditSchedule
