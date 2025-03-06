import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { DatePicker, Modal, Select, TimePicker, message } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import dayjs from "dayjs";

const format = "HH:mm";
const { confirm } = Modal;

const AdminProjectContainer = (props) => {
  const [projectModal, setProjectModal] = useState(false);

  const [selecteRole, setSelectedRole] = useState([]);

  const [selecteProjectM, setSelectedProjectM] = useState([]);

  const [selecteTeamM, setSelectedTeamM] = useState([]);

  const [startDate, setStartDate] = useState([]);

  const [endDate, setEndDate] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  

  const [data, setData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const { projectMId, projectMName } = props.projectManager;
  // const { teamMId, teamMName } = props.teamMembers;

  useEffect(() => {
    setData(props);

    // setStartDate(props.assignedDate);
    // setDueTime(props.dueTime);
    setSelectedProjectM({
      value: projectMId,
      label: projectMName,
    });
    setSelectedRole(props.status);

    const mappedTeamMembers = props.teamMembers.map((value) => ({
      value: value._id,
      label: `${value.firstName} ${value.lastName}`,
    }));

    // Set the selecteTeamM state with the accumulated array
    setSelectedTeamM(mappedTeamMembers);
    setStartDate(props.startDate);
    setEndDate(props.endDate);


  }, []);


  const {
    title,
    status,
    description,
    id,
  } = data;

  const options = [
    {
      value: "Completed",
      lable: "Completed",
    },
    {
      value: "In Progress",
      lable: "In Progress",
    },
    {
      value: "On Hold",
      lable: "On Hold",
    },
    {
      value: "N/A",
      lable: "N/A",
    },
  ];

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (err) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure to DELETE Task?",
      icon: <ExclamationCircleFilled />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete(`${process.env.REACT_APP_HOST_URL}/projects/deleteProject/${id}`, {
            headers: { Authorization: props.userToken },
          })
          .then((res) => {
            // console.log(res.data.message);
            success(res.data.message);
          })
          .catch((err) => {
            // console.log(err?.message)
            error(err.response.data.message);
          });
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    // const data =

    axios
      .patch(
        `${process.env.REACT_APP_HOST_URL}/projects/updateProject/${id}`,
        {
          title,
          description,
          projectManager: selecteProjectM.value || selecteProjectM,
          teamMembers: selecteTeamM.map((item) => item.value ? item.value : item),
          startDate: new Date(startDate).toLocaleString(), // Use toISOString() to convert date to string
          endDate: new Date(endDate).toLocaleString(),
          status: selecteRole
        },
        {
          headers: { Authorization: props.userToken },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        // setEditMode(false);
        // if (!res) {
        //   danger("Something Went Wrong");
        // }
        success(res.data.message);
        // window.location.reload();
      })
      .catch((err) => {
        // console.log(error.message);
        // danger(error?.message);
        error(err.response.data.message);
      });

  };

  const handleUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      {contextHolder}
      <div className="project-container-wrapper">
        <div className="project-inner-wrapper">
          <div className="data-wrapper">
            <h6>Title</h6>
            <p>{title}</p>
          </div>
          <div className="data-wrapper">
            <h6>Project Manager</h6>
            <p>{projectMName}</p>
          </div>
          <div className="data-wrapper">
            <h6>Team Members</h6>
           
              <ul>
                {props.teamMembers.map((value, i) => (
                   <li key={i}>
                   <p>{value.firstName} {value.lastName}</p>
                 </li>
                ))}
              </ul>
  
          </div>
          <div className="data-wrapper">
            <h6>Start Date</h6>
            <p>{startDate}</p>
          </div>
          <div className="data-wrapper">
            <h6>End Date</h6>
            <p>{endDate}</p>
          </div>
          <div className="data-wrapper">
            <h6>Status</h6>
            <p>{status}</p>
          </div>
        </div>
        <div className="edit-option">
          <button className="btn" onClick={() => setProjectModal(true)}>
            <MdOutlineEdit className="edit-icons" />
          </button>
          <Modal
            title="Edit Task*"
            centered
            open={projectModal}
            onOk={() => setProjectModal(false)}
            onCancel={() => setProjectModal(false)}
            footer={false}
          >
            <form className="add-form-wrapper mt-2" onSubmit={handleEditTask}>
              <div className="d-flex flex-column align-items-end gap-3 w-100">
                <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleUser}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Status</label>
                    <Select
                      placeholder="Select Status"
                      value={selecteRole}
                      onChange={setSelectedRole}
                      style={{
                        width: "100%",
                      }}
                      options={options.map((item) => ({
                        value: item.value,
                        label: item.lable,
                      }))}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>Project Manager</label>
                  <Select
                    // mode="multiple"
                    placeholder="Select Project Manager"
                    value={selecteProjectM}
                    onChange={setSelectedProjectM}
                    style={{
                      width: "100%",
                    }}
                    options={props.filteredProjectOptions.map((item) => ({
                      value: item._id,
                      label: `${item.firstName} ${item.lastName}`,
                    }))}
                  />
                </div>
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>Team Members</label>
                  <Select
                    mode="multiple"
                    placeholder="Select Team Members"
                    value={selecteTeamM}
                    onChange={setSelectedTeamM}
                    style={{
                      width: "100%",
                    }}
                    options={props.filteredTeamOptions.map((item) => ({
                      value: item._id,
                      label: `${item.firstName} ${item.lastName}`,
                    }))}
                  />
                </div>
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleUser}
                  />
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Start Date</label>
                    <DatePicker
                      defaultValue={dayjs(startDate)}
                      onChange={(date, dateString) => setStartDate(dateString)}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>End Date</label>
                    <DatePicker
                      defaultValue={dayjs(endDate)}
                      onChange={(date, dateString) => setEndDate(dateString)}
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn-add">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </Modal>
          <button className="btn">
            {" "}
            <MdOutlineRemoveRedEye className="edit-icons" />
          </button>
          <button className="btn" onClick={showDeleteConfirm}>
            {" "}
            <MdOutlineDeleteOutline className="edit-icons" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProjectContainer;
