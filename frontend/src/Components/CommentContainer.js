import { Avatar, Button, Empty, Form, Input, Modal, message } from "antd";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";

const CommentContainer = (props) => {
  const [commentModal, setCommentModal] = useState(false);

  const [reply, setReply] = useState(props.replies);

  const [show, setShow] = useState(false);

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

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const reply = e.target.reply.value;


    // console.log({
    //  reply,
    //   comment: props.commentId,
    // })

    axios.post(`${process.env.REACT_APP_HOST_URL}/comments/createReply`,{
      reply,
      comment: props.commentId,
    }, {
              headers: {
              Authorization: props.userToken // Set the Authorization header with the token
              }
      })
    .then((res) => {
      // console.log(res.data.data);
      success(res.data.message);
      // doLogin(res.data.accessToken);
      // navigate("/user/dashboard");
    })
    .catch((err) => {
      // console.log(err.response.data.message);
      error(err.response.data.message);
    });


  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_HOST_URL}/comments/getAllComment`
  //       , {
  //         headers: {
  //           Authorization: props.userToken // Set the Authorization header with the token
  //         }
  //       }
  //     )
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       // setFilterComment(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [`${process.env.REACT_APP_HOST_URL}/comments/getAllComment`]);

  //     const getData = reply.map((v,i)=>{
  //        return v.reply
  //     })

  // console.log(props);

  return (
    <>
    {contextHolder}
      <div className="comment-wrapper shadow mb-4">
        <div className="comment-header-wrapper">
          {/* <img src='../Images/profile2.jpg' alt='profile.jpg'/> */}
          <h3>{props.taskTitle}</h3>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <p>{new Date(props.time).toLocaleString()}</p>
            <button
              className="btn-pencil"
              onClick={() => setCommentModal(true)}
            >
              <BsReply className="icon-add" />
            </button>
            <Modal
              title={
                <div className="modal-title">
                  {props.firstname} {props.lastname}
                </div>
              }
              centered
              open={commentModal}
              onOk={() => setCommentModal(false)}
              onCancel={() => setCommentModal(false)}
              footer={false}
            >
                <form className="add-form-wrapper mt-2" onSubmit={handleSubmitReply}>
                    <div className="d-flex flex-column align-items-end gap-3 w-100">
                      <div className="d-flex flex-column align-items-start gap-1 w-100">
                        <label>Reply</label>
                        <textarea type="text" name="reply" />
                      </div>
                      <div>
                        <button type="submit" className="btn-add">Add</button>
                      </div>
                    </div>
                  </form>
            </Modal>
          </div>
        </div>
        <div className="comment-body-wrapper">
          <div className="comment-detail-wrapper">
            {/* <h6>Task Id: {props.taskId}</h6> */}
            <p>{props.desc}</p>
          </div>
          <div className="comment-conner">
            {/* <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
      <Avatar style={{ backgroundColor: '#c52a2a' }}>A</Avatar>
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Avatar style={{ backgroundColor: '#1677ff' }} >N</Avatar>
      <Avatar style={{ backgroundColor: '#1677ff' }} >L</Avatar>
      </Avatar.Group> */}
            <button
              className={`btn-view-comments ${!show ? "border-bottom" : ""}`}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "View"} Reply
            </button>
          </div>
        </div>
        <div
          className="comment-view-wrapper"
          id="commentBox"
          style={{ display: show ? "block" : "none" }}
        >
          {/* <div className='d-flex justify-content-start align-items-center gap-2 mb-3'>
         <h6>Comments</h6>
          <p>289</p>
         </div> */}
          {/* {
          reply.map((value,i)=>(
            <div className='mb-2' key={i}>
          <h6>{value.replyBy.firstName} {value.replyBy.lastName}</h6>
          <p>Team Member</p>
          <div className='d-flex justify-content-between align-items-end' >
           <p>
           {value.reply}
           </p>
           <p>{new Date(value.createdAt).toLocaleString()}</p>
          </div>
         </div>
          ))
         } */}

          {reply.length > 0 ? (
            reply.map((value, i) => (
              <div className="mb-2" key={i}>
                <h6>
                  {value.replyBy.firstName} {value.replyBy.lastName}
                </h6>
                {/* <p>Team Member</p> */}
                <div className="d-flex justify-content-between align-items-end">
                  <p>{value.reply}</p>
                  <p>{new Date(value.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentContainer;
