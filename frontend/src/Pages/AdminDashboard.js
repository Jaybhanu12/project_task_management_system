import React, { useEffect, useState } from 'react'
import CountContainer from '../Components/CountContainer'
import axios from 'axios'
import { message } from 'antd';

const AdminDashboard = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const token = JSON.parse(localStorage.getItem("token"));

  const [data,setData] = useState([]);

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



useEffect(()=>{


axios.get(`${process.env.REACT_APP_HOST_URL}/users/adminOverview`,
{
  headers: { Authorization: token },
}).then((res) => {
  // console.log(res.data.data);
  setData(res.data.data);
})
.catch((err) => {
  // console.log(error.message);

  error(err.response.data.message);
});
  
},[])


  return (
    <>
    {contextHolder}
      <section className='admin-main-wrapper'>
            <div className='container'>
                 <div className=' admin-dashboard-wrapper shadow'>
                    <div className='d-flex flex-column align-items-center'>
                         <h3>Overview</h3>
                         <img src='../Images/overview.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-5'>
                       <CountContainer count={data.userCount} type="Users"/>
                       <CountContainer count={data.taskCount} type="Tasks" />
                       <CountContainer count={data.projectCount} type="Projects" />
                    </div>
                </div>    
            </div>
      </section>
    </>
  )
}

export default AdminDashboard
