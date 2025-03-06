import React, { useEffect, useState } from "react";
import { MdOutlineStarBorder } from "react-icons/md";
import { BiStopwatch } from "react-icons/bi";
import { Badge, Modal, Tooltip, message } from "antd";
import axios from "axios";
import { MdAddComment } from "react-icons/md";


const TaskContainer = (props) => {
  let status = "";

  const [project, setProject] = useState("");
  const [commentModal, setCommentModal] = useState(false);
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


  if (props.status === "N/A") {
    status = "Start";
  } else if (props.status === "In Progress") {
    status = "End";
  } else if (props.status === "Completed") {
    status = "Completed";
  } else if (props.status === "On Hold") {
    status = "Hold";
  } else if (props.status === "N/A") {
    status = "N/A";
  } else {
    status = "Start";
  }

  const [task, setTask] = useState(status);

  const handleTaskClick = () => {
    // console.log(props.taskId);
    if (task === "Start") {

      axios.get(`${process.env.REACT_APP_HOST_URL}/tasks/startToggle/${props.taskId}`,
        {
          headers: {
            Authorization: props.userToken, // Set the Authorization header with the token
          },
        }
      )
        .then((res) => {
          console.log(res.data);
          // setProject(res.data.data.title);
        })
        .catch((err) => {
          console.error(err);
        });

      setTask("End");
    } else if (task === "End") {

      axios.get(`${process.env.REACT_APP_HOST_URL}/tasks/completedToggle/${props.taskId}`,
        {
          headers: {
            Authorization: props.userToken, // Set the Authorization header with the token
          },
        }
      )
        .then((res) => {
          console.log(res.data);
          // setProject(res.data.data.title);
        })
        .catch((err) => {
          console.error(err);
        });
      setTask("Completed");
    } else if (task === "Hold") {
      setTask("Hold");
    } else {
      setTask("Start");
    }
  };

  // const displayEditWrapper = ()=>{

  //   const edit = document.getElementById("edit");

  //   edit.style.display = "block";
  //   edit.style.transition = "3s all ease-in"

  //   }

  //get project by Id
  useEffect(() => {
    if (props.projectId) {
      axios
        .get(
          `${process.env.REACT_APP_HOST_URL}/projects/getProject/${props.projectId}`,
          {
            headers: {
              Authorization: props.userToken, // Set the Authorization header with the token
            },
          }
        )
        .then((res) => {
          // console.log(res.data.data.title);
          setProject(res.data.data.title);
          console.log(project)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [
    `${process.env.REACT_APP_HOST_URL}/projects/getProject/${props.projectId}`,
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    const content = e.target.content.value;


    axios.post(`${process.env.REACT_APP_HOST_URL}/comments/createComment`, {
      content,
      task: props.taskId,
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
        // console.log(err);
        error(err.response.data.message);
      });



  }




  return (
    <>
      {contextHolder}
      <Badge.Ribbon
        text={
          <div>
            <MdOutlineStarBorder /> {props.status}
          </div>
        }
        color={
          status === "Completed"
            ? "#34c38f"
            : status === "End"
              ? "#f1b44c"
              : status === "Hold"
                ? "#f46a6a"
                : status === "N/A"
                  ? "#50a5f1"
                  : "#59a5ed"
        }
      >
        <div className="task-wrapper shadow mb-4">
          <div className="task-header-wrapper">
            <h3>{props.title}</h3>
            {/* <button
              className="btn-status"
              style={{
                backgroundColor:
                  status === "Completed"
                    ? "#9397ff"
                    : status === "End"
                    ? "#ffd8e8"
                    : status === "Hold"
                    ? "#f5be59"
                    : status === "N/A"
                    ? "lightgreen"
                    : "#59a5ed",
              }}
            >
             
            </button> */}
          </div>
          <div className="task-body-wrapper">
            <Tooltip placement="top" title={"Add comment"}>
              <button
                className="btn-pencil"
                onClick={() => setCommentModal(true)}
              >
                <MdAddComment className="icon-add" />
              </button>
            </Tooltip>
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
              <form className="add-form-wrapper mt-2" onSubmit={handleSubmitComment}>
                <div className="d-flex flex-column align-items-end gap-3 w-100">
                  <div className="d-flex flex-column align-items-start gap-1 w-100">
                    <label>Comment Box</label>
                    <textarea type="text" name="content" />
                  </div>
                  <div>
                    <button type="submit" className="btn-add">Add</button>
                  </div>
                </div>
              </form>
            </Modal>
            <div className="task-detail-wrapper">
              <div className="d-flex align-items-center gap-2"> <h6> Project Name:  </h6> <p>{props.projectName} {project}</p></div>
              <div className="d-flex align-items-center gap-2"><h6>Due Time: </h6><p>{props.time}</p></div>
              <p>{props.desc}</p>
              <div className="task-date-wrapper">
                <h6>Start Time: </h6><p>{props.startTime}</p>
                <h6>End Time: </h6><p>{props.endTime}</p>
              </div>
            </div>
            <button
              className="btn-start"
              style={{
                backgroundColor:
                  task === "Completed"
                    ? "#f1b44c"
                    : task === "End"
                      ? "#f46a6a"
                      : "#34c38f",
              }}
              onClick={handleTaskClick}
              disabled={task === "Completed"}
            >
              <BiStopwatch />{" "}
              {task === "Completed"
                ? "Completed task"
                : task === "End"
                  ? "End task"
                  : task === "Hold"
                    ? "On Hold"
                    : "Start Task"}
            </button>
          </div>
        </div>
      </Badge.Ribbon>
    </>
  );
};

export default TaskContainer;
