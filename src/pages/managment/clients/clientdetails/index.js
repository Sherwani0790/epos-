import React from 'react'
import ProfileClient from './component/profile'
import { TabPanel, TabView } from 'primereact/tabview'
import { useParams } from 'react-router-dom';

const ClientDetails = () => {
    const { id } = useParams();
    console.log("ClientDetails ID:", id)
  return (
    <>
      <div className="user_profile">
            <h4 className="pt-2">
                <b>Client Details</b>
            </h4>
            <div className="card mt-2">
                <TabView>
                    <TabPanel header="Profile">
                        <ProfileClient id={id}/>
                    </TabPanel>
                    <TabPanel header="Documents">
                        {/* <ChangePassword /> */}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </>
  )
}

export default ClientDetails
