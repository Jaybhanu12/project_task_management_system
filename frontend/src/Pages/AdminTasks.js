import React, { useEffect, useState } from "react";
import { RiSearchEyeFill } from "react-icons/ri";
import UserContainer from "../Components/UserContainer";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { DatePicker, Empty, Modal, Select, TimePicker, message } from "antd";
import Password from "antd/es/input/Password";
import AdminTaskContainer from "../Components/AdminTaskContainer";

const format = "HH:mm";

const AdminTasks = () => {
  const [searchBar, setSearchBar] = useState();

  const [user, setUser] = useState([]);

  const [task, setTask] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const [taskmodal, setTaskModal] = useState(false);

  const [selectedAssignUser, setSelectedAssignUser] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState([]);

  const [startDate, setStartDate] = useState([]);

  const [dueTime, setDueTime] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  const [projects, setProjects] = useState([]);

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

  const handleSearchBar = (e) => {
    setSearchBar(e.target.value);
  };

  //get all user
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/users/getAllUser`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        // error(err.response.data.message);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/users/getAllUser`]);

  const handleSubmitTask = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    axios
      .post(
        `${process.env.REACT_APP_HOST_URL}/tasks/createTask`,
        {
          title,
          description,
          assignedTo: selectedAssignUser,
          project: selectedProjectId,
          assignedDate: new Date(startDate).toLocaleString(), // Use toISOString() to convert date to string
          dueTime: dueTime,
        },
        {
          headers: {
            Authorization: token, // Set the Authorization header with the token
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        error(err.response.data.message);
      });
  };

  //  get Project
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/projects/getAllProjectforAdmin`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => {
        // console.error(err);
        error(err.response.data.message);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/projects/getAllProjectforAdmin`]);

  //get all Task
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/tasks/getAllTask`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setTask(res.data.data);
      })
      .catch((err) => {
        // console.error(err);
        error(err.response.data.message);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/tasks/getAllTask`]);

  const filterSearch = task.filter((value) => {
    const isSerach =
      !searchBar ||
      (value.title &&
        value.title.toLowerCase().includes(searchBar.toLowerCase()));
    return isSerach;
  });

  return (
    <>
      {contextHolder}
      <section className="admin-main-wrapper">
        <div className="container">
          <div className=" admin-tasks-wrapper shadow">
            <div className="admin-header">
              <h5>Tasks</h5>
              <button
                className="btn-project"
                onClick={() => setTaskModal(true)}
              >
                <MdAdd className="add-icon" />
                Add Task
              </button>
              <Modal
                title="Add Task*"
                centered
                open={taskmodal}
                onOk={() => setTaskModal(false)}
                onCancel={() => setTaskModal(false)}
                footer={false}
              >
                <form
                  className="add-form-wrapper mt-2"
                  onSubmit={handleSubmitTask}
                >
                  <div className="d-flex flex-column align-items-end gap-3 w-100">
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Title</label>
                      <input type="text" name="title" />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Assign To</label>
                      <Select
                        // mode="multiple"
                        placeholder="Select User"
                        value={selectedAssignUser}
                        onChange={setSelectedAssignUser}
                        style={{
                          width: "100%",
                        }}
                        options={user.map((item) => ({
                          value: item._id,
                          label: item.firstName + " " + item.lastName,
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
                        options={projects.map((item) => ({
                          value: item._id,
                          label: item.title,
                        }))}
                      />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Description</label>
                      <textarea type="text" name="description" />
                    </div>
                    <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                      <div className="d-flex flex-column align-items-start gap-1 w-100">
                        <label>Assign Date</label>
                        <DatePicker onChange={setStartDate} />
                      </div>
                      <div className="d-flex flex-column align-items-start gap-1 w-100">
                        <label>Due Time</label>
                        {/* <TimePicker onChange={setDueTime} format={format} /> */}
                        <TimePicker
                          onChange={(time, timeString) =>
                            setDueTime(timeString)
                          }
                          format={format}
                        />
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="btn-add">
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </Modal>
              <div className="search-bar-wrapper">
                <form>
                  <input
                    type="search"
                    className="search-bar"
                    placeholder="Search User"
                    onChange={handleSearchBar}
                  />
                  <button className="btn-search">
                    <RiSearchEyeFill className="search-icon" />
                  </button>
                </form>
              </div>
            </div>
            <div className="d-flex flex-column gap-3">
              {filterSearch.length > 0 ? (
                filterSearch.map((value, i) => (
                  <AdminTaskContainer
                    key={i}
                    id={value._id}
                    title={value.title}
                    description={value.description}
                    assignedTo={{
                      userId: value.assignedTo._id,
                      userFullName: `${value.assignedTo.firstName} ${value.assignedTo.lastName}`,
                    }}
                    assignedDate={value.assignedDate}
                    project={{
                      projectId: value.project._id,
                      projectTitle: value.project.title,
                    }}
                    dueTime={value.dueTime}
                    status={value.status}
                    createdBy={
                      `${value.createdBy.firstName}` +
                      " " +
                      `${value.createdBy.lastName}`
                    }
                    startTime={value.startTime}
                    endTime={value.endTime}
                    userToken={token}
                    user={user}
                    projects={projects}
                  />
                ))
              ) : (
                <Empty/>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminTasks;
