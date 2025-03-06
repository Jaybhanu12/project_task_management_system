import { DatePicker, Modal, Select, TimePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import dayjs from "dayjs";

const format = "HH:mm";

const { confirm } = Modal;

const AdminTaskContainer = (props) => {

  const [selecteRole, setSelectedRole] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const [taskmodal, setTaskModal] = useState(false);

  const [selectedAssignUser, setSelectedAssignUser] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState([]);

  const [startDate, setStartDate] = useState([]);

  const [duetime, setDueTime] = useState([]);

  const [data, setData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    assignedDate: "",
    dueTime: "",
    createdBy: "",
    startTime: "",
    endTime: "",
  });

  const { userId, userFullName } = props.assignedTo;
  const { projectId, projectTitle } = props.project;

//   console.log(_id);
//   console.log(fullName);

useEffect(() => {
    setData(props);
    setSelectedProjectId({
      value: projectId,
      label: projectTitle,
    });
    setStartDate(props.assignedDate);
    setDueTime(props.dueTime);
    setSelectedAssignUser({
      value: userId,
      label: userFullName,
    });
    setSelectedRole(props.status);
  }, []);

  const {
    title,
    description,
    status,
    assignedTo,
    assignedDate,
    dueTime,
    project,
    id,
    createdBy,
    startTime,
    endTime,
  } = data;


  const options = [{
    value:"Completed",
    lable:"Completed"
  },
  {
    value:"In Progress",
    lable:"In Progress"
  },
  {
    value:"On Hold",
    lable:"On Hold"
  },
  {
    value:"N/A",
    lable:"N/A"
  }
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
          .delete(`${process.env.REACT_APP_HOST_URL}/tasks/deleteTask/${id}`, {
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
        `${process.env.REACT_APP_HOST_URL}/tasks/updateTask/${id}`,
        {
            title,
            description ,
            assignedTo: selectedAssignUser.value || selectedAssignUser,
            project: selectedProjectId.value || selectedProjectId,
            assignedDate: new Date(startDate).toLocaleString(), // Use toISOString() to convert date to string
            dueTime: duetime,
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
      <div className="task-container-wrapper">
        <div className="task-inner-wrapper">
          <div className="data-wrapper">
            <h6>Title</h6>
            <p>{title}</p>
          </div>
          <div className="data-wrapper">
            <h6>Project Name</h6>
            <p>{projectTitle}</p>
          </div>
          <div className="data-wrapper">
            <h6>Assign To</h6>
            <p>{userFullName}</p>
          </div>
          <div className="data-wrapper">
            <h6>Assign Date</h6>
            <p>{assignedDate}</p>
          </div>
          <div className="data-wrapper">
            <h6>Due Time</h6>
            <p>{dueTime}</p>
          </div>
          <div className="data-wrapper">
            <h6>Created By</h6>
            <p>{createdBy}</p>
          </div>
          <div className="data-wrapper">
            <h6>Status</h6>
            <p>{status}</p>
          </div>
        </div>
        <div className="edit-option">
          <button className="btn" onClick={() => setTaskModal(true)}>
            <MdOutlineEdit className="edit-icons" />
          </button>
          <Modal
            title="Edit Task*"
            centered
            open={taskmodal}
            onOk={() => setTaskModal(false)}
            onCancel={() => setTaskModal(false)}
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
                  <label>Assign To</label>
                  <Select
                    placeholder="Select User"
                    value={selectedAssignUser}
                    onChange={setSelectedAssignUser}
                    style={{
                      width: "100%",
                    }}
                    options={props.user.map((item) => ({
                      value: item._id,
                      label: `${item.firstName} ${item.lastName}`,
                    }))}
                  />
                </div>
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>Project</label>
                  <Select
                    // mode="multiple"
                    placeholder="Select Project"
                    value={selectedProjectId}
                    onChange={setSelectedProjectId}
                    style={{
                      width: "100%",
                    }}
                    options={props.projects.map((item) => ({
                      value: item._id,
                      label: item.title,
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
                    <label>Assign Date</label>
                    <DatePicker
                      defaultValue={dayjs(startDate)}
                      onChange={(date, dateString) => setStartDate(dateString)}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Due Time</label>
                    {/* <TimePicker onChange={setDueTime} format={format} /> */}
                    <TimePicker
                      //    value={duetime}
                      defaultValue={dayjs(duetime, format)}
                      onChange={(time, timeString) => setDueTime(timeString)}
                      format={format}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Start Time</label>
                    {/* <TimePicker onChange={setDueTime} format={format} /> */}
                    <TimePicker
                        //  value={duetime}
                      defaultValue={dayjs(startTime, format)}
                      // onChange={(time, timeString) => setDueTime(timeString)}
                      format={format}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>End Time</label>
                    {/* <TimePicker onChange={setDueTime} format={format} /> */}
                    <TimePicker
                        //  value={duetime}
                      defaultValue={dayjs(endTime, format)}
                      // onChange={(time, timeString) => setDueTime(timeString)}
                      format={format}
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

export default AdminTaskContainer;
