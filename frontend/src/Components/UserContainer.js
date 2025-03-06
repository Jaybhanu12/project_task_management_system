import { Modal, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const { confirm } = Modal;

const UserContainer = (props) => {
  const [editUser, setEditUser] = useState(false);

  const [selecteRole, setSelectedRole] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const token = JSON.parse(localStorage.getItem("token"));



  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  });

 useEffect(()=>{
    setData(props);
    setSelectedRole(props.role);
 },[])

  const { firstName, lastName, email, phone, id ,role} = data;

  const options = [{
    value:"Team Member",
    lable:"Team Member"
  },
  {
    value:"Admin",
    lable:"Admin"
  },
  {
    value:"Project Manager",
    lable:"Project Manager"
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
      title: "Are you sure to DELETE user?",
      icon: <ExclamationCircleFilled />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete( `${process.env.REACT_APP_HOST_URL}/users/deleteUser/${id}`,
          {
            headers: { Authorization: token },
          })
          .then((res) => {
            console.log(res.data.message);
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

  const handleEditUser = (e) => {
    e.preventDefault();

    // const data = 

     axios.patch(`${process.env.REACT_APP_HOST_URL}/users/updateUser/${id}`,
     {
        firstName,
        lastName,
        email,
        role : selecteRole
    } , {
            headers: { Authorization: token },
          })
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


  const handleUser = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value });
  }

    // console.log(data);

  return (
    <>
      {contextHolder}
      <div className="user-container-wrapper">
        <div className="user-inner-wrapper">
          <div className="data-wrapper">
            <h6>ID</h6>
            <p>{id}</p>
          </div>
          <div className="data-wrapper">
            <h6>First Name</h6>
            <p>{firstName}</p>
          </div>
          <div className="data-wrapper">
            <h6>Last Name</h6>
            <p>{lastName}</p>
          </div>
          <div className="data-wrapper">
            <h6>Email</h6>
            <p>{email}</p>
          </div>
          <div className="data-wrapper">
            <h6>Role</h6>
            <p>{selecteRole}</p>
          </div>
        </div>
        <div className="edit-option">
          <button className="btn" onClick={() => setEditUser(true)}>
            <MdOutlineEdit className="edit-icons" />
          </button>
          <Modal
            title="Edit User*"
            centered
            open={editUser}
            onOk={() => setEditUser(false)}
            onCancel={() => setEditUser(false)}
            footer={false}
          >
            <form className="add-form-wrapper mt-2" onSubmit={handleEditUser}>
              <div className="d-flex flex-column align-items-end gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={firstName} onChange={handleUser}/>
                </div>
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={lastName} onChange={handleUser}/>
                </div>
                <div className="d-flex flex-column align-items-start gap-1 w-100">
                  <label>Email</label>
                  <input type="email" name="email" value={email} onChange={handleUser}/>
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
                    options=
                    {options.map((item) => ({
                      value: item.value,
                      label: item.lable,
                    }))}
                  />
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

export default UserContainer;
