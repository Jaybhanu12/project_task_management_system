import React, { useEffect, useState } from "react";
import { RiSearchEyeFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TaskContainer from "../Components/TaskContainer";
import ProjectContainer from "../Components/ProjectContainer";
import CommentContainer from "../Components/CommentContainer";
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const format = "HH:mm";

const Dashboard = () => {
  const [selectOption, setSelectOption] = useState("All");

  const [selectProjectOption, setSelectProjectOption] = useState("By status");

  const [selectPendingTaskOption, setPendingTaskSelectOption] = useState("All");

  const [selectCompletedTaskOption, setCompletedTaskSelectOption] = useState("All");

  const [selectCommentOption, setSelectCommentOption] = useState("Newest");

  const [searchBar, setSearchBar] = useState();

  const [projectmodal, setProjectModal] = useState(false);

  const [taskmodal, setTaskModal] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [filterComment, setFilterComment] = useState([]);

  const [pending, setPending] = useState([]);

  const [completed, setCompleted] = useState([]);

  const [user, setUser] = useState([]);

  const [startDate, setStartDate] = useState([]);

  const [dueTime, setDueTime] = useState([]);

  const [endDate, setEndDate] = useState([]);

  const [selectedTeamM, setSelectedTeamM] = useState([]);

  const [selecteProjectM, setSelectedProjectM] = useState([]);

  const [selectedAssignUser, setSelectedAssignUser] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const [userRole, setUserRole] = useState(null);
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const error = (err) => {
    messageApi.open({
      type: 'error',
      content: err,
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };

  //get Task
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/tasks/getTodaysTask`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setTasks(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //  get Project
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/projects/getAllProject`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/projects/getAllProject`]);

  //get pendding task
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/pendingTask/getAllPendingTask`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        //  console.log(res.data.data);
        setPending(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/pendingTask/getAllPendingTask`]);

  //get completed task
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST_URL}/completedTask/getAllCompletedTask`,
        {
          headers: {
            Authorization: token, // Set the Authorization header with the token
          },
        }
      )
      .then((res) => {
        //  console.log(res.data.data);
        setCompleted(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/completedTask/getAllCompletedTask`]);

  //get comment
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/comments/getAllComment`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setFilterComment(res.data.data);

      })
      .catch((err) => {
        console.error(err);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/comments/getAllComment`]);

  // console.log(tasks);
  // const tasks = [
  //   {
  //     title: "Create CRUD Api using Nodejs",
  //     desc: "this is a sample description on project",
  //     projectName: "Jay ",
  //     time: "10:00 am",
  //     status: "Completed",
  //   },
  //   {
  //     title: "Nodejs 2",
  //     desc: "this is a sample description",
  //     projectName: "Jay ",
  //     time: "10:00 am",
  //     status: "N/A",
  //   },
  //   {
  //     title: "CRUD Api 3",
  //     desc: "this is a sample ",
  //     projectName: "Jay ",
  //     time: "10:00 am",
  //     status: "N/A",
  //   },
  //   {
  //     title: "Testing Bugs",
  //     desc: "this is a sample ",
  //     projectName: "Jay ",
  //     time: "10:00 am",
  //     status: "N/A",
  //   },
  // ];

  // const projects = [
  //   {
  //     title: "Create CRUD Api using Nodejs",
  //     projectManager: "Jay ",
  //     TeamMembers: "Jay ",
  //     desc: "this is a sample description on project",
  //     startDate: "10/02/2024",
  //     EndDate: "15/02/2024",
  //     status: "N/A",
  //   },
  //   {
  //     title: "Stock Trading Backend Api",
  //     projectManager: "Jay ",
  //     TeamMembers: "Jay ",
  //     desc: "this is a sample description on project",
  //     startDate: "10/02/2024",
  //     EndDate: "15/02/2024",
  //     status: "N/A",
  //   },
  // ];

  const token = JSON.parse(localStorage.getItem("token"));

  // const comments = [
  //   {
  //     username: "Jay ",
  //     projectId: "Rest API Backend Project",
  //     desc: "this is a Comment description on Task",
  //     time: "2024-02-27T06:13:44.224+00:00",
  //   },
  //   {
  //     username: "Ved Sarfare",
  //     projectId: "Backend Project",
  //     desc: "this is a Comment description on Task",
  //     time: "2024-02-21T06:13:44.224+00:00",
  //   },
  //   {
  //     username: "Atul Jogale",
  //     projectId: "Backend Api Project",
  //     desc: "this is a Comment description on Task",
  //     time: "2024-01-10T06:13:44.224+00:00",
  //   },
  // ];

  // const pending = [
  //   {
  //     title: "Nodejs 2",
  //     desc: "this is a sample description",
  //     projectName: "Jay ",
  //     time: "10:00 am",
  //     status: "In Progress",
  //   },
  // ];

  // const all = [...tasks, ...projects, ...comments, ...pending];

  const handleTaskSelect = (e) => {
    setSelectOption(e.target.value);
  };

  const filterTaskSelect = tasks.filter((value) => {
    const isStatusMatch =
      selectOption === "All" || value.status === selectOption;

    // Second, check for the search bar filter
    const isSearchMatch =
      !searchBar ||
      (value.title &&
        value.title.toLowerCase().includes(searchBar.toLowerCase()));

    // Return true only if both filters match
    return isStatusMatch && isSearchMatch;
  });

  const handleProjectSelect = (e) => {
    setSelectProjectOption(e.target.value);
  };

  const filterProjectSelect = projects.filter((value) => {
    const isStatusMatch =
      selectProjectOption === "By status" ||
      value.status === selectProjectOption;

    // Second, check for the search bar filter
    const isSearchMatch =
      !searchBar ||
      (value.title &&
        value.title.toLowerCase().includes(searchBar.toLowerCase()));

    // Return true only if both filters match
    return isStatusMatch && isSearchMatch;
  });

  const handlePendingTaskSelect = (e) => {
    setPendingTaskSelectOption(e.target.value);
  };

  const filterPendingTaskSelect = pending.filter((value) => {
    const isStatusMatch =
      selectPendingTaskOption === "All" ||
      value.task.status === selectPendingTaskOption;

    // Second, check for the search bar filter
    const isSearchMatch =
      !searchBar ||
      (value.title &&
        value.title.toLowerCase().includes(searchBar.toLowerCase()));

    // Return true only if both filters match
    return isStatusMatch && isSearchMatch;
  });

  const handleCompletedTaskSelect = (e) => {
    setCompletedTaskSelectOption(e.target.value);
  };

  const filterCompletedTaskSelect = completed.filter((value) => {
    const isStatusMatch =
      selectCompletedTaskOption === "All" ||
      value.task.status === selectCompletedTaskOption;

    // Second, check for the search bar filter
    const isSearchMatch =
      !searchBar ||
      (value.title &&
        value.title.toLowerCase().includes(searchBar.toLowerCase()));

    // Return true only if both filters match
    return isStatusMatch && isSearchMatch;
  });

  const handleCommentSelect = (e) => {
    // const selectedOption = e.target.value;
    setSelectCommentOption(e.target.value);
  };

  useEffect(() => {
    // Update filterComment when selectCommentOption changes
    let updatedFilterComment = [...filterComment];

    if (selectCommentOption === "Oldest") {
      updatedFilterComment.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (selectCommentOption === "Newest") {
      updatedFilterComment.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    // console.log(updatedFilterComment);

    setFilterComment(updatedFilterComment);
  }, [selectCommentOption]);

  const handleSearchBar = (e) => {
    setSearchBar(e.target.value);
  };

  // useEffect(()=>{
  // axios.get(`${process.env.REACT_APP_HOST_URL}/tasks/getTodaysTask`,{
  //   headers:{ Authorization: token}
  // })
  // .then((res)=>{
  //    console.log(res.data.data);
  //    setTasks(res.data.data);
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })

  // },[])
  // Fetch the current user and their role
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/users/getCurrentUser`, {
        headers: {
          Authorization: token, // Make sure token is available or passed
        },
      })
      .then((res) => {
        // Log the full response for debugging

        // Assuming response.data.data contains the user data and role
        const currentUser = res.data.data.role;

        // Set user data or role in state
        setUserRole(currentUser); // You can choose to store the whole user or just the role
        console.log(userRole);
      })
      .catch((err) => {
        console.error('Error fetching current user data:', err);
      });
  }, []);

  // get User
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
      });
  }, [`${process.env.REACT_APP_HOST_URL}/users/getAllUser`]);

  // let options = [];

  const filteredTeamOptions = user.filter((o) => o.role == "Team Member");
  const filteredProjectOptions = user.filter(
    (o) => o.role == "Project Manager"
  );
  // const filteredUsersOptions = user.filter((o) => o );
  // const filteredProjectIdOptions = user.filter((o) => o.role == "Project Manager" );

  // console.log(filteredTeamOptions);

  // const options = [
  //   {
  //     label: 'China',
  //     value: 'china',
  //     emoji: '🇨🇳',
  //     desc: 'China (中国)',
  //   },
  //   {
  //     label: 'USA',
  //     value: 'usa',
  //     emoji: '🇺🇸',
  //     desc: 'USA (美国)',
  //   },
  //   {
  //     label: 'Japan',
  //     value: 'japan',
  //     emoji: '🇯🇵',
  //     desc: 'Japan (日本)',
  //   },
  //   {
  //     label: 'Korea',
  //     value: 'korea',
  //     emoji: '🇰🇷',
  //     desc: 'Korea (韩国)',
  //   },
  // ];

  // useEffect(() => {
  //   user.map((value) => {
  //     if (value.role === "Project Manager") {
  //       setProjectManager(value);
  //     }
  //     if (value.role === "Team Member") {
  //       // console.log(value);
  //       setTeamMember(value);
  //     }
  //   });
  // });

  // }, [user]);

  // console.log(teamMember);

  //get comment

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_HOST_URL}/comments/getAllComment`
  //       // , {
  //       //   headers: {
  //       //     Authorization: token // Set the Authorization header with the token
  //       //   }
  //       // }
  //     )
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       setFilterComment(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [`${process.env.REACT_APP_HOST_URL}/comments/getAllComment`]);

  // const formItemLayout = {
  //   labelCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 7,
  //     },
  //   },
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 16,
  //     },
  //   },
  // };

  // console.log(projects);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    // console.log(
    //   {
    //   title,
    //   description,
    //   teamMembers: selectedTeamM,
    //   projectManager: selecteProjectM,
    //   startDate: new Date(startDate), // Use toISOString() to convert date to string
    //   endDate: new Date(endDate),
    // }
    // )

    axios
      .post(
        `${process.env.REACT_APP_HOST_URL}/projects/createProject`,
        {
          title,
          description,
          teamMembers: selectedTeamM,
          projectManager: selecteProjectM,
          startDate: new Date(startDate).toLocaleString(), // Use toISOString() to convert date to string
          endDate: new Date(endDate).toLocaleString(),
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
        // doLogin(res.data.accessToken);
        // navigate("/user/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        error(err.response.data.message);
      });
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    // console.log({
    //   title,
    //   description,
    //   assignedTo: selectedAssignUser,
    //   project: selectedProjectId,
    //   assignedDate: new Date(startDate).toLocaleString(), // Use toISOString() to convert date to string
    //   dueTime: dueTime,
    // });

    axios.post(`${process.env.REACT_APP_HOST_URL}/tasks/createTask`, {
      title,
      description,
      assignedTo: selectedAssignUser,
      project: selectedProjectId,
      assignedDate: new Date(startDate).toLocaleString(), // Use toISOString() to convert date to string
      dueTime: dueTime,
    }, {
      headers: {
        Authorization: token // Set the Authorization header with the token
      }
    })
      .then((res) => {
        // console.log(res.data);
        success(res.data.message);

        // doLogin(res.data.accessToken);
        // navigate("/user/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        error(err.response.data.message);
      });
  };


  return (
    <>
      <section className="main-wrapper">
        {contextHolder}
        <div className="container-xxl">
          <div className="main-inner-wrapper">
            <div className="dashboard-wrapper shadow">
              <div className="top-header-wrapper">
                {/* Conditionally show "Add Project" button for admin and project manager */}
                {(userRole === 'Admin' || userRole === 'Project Manager') && (
                  <>
                    <button
                      className="btn-project"
                      onClick={() => setProjectModal(true)}
                    >
                      <MdAdd className="add-icon" />
                      Add Project
                    </button>
                    <Modal
                      title="Add Project*"
                      centered
                      open={projectmodal}
                      onOk={() => setProjectModal(false)}
                      onCancel={() => setProjectModal(false)}
                      footer={false}
                    >
                      <form
                        className="add-form-wrapper mt-2"
                        onSubmit={handleSubmit}
                      >
                        <div className="d-flex flex-column align-items-end gap-3 w-100">
                          <div className="d-flex flex-column align-items-start gap-1 w-100">
                            <label>Title</label>
                            <input type="text" name="title" />
                          </div>
                          <div className="d-flex flex-column align-items-start gap-1 w-100">
                            <label>Project Manager</label>
                            <Select
                              placeholder="Select Project Manager"
                              value={selecteProjectM}
                              onChange={setSelectedProjectM}
                              style={{ width: '100%' }}
                              options={filteredProjectOptions.map((item) => ({
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
                              value={selectedTeamM}
                              onChange={setSelectedTeamM}
                              style={{ width: '100%' }} 
                              options={filteredTeamOptions.map((item) => ({
                                value: item._id,
                                label: `${item.firstName} ${item.lastName}`,
                              }))}
                            />
                          </div>
                          <div className="d-flex flex-column align-items-start gap-1 w-100">
                            <label>Description</label>
                            <textarea type="text" name="description" />
                          </div>
                          <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                            <div className="d-flex flex-column align-items-start gap-1 w-100">
                              <label>Start Date</label>
                              <DatePicker onChange={setStartDate} />
                            </div>
                            <div className="d-flex flex-column align-items-start gap-1 w-100">
                              <label>End Date</label>
                              <DatePicker onChange={setEndDate} />
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
                  </>
                )}

                {/* Conditionally show "Add Task" button for admin and project manager */}
                {(userRole === 'Admin' || userRole === 'Project Manager') && (
                  <>
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
                              placeholder="Select User"
                              value={selectedAssignUser}
                              onChange={setSelectedAssignUser}
                              style={{ width: '100%' }}
                              options={user.map((item) => ({
                                value: item._id,
                                label: `${item.firstName} ${item.lastName}`,
                              }))}
                            />
                          </div>
                          <div className="d-flex flex-column align-items-start gap-1 w-100">
                            <label>Project</label>
                            <Select
                              placeholder="Select Project"
                              value={selectedProjectId}
                              onChange={setSelectedProjectId}
                              style={{ width: '100%' }}
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
                              <TimePicker
                                onChange={(time, timeString) => setDueTime(timeString)}
                                format="HH:mm"
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
                  </>
                )}

                <div className="search-bar-wrapper">
                  <form>
                    <input
                      type="search"
                      className="search-bar"
                      placeholder="Search Project"
                      onChange={handleSearchBar}
                    />
                    <button className="btn-search">
                      <RiSearchEyeFill className="search-icon" />
                    </button>
                  </form>
                </div>
              </div>

              <div className="tab-header-wrapper">
                <Tabs
                  defaultActiveKey="task"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="task" title="Today's Task">
                    <div className="content-wrapper">
                      <div className="content-header-wrapper">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={selectOption}
                          onChange={handleTaskSelect}
                        >
                          <option value="All">All</option>
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </div>
                      <div className="content-body-wrapper">
                        {filterTaskSelect.length > 0 ? (
                          filterTaskSelect.map((value, i) => (
                            <TaskContainer
                              key={i}
                              taskId={value._id}
                              title={value.title}
                              desc={value.description}
                              projectName={value.project.title}
                              time={value.dueTime}
                              status={value.status}
                              startTime={value.startTime}
                              endTime={value.endTime}
                              userToken={token}
                            />
                          ))
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="projects" title="Projects">
                    <div className="content-wrapper">
                      <div className="content-header-wrapper">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={selectProjectOption}
                          onChange={handleProjectSelect}
                        >
                          <option value="By status">By status</option>
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </div>
                      <div className="content-body-wrapper">
                        {filterProjectSelect.length > 0 ? (
                          filterProjectSelect.map((value, i) => (
                            <ProjectContainer
                              key={i}
                              title={value.title}
                              desc={value.description}
                              projectManagerFirstName={
                                value.projectManager.firstName
                              } // Assuming firstName is always available
                              projectManagerLastName={
                                value.projectManager.lastName
                              }
                              startDate={value.startDate}
                              endDate={value.endDate}
                              teamMembers={value.teamMembers}
                              status={value.status}
                              userToken={token}
                            />
                          ))
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="pendings" title="Pending Tasks">
                    <div className="content-wrapper">
                      <div className="content-header-wrapper">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={selectPendingTaskOption}
                          onChange={handlePendingTaskSelect}
                        >
                          <option value="All">All</option>
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </div>
                      <div className="content-body-wrapper">
                        {filterPendingTaskSelect.length > 0 ? (
                          filterPendingTaskSelect.map((value, i) => (
                            <TaskContainer
                              key={i}
                              taskId={value.task._id}
                              title={value.task.title}
                              desc={value.task.description}
                              projectId={value.task.project}
                              time={value.task.dueTime}
                              status={value.task.status}
                              userToken={token}
                              startTime={value.task.startTime}
                              endTime={value.task.endTime}
                            />
                          ))
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="completed" title="Completed Tasks">
                    <div className="content-wrapper">
                      <div className="content-header-wrapper">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={selectCompletedTaskOption}
                          onChange={handleCompletedTaskSelect}
                        >
                          <option value="All">All</option>
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="On Hold">On Hold</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </div>
                      <div className="content-body-wrapper">
                        {filterCompletedTaskSelect.length > 0 ? (
                          filterCompletedTaskSelect.map((value, i) => (
                            <TaskContainer
                              key={i}
                              taskId={value.task._id}
                              title={value.task.title}
                              desc={value.task.description}
                              projectId={value.task.project}
                              time={value.task.dueTime}
                              status={value.task.status}
                              userToken={token}
                              startTime={value.task.startTime}
                              endTime={value.task.endTime}
                            />
                          ))
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="comments" title="Comments">
                    <div className="content-wrapper">
                      <div className="content-header-wrapper">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={selectCommentOption}
                          onChange={handleCommentSelect}
                        >
                          <option value="Newest">Newest</option>
                          <option value="Oldest">Oldest</option>
                        </select>
                      </div>
                      <div className="content-body-wrapper">
                        {filterComment.length > 0 ? (
                          filterComment.map((value, i) => (
                            <CommentContainer
                              key={i}
                              commentId={value._id}
                              firstname={value.commentby.firstName}
                              lastname={value.commentby.lastName}
                              desc={value.content}
                              taskTitle={value.task.title}
                              taskId={value.task._id}
                              time={value.createdAt}
                              userToken={token}
                              replies={value.replies}
                            />
                          ))
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
