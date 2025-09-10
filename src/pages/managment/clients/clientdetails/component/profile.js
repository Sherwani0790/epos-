import React, { useEffect } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClientById } from '../../../../../redux/auth_slice/client_slice';
import { Accordion, AccordionTab } from 'primereact/accordion';
// import ClientItem from './clientitem';
const ProfileClient = () => {
    const dispatch = useDispatch();
    const { id } = useParams();


    const clientIDReducer = useSelector((state) => state.clientMainList);
    const { clientDetailsloading, clientDetails } = clientIDReducer;
    useEffect(() => {

        dispatch(getClientById(id));

    }, [dispatch, id]);
    // console.log("Client Details:", clientIDReducer);

    const HeaderItems = (ownerName, ownerEmail) => {
        return (
            <>
                <div className="flex flex-column pl-2 pt-2 pb-2">
                    <h6 className="m-0">{ownerName}</h6>
                    <p className="m-0">{ownerEmail}</p>
                </div>
            </>
        );
    };

    return (
        <>
            {clientDetailsloading && <p>Loading...</p>}
            {clientDetails && (
                <div className='grid'>
                    <div className='md:col-5 col-12'>
                        <div className='profile-client-card card'>
                            {/* Heading */}
                            <div className='flex justify-content-between mb-3'>
                                <h4>
                                    {clientDetails?.data?.client_name || "N/A"}
                                </h4>
                            </div>
                            {/* Details */}
                            <div className='client_main_info'>

                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p className=''><b>Application on:</b></p>
                                        <p>{moment(clientDetails?.data?.application_date).format('YYYY-MM-DD') || "N/A"}</p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>
                                            <b> Contact No:</b>
                                        </p>
                                        <p>{clientDetails?.data?.client_phone || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Contact Email:</b></p>
                                        <p>{clientDetails?.data?.client_email || "N/A"}</p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>
                                            <b>Income:</b>
                                        </p>
                                        <p>{clientDetails?.data?.client_income || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Employment type:</b></p>
                                        <p>{clientDetails?.data?.client_employment_type || "N/A"}</p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>
                                            <b>Employee count:</b>
                                        </p>
                                        <p>{clientDetails?.data?.client_employment_count || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>SSN:</b></p>
                                        <p>{clientDetails?.data?.client_ssn || "N/A"}</p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>
                                            <b> Contact Phone:</b>
                                        </p>
                                        <p>{clientDetails?.data?.client_phone || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Zip Code:</b></p>
                                        <p>{clientDetails?.data?.client_zip || "N/A"}</p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>
                                            <b> State:</b>
                                        </p>
                                        <p>{clientDetails?.data?.client_state || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>City:</b></p>
                                        <p>{clientDetails?.data?.client_city || "N/A"}</p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>
                                            <b>Client Available Limit:</b>
                                        </p>
                                        <p>{clientDetails?.data?.client_available_limit || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='md:col-2 col-12'>
                        <div className='profile-client-card card'>
                            <div className='flex justify-content-between'></div>
                            {clientDetails?.data?.client_name}
                        </div>
                    </div>
                    <div className='md:col-5 col-12'>
                        <div className='profile-client-card card'>
                            {/* Heading */}
                            <div className='flex justify-content-between mb-3'>
                                <h4>
                                    {clientDetails?.data?.client_name || "N/A"}
                                </h4>
                            </div>
                            {/* Details */}
                            <div className='client_main_info'>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Federal/Status Tax Due:</b></p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>{clientDetails?.data?.client_federalstatus_tax_due ? 'Yes' : 'No'}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Due Type:</b></p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>{clientDetails?.data?.client_due_type || "N/A"}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Due Amount:</b></p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>{clientDetails?.data?.client_due_amount || "N/A"}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Due Lien Filed:</b></p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>{clientDetails?.data?.client_duelien_filed ? 'Yes' : 'No'}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Referral Platform:</b></p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>{clientDetails?.data?.client_referal_platform || "N/A"}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-6 col-12">
                                        <p><b>Referral Code:</b></p>
                                    </div>
                                    <div className="md:col-6 col-12">
                                        <p>{clientDetails?.data?.client_referral_code || "N/A"}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* miscellaneous information */}
                    <div className='md:col-6 col-12'>
                        <div className='profile-client-card card h-auto'>
                            {/* Heading */}
                            <div className='flex justify-content-between mb-3'>
                                <h4>
                                    Miscellaneous Information
                                </h4>
                            </div>
                            {/* Details */}
                            <div className='client_main_info'>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Expected Factoring Volume:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_expected_factoring_volume || 'N/A'}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Current Receivable Outstanding:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_current_receivable_outstanding || "N/A"}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Requested First Funding Date:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{moment(clientDetails?.data?.client_requested_first_funding_date).format('YYYY-MM-DD') || "N/A"}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Required Funding Amount:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_required_funding_amount || 'N/A'}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Have You Factored Before?</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_factored_before ? 'Yes' : 'No'}</p>

                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Factored With Whom?</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_factoredwith_whom || "N/A"}</p>

                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* _ownersList information */}
                        <div className='profile-client-card card h-auto'>
                            {/* Heading */}
                            <div className='flex justify-content-between mb-3'>
                                <h4>
                                    Owner Information
                                </h4>
                            </div>
                            {/* Details */}

                            <div className="business_scrollbar">
                                <Accordion activeIndex={0}>
                                    {clientDetails?.data?._ownersList.map((owner, index) => (
                                        <AccordionTab key={index} headerTemplate={() => HeaderItems(owner.owner_name, owner.owner_email)}>
                                            <div>
                                                <p><strong>Name:</strong> {owner.owner_name}</p>
                                                <p><strong>Address:</strong> {owner.owner_address}</p>
                                                <p><strong>City:</strong> {owner.owner_city}</p>
                                                <p><strong>State:</strong> {owner.owner_state}</p>
                                                <p><strong>Zip:</strong> {owner.owner_zip}</p>
                                                <p><strong>Phone:</strong> {owner.owner_phone}</p>
                                                <p><strong>Date of Birth:</strong> {owner.owner_dob}</p>
                                                <p><strong>SSN:</strong> {owner.owner_ssn}</p>
                                            </div>
                                        </AccordionTab>
                                    ))}
                                </Accordion>
                            </div>

                        </div>
                    </div>
                    {/* financial information */}
                    <div className='md:col-6 col-12'>
                        <div className='profile-client-card card'>
                            {/* Heading */}
                            <div className='flex justify-content-between mb-3'>
                                <h4>
                                    Financial Information
                                </h4>
                            </div>
                            {/* Details */}
                            <div className='client_main_info'>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Bank Name:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_name || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Account No:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_account_no || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Account Opening Date:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{moment(clientDetails?.data?.client_account_opening_date).format('YYYY-MM-DD') || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Routing No:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_routing_number || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Bank Officer Name:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_officer_name || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Current Available Balance:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_current_available_balance || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Zip Code:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_zip || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b> State:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_state || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>City:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_city || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Branch Phone:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_bank_phone || "N/A"}</p>
                                    </div>
                                </div>
                                <div className='grid'>
                                    <div className="md:col-8 col-12">
                                        <p><b>Loan Outstanding?:</b></p>
                                    </div>
                                    <div className="md:col-4 col-12">
                                        <p>{clientDetails?.data?.client_loan_outstanding_status ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileClient
