import { Divider } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  // const [user, setUser] = useState([]);

  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [user, setUser] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const { firstName, lastName, email, phone, id } = data;

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/users/getCurrentUser`, {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEditProfile = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .patch(`${process.env.REACT_APP_HOST_URL}/users/updateUserProfile/${id}`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res.data.data);
        setEditMode(false);
        // if (!res) {
        //   danger("Something Went Wrong");
        // }
        // success(res.data.message);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
        // danger(error?.message);
      });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      <section className="main-wrapper">
        <div className="container profile-wrapper">
          <div className="left-profile-inner">
            <div className="profile-summary shadow">
              <div className="d-flex flex-column align-items-center gap-1">
                <img src="../Images/default.jpg" alt="" />
                <h4>
                  {user.firstName} {user.lastName}
                </h4>
                <p style={{ color: "rgba(0, 0, 0, 0.45)" }}>{user.role}</p>
              </div>
              <Divider />
              <div className="d-flex justify-content-start align-items-center gap-3">
                <MdEmail className="profile-icon" />
                <h6>{user.email}</h6>
              </div>
              <Divider />
              <div className="d-flex flex-column align-items-start gap-3">
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <button className="count-btn">{user.taskCount}</button>
                  <h6>
                    <span>My</span> tasks
                  </h6>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <button className="count-btn">{user.projectCount}</button>
                  <h6>
                    <span>My</span> projects
                  </h6>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <button className="count-btn">
                    {user.taskCollaboratorCount}
                  </button>
                  <h6>
                    <span>Task</span> collaborator
                  </h6>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <button className="count-btn">
                    {user.projectCollaboratorCount}
                  </button>
                  <h6>
                    <span>Project</span> collaborator
                  </h6>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-3">
                  <button className="count-btn">{user.commentsCount}</button>
                  <h6>
                    <span>Comments</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="right-profile-inner">
            <div className="profile-info shadow">
              <div className="d-flex flex-column align-items-start gap-2">
                <h6>
                  <span>Personal</span> infomation
                </h6>
                <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      name="firstName"
                      onChange={handleEditProfile}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      name="lastName"
                      onChange={handleEditProfile}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-start gap-2">
                <h6>
                  <span>Contact</span> infomation
                </h6>
                <div className="d-flex justify-content-start align-items-center gap-3 w-100">
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      value={phone}
                      name="phone"
                      onChange={handleEditProfile}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      name="email"
                      onChange={handleEditProfile}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-end gap-3 w-100">
                {editMode ? (
                  <>
                    <button className="btn-add" onClick={handleUpdate}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-add" onClick={handleEdit}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
