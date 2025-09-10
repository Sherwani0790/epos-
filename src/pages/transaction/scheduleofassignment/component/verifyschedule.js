import React, { useState } from 'react'
import GlobalDropdown from '../../../../ui-components/globaldropdown';
import DefaultButton from '../../../../ui-components/defaultbutton';
import SecondaryButton from '../../../../ui-components/secondarybutton';

const VerifySchedule = (props) => {
    //Props
    const { onHide } = props;
    const [selectedStatus, setSelectedstatus] = useState(null);

    //OnChange Function
    const onStatusChange = (e) => {
        setSelectedstatus(e.value);
    };
    //Drpdown List
    const statusName = [
        { name: "Pending", code: "HG" },
        { name: "Approved", code: "MD" },
        { name: "Deny", code: "LW" },
    ];
    return (
        <>
            <div className='container-fluid'>
                <div className="grid">
                    <div className="col-12 md:col-12 pb-3">
                        <GlobalDropdown
                            label="Status"
                            id="statusName"
                            name="statusName"
                            value={selectedStatus}
                            options={statusName}
                            onChange={onStatusChange}
                            optionLabel="name"
                            placeholder="Select"
                            isRequired
                        />
                    </div>
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
                                label={"Save"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default VerifySchedule
