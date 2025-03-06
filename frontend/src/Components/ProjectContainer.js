import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineStarBorder } from "react-icons/md";

const ProjectContainer = (props) => {
  const [arr, setArr] = useState([]);

  let status = "";

  if (props.status === "N/A") {
    status = "Start";
  } else if (props.status === "In Progress") {
    status = "End";
  } else if (props.status === "Completed") {
    status = "Completed";
  } else if (props.status === "On Hold") {
    status = "Hold";
  } else if (props.status === "N/A") {
    status = "N/A";
  } else {
    status = "Start";
  }

  useEffect(() => {
    setArr(props.teamMembers);
  }, [props.teamMembers]);

  // function formatDate(dateString) {
  //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // }

  return (
    <>
      <Badge.Ribbon
        text={
          <div>
            <MdOutlineStarBorder /> {props.status}
          </div>
        }
        color={
          status === "Completed"
            ? "#34c38f"
            : status === "End"
            ? "#f1b44c"
            : status === "Hold"
            ? "#f46a6a"
            : status === "N/A"
            ? "#50a5f1"
            : "#59a5ed"
        }
      >
        <div className="project-wrapper shadow mb-4">
          <div className="project-header-wrapper">
            <h3>{props.title}</h3>
            {/* <button className="btn-status"><MdOutlineStarBorder/> {props.status}</button> */}
          </div>
          <div className="project-body-wrapper">
            <div className="project-detail-wrapper">
              <div className="d-flex align-items-center gap-2"> <h6>Project Manager: </h6><p>{props.projectManagerFirstName}{" "}
                {props.projectManagerLastName}</p></div>
              <h6>
                Team Members:
                <ul>
                  {arr.map((value, i) => (
                    <li key={i}>
                      <p>{value.firstName}</p>
                    </li>
                  ))}
                </ul>
              </h6>
              <p>{props.desc}</p>
              <div className="project-date-wrapper">
                <h6>Start Date: </h6><p>{props.startDate}</p>
                <h6>End Date: </h6><p>{props.endDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Badge.Ribbon>
    </>
  );
};

export default ProjectContainer;
