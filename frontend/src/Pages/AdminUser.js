import React, { useEffect, useState } from "react";
import { RiSearchEyeFill } from "react-icons/ri";
import UserContainer from "../Components/UserContainer";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { Empty, Modal, Select, message } from "antd";
import Password from "antd/es/input/Password";

const AdminUser = () => {
  const [searchBar, setSearchBar] = useState();

  const [user, setUser] = useState([]);

  const [userModal, setUserModal] = useState(false);

  const [selecteRole, setSelectedRole] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const token = JSON.parse(localStorage.getItem("token"));

  const options = [
    {
      value: "Team Member",
      lable: "Team Member",
    },
    {
      value: "Admin",
      lable: "Admin",
    },
    {
      value: "Project Manager",
      lable: "Project Manager",
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

  const handleSearchBar = (e) => {
    setSearchBar(e.target.value);
  };

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
        error(err.response.data.message);
      });
  }, [`${process.env.REACT_APP_HOST_URL}/users/getAllUser`]);

  const filterSearch = user.filter((value) => {
    const isSerach =
      !searchBar ||
      (value.firstName &&
        value.firstName.toLowerCase().includes(searchBar.toLowerCase()));
    return isSerach;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const role = selecteRole;
    const password = e.target.password.value;

    axios
      .post(
        `${process.env.REACT_APP_HOST_URL}/users/createUser`,
        {
          firstName,
          lastName,
          email,
          role,
          password,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        success(res.data.message);
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  return (
    <>
      {contextHolder}
      <section className="admin-main-wrapper">
        <div className="container">
          <div className=" admin-user-wrapper shadow">
            <div className="admin-header">
              <h5>Users</h5>
              <button
                className="btn-project"
                onClick={() => setUserModal(true)}
              >
                <MdAdd className="add-icon" />
                Add User
              </button>
              <Modal
                title="Add User*"
                centered
                open={userModal}
                onOk={() => setUserModal(false)}
                onCancel={() => setUserModal(false)}
                footer={false}
              >
                <form className="add-form-wrapper mt-2" onSubmit={handleSubmit}>
                  <div className="d-flex flex-column align-items-end gap-3 w-100">
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>First Name</label>
                      <input type="text" name="firstName" />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Last Name</label>
                      <input type="text" name="lastName" />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Email</label>
                      <input type="email" name="email" />
                    </div>

                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Role</label>
                      <Select
                        // mode="multiple"
                        placeholder="Select Role"
                        name="role"
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
                    <div className="d-flex flex-column align-items-start gap-1 w-100">
                      <label>Password</label>
                      <input type="password" name="password" />
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
                  <UserContainer
                    key={i}
                    id={value._id}
                    firstName={value.firstName}
                    lastName={value.lastName}
                    email={value.email}
                    role={value.role}
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
  );
};

export default AdminUser;
