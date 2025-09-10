import React from 'react'
import { TabView, TabPanel } from "primereact/tabview";
import UserDetails from './component/userdetails'
import ChangePassword from './component/changepassword';
//css
import "./userprofile.scss"

const UserProfile = () => {
  return (
    <>
     <div className="user_profile">
            <h4 className="pt-2">
                <b>User Profile</b>
            </h4>
            <div className="card mt-6">
                <TabView>
                    <TabPanel header="Account Details">
                        <UserDetails />
                    </TabPanel>
                    <TabPanel header="Change Password">
                        <ChangePassword />
                    </TabPanel>
                </TabView>
            </div>
        </div>
      
    </>
  )
}

export default UserProfile
