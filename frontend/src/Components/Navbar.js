import { Tooltip, message } from "antd";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import axios from "axios";
import { doLogout } from "../Auth/Auth";

const { confirm } = Modal;

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState("Profile");
  const [messageApi, contextHolder] = message.useMessage();

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

  const token = JSON.parse(localStorage.getItem("token"));

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure to Logout?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
         
        axios.post(`${process.env.REACT_APP_HOST_URL}/users/logoutUser`,{}, {
          headers: { Authorization: token },
        })
        .then((res)=>{
             console.log(res.data.message);
             success(res.data.message);
             doLogout();
             navigate("/");
        })
        .catch((err)=>{
          // console.log(err?.message)
          error(err.response.data.message);
        })
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };


  return (
    <>
    {contextHolder}
      <div className="navbar-wrapper shadow">
        <div className="container-xxl">
          <div className="navbar-inner-wrapper">
            <h3>
              <img className="logo" src="../Images/logo1.png" />
              TaskTracker
            </h3>
            <div className="profile-corner">
            {location.pathname === "/user/profile" ? (
                <Tooltip placement="bottom" title={"Home"}>
                  <Link
                    to="/user/dashboard"
                    onClick={() => setShow("Profile")}
                    className="nav-icon-btn"
                  >
                    <h6>
                      <MdHome className="nav-icon" />
                    </h6>
                  </Link>
                </Tooltip>
              ) : (
                <Link
                  to="/user/profile"
                  onClick={() => setShow("Home")}
                  className="nav-icon-btn"
                >
                  <h6>
                    Welcome! <FaUserCircle className="nav-icon" />
                  </h6>
                </Link>
              )}
              <Tooltip placement="bottom" title={"Logout"}>
                <button className="nav-icon-btn" onClick={showDeleteConfirm}>
                  <MdLogout className="nav-icon" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
