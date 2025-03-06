import React from 'react'
import { IoGridOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, message } from 'antd';
import { doLogout } from '../Auth/Auth';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const AdminNavbar = () => {

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

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
       <div className='side-navbar-wrapper'>
           <div className='d-flex flex-column justify-content-between align-items-center w-100 h-100'> 
             <div className='d-flex flex-column gap-4' >
             <div>
             <h3>
              <img className="logo" src="../Images/logo1.png" />
              TaskTracker
            </h3>
             </div>
             <div className='d-flex flex-column align-items-center gap-3'>
                {/* <Link className='btn-side-nav'><IoGridOutline className='side-icons'/> Overview</Link>
                <Link className='btn-side-nav'><IoPersonOutline  className='side-icons'/> Users</Link>
                <Link className='btn-side-nav'><IoIosStarOutline  className='side-icons'/> Projects</Link>
                <Link className='btn-side-nav'><IoCalendarClearOutline className='side-icons'/> Tasks</Link> */}

               <Link to='/admin/dashboard'><div className='side-button'>
                <IoGridOutline className='side-icons'/>
                <h5>Overview</h5>
                </div></Link>

                <Link to='/admin/users'><div className='side-button'>
                <IoPersonOutline className='side-icons'/>
                <h5>Users</h5>
                </div></Link>

                <Link to='/admin/projects'><div className='side-button'>
                <IoIosStarOutline className='side-icons'/>
                <h5>Projects</h5>
                </div></Link>

                <Link to='/admin/tasks'><div className='side-button'>
                <IoCalendarClearOutline className='side-icons'/>
                <h5>Tasks</h5>
                </div></Link>
             </div>
             </div>
             <div>
              <div className='side-button' onClick={showDeleteConfirm}>
                <MdLogout className='side-icons'/>
                <h5>Logout</h5>
                </div>
           </div>
           </div>
           
       </div>
    </>
  )
}

export default AdminNavbar
