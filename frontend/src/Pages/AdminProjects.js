import { DatePicker, Empty, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { RiSearchEyeFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import AdminProjectContainer from '../Components/AdminProjectContainer';

const AdminProjects = () => {

  const token = JSON.parse(localStorage.getItem("token"));

  const [searchBar, setSearchBar] = useState();

  const [project,setProjects] = useState([]);

  const [projectmodal, setProjectModal] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [selectedTeamM, setSelectedTeamM] = useState([]);

  const [selecteProjectM, setSelectedProjectM] = useState([]);

  const [startDate, setStartDate] = useState([]);

  const [endDate, setEndDate] = useState([]);

  const [user, setUser] = useState([]);


  const handleSearchBar = (e) => {
    setSearchBar(e.target.value);
  };

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
      error(err.response.data.message)
    });
}, [`${process.env.REACT_APP_HOST_URL}/projects/getAllProjectforAdmin`]);


const handleSubmit = (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const description = e.target.description.value;


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



  const filterSearch = project.filter((value) => {
    const isSerach =
      !searchBar ||
      (value.title &&
        value.title.toLowerCase().includes(searchBar.toLowerCase()));
    return isSerach;
  });

  const filteredTeamOptions = user.filter((o) => o.role == "Team Member");

  const filteredProjectOptions = user.filter(
    (o) => o.role == "Project Manager"
  );



  return (
    <>
    {contextHolder}
       <section className='admin-main-wrapper'>
    <div className='container'>
         <div className=' admin-projects-wrapper shadow'>
         <div className="admin-header">
              <h5>Projects</h5>
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
                          // mode="multiple"
                          placeholder="Select Project Manager"
                          value={selecteProjectM}
                          onChange={setSelectedProjectM}
                          style={{
                            width: "100%",
                          }}
                          options={filteredProjectOptions.map((item) => ({
                            value: item._id,
                            label: item.firstName + " " + item.lastName,
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
                          style={{
                            width: "100%",
                          }}
                          options={filteredTeamOptions.map((item) => ({
                            value: item._id,
                            label: item.firstName + " " + item.lastName,
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
                  <AdminProjectContainer
                    key={i}
                    id= {value._id}
                    title= {value.title}
                     projectManager={{
                      projectMId: value.projectManager._id,
                      projectMName: `${value.projectManager.firstName} ${value.projectManager.lastName}`
                    }}
                    teamMembers={value.teamMembers}
                    description={value.description}
                    startDate= {value.startDate}
                    endDate= {value.endDate}
                    status= {value.status}
                    filteredTeamOptions={filteredTeamOptions}
                    filteredProjectOptions={filteredProjectOptions}
                    userToken={token}
                  />
                ))
              ) : (
                <Empty />
              )}
              
            </div>
        </div>    
    </div>
      </section>
    </>
  )
}

export default AdminProjects
