import React from "react";
import "./charts.scss";

const ManageUsersProgbar = () => {
  return (
    <>
      {/* //Admin */}
      <div className={"container_progressbar"}>
        <div className={"progresbar_card"}>
          <div className={"progressbar_count"}>
            <span>Admin</span>
            <p>100</p>
          </div>
          <div className={"skills"}>
            <div className={"admin"}></div>
          </div>
        </div>
      </div>
      {/* //Manager */}
      <div className={"container_progressbar"}>
        <div className={"progresbar_card"}>
          <div className={"progressbar_count_manager"}>
            <span>Manager</span>
            <p>100</p>
          </div>
          <div className={"skills_manager"}>
            <div className={"manager"}></div>
          </div>
        </div>
      </div>
      {/* //BusinessDevelopmentExcecutive */}
      <div className={"container_progressbar"}>
        <div className={"progresbar_card"}>
          <div
            className={"progressbar_count_Business_Development_Executive"}
          >
            <span>Business Development Executive</span>
            <p>100</p>
          </div>
          <div className={"skills_Business_Development_Executive"}>
            <div className={"Business_Development_Executive"}></div>
          </div>
        </div>
      </div>
      {/* //BusinessDevelopmentExcecutive */}
      <div className={"container_progressbar"}>
        <div className={"progresbar_card"}>
          <div className={"progressbar_count_other"}>
            <span>Other</span>
            <p>100</p>
          </div>
          <div className={"skills_other"}>
            <div className={"other"}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsersProgbar;
