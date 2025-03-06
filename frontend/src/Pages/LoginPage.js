// // import axios from "axios";
// // import React from "react";
// // import { doLogin } from "../Auth/Auth";
// // import { useNavigate } from "react-router-dom";
// // // Formik Validation
// // import * as Yup from "yup";
// // import { useFormik } from "formik";

// // const LoginPage = () => {

// //   const navigate = useNavigate();


// //   // const handleSubmit = (e) => {
// //   //   e.preventDefault();

// //   //   const email = e.target.email.value;
// //   //   const password = e.target.password.value;
// //   //   const role = e.target.role.value;

// //   //   axios.post(`${process.env.REACT_APP_HOST_URL}/users/loginUser`, {
// //   //       email,
// //   //       password,
// //   //       role,
// //   //     })
// //   //     .then((res) => {
// //   //       // console.log(res.data.role);
// //   //       doLogin(res.data.accessToken);

// //   //       if(res.data.role === "Admin"){
// //   //         navigate("/admin/dashboard");
// //   //       }else{
// //   //         navigate("/user/dashboard");
// //   //       }
        
// //   //     })
// //   //     .catch((err) => {
// //   //       console.log(err);
// //   //     });
// //   // };

  
// //   const validation = useFormik({

// //     initialValues:{
// //         email:"",
// //         password:"",
// //         role:""
// //     },
// //     validationSchema:Yup.object({
// //       email: Yup.string().required("Required?"),
// //       password: Yup.string().required("Required?").min(6, 'Too Short!'),
// //       role: Yup.string().required("Required?")
// //     }),
// //     onSubmit:(value)=>{

// //       // console.log(value)

// //     const email = value.email;
// //     const password = value.password;
// //     const role = value.role;

// //     axios.post(`${process.env.REACT_APP_HOST_URL}/users/loginUser`, {
// //         email,
// //         password,
// //         role,
// //       })
// //       .then((res) => {
// //         // console.log(res.data.role);
// //         doLogin(res.data.accessToken);

// //         if(res.data.role === "Admin"){
// //           navigate("/admin/dashboard");
// //         }else{
// //           navigate("/user/dashboard");
// //         }
        
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });

// //      }

// //   })



// //   return (
// //     <>
// //       <div className="login-main-wrapper">
// //        <div className="bg-layer">
// //        <div className="login-inner-wrapper shadow">
// //           <div className="login-logo">
// //             <h3>
// //               <img className="logo" src="../Images/logo1.png" alt="" />
// //               TaskTracker
// //             </h3>
// //             <p>&copy; {new Date().getFullYear()} Created by SE team</p>
// //           </div>
// //           <div className="login-details">
// //             <form onSubmit={(e)=>{
// //                         e.preventDefault();
// //                         validation.handleSubmit();
// //                         return false;
// //                       }}>
// //               <div className="form-wrapper">
// //               <div className="d-flex flex-column align-items-end">
// //               {validation.touched.email && validation.errors.email ? (
// //                       <div className="error-message">{validation.errors.email}</div>
// //                         ) : null}
// //                 <div className="form-inner-wrapper">
// //                   <label style={{paddingRight: "28px"}}>
// //                     Email
// //                   </label> 
// //                   <input type="email" name="email"  placeholder="" value={validation.values.email || ""} onChange={validation.handleChange} onBlur={validation.handleBlur} />
// //                   </div>
// //                 </div>
// //                 <div className="d-flex flex-column align-items-end">
// //                   {validation.touched.password && validation.errors.password ? (
// //                       <div className="error-message">{validation.errors.password}</div>
// //                         ) : null}
// //                 <div className="form-inner-wrapper">
// //                   <label>
// //                     Password
// //                   </label>
                  
// //                   <input type="password" name="password" placeholder="" value={validation.values.password || ""} onChange={validation.handleChange} onBlur={validation.handleBlur}/>
// //                   </div>
// //                 </div>
// //                 <div className="d-flex flex-column align-items-center">
// //                 <div className="radio-main-wrapper">
// //                   <div class="form-check">
// //                     <input
// //                       class="form-check-input"
// //                       type="radio"
// //                       name="role"
// //                       id="flexRadioDefault1"
// //                       value="Admin"
// //                       onChange={validation.handleChange}
// //                       onBlur={validation.handleBlur}
// //                     />
// //                     <label class="form-check-label" for="flexRadioDefault1">
// //                       Admin
// //                     </label>
// //                   </div>
// //                   <div class="form-check">
// //                     <input
// //                       class="form-check-input"
// //                       type="radio"
// //                       name="role"
// //                       id="flexRadioDefault1"
// //                       value="Project Manager"
// //                       onChange={validation.handleChange}
// //                       onBlur={validation.handleBlur}
// //                     />
// //                     <label class="form-check-label" for="flexRadioDefault1">
// //                       Project Manager
// //                     </label>
// //                   </div>
// //                   <div class="form-check">
// //                     <input
// //                       class="form-check-input"
// //                       type="radio"
// //                       name="role"
// //                       id="flexRadioDefault1"
// //                       value="Team Member"
// //                       onChange={validation.handleChange}
// //                       onBlur={validation.handleBlur}
// //                     />
// //                     <label class="form-check-label" for="flexRadioDefault1">
// //                       Team Member
// //                     </label>
// //                   </div>
// //                   </div>
// //                   {validation.touched.role && validation.errors.role ? (
// //                       <div className="error-message">{validation.errors.role}</div>
// //                         ) : null}
               

// //                 </div>
// //                 <button type="submit" className="login-btn">
// //                   Submit
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //        </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default LoginPage;











// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import { doLogin } from "../Auth/Auth";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup form

//   // Form validation for Login
//   const loginValidation = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       role: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Required?"),
//       password: Yup.string().required("Required?").min(6, 'Too Short!'),
//       role: Yup.string().required("Required?"),
//     }),
//     onSubmit: (values) => {
//       const { email, password, role } = values;

//       axios
//         .post(`${process.env.REACT_APP_HOST_URL}/users/loginUser`, {
//           email,
//           password,
//           role,
//         })
//         .then((res) => {
//           doLogin(res.data.accessToken);

//           if (res.data.role === "Admin") {
//             navigate("/admin/dashboard");
//           } else {
//             navigate("/user/dashboard");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   });

//   // Form validation for Signup
//   const signupValidation = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       role: "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("Required?"),
//       lastName: Yup.string().required("Required?"),
//       email: Yup.string().required("Required?"),
//       password: Yup.string().required("Required?").min(6, 'Too Short!'),
//       role: Yup.string().required("Required?"),
//     }),
//     onSubmit: (values) => {
//       const { firstName, lastName, email, password, role } = values;

//       axios
//         .post(`${process.env.REACT_APP_HOST_URL}/users/createUser`, {
//           firstName,
//           lastName,
//           email,
//           password,
//           role,
//         })
//         .then((res) => {
//           console.log("Signup successful", res.data);
//           setIsSignup(false); // Switch to login page after signup
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   });

//   return (
//     <div className="login-main-wrapper">
//       <div className="bg-layer">
//         <div className="login-inner-wrapper shadow">
//           <div className="login-logo">
//             <h3>
//               <img className="logo" src="../Images/logo1.png" alt="" />
//               TaskTracker
//             </h3>
//             <p>&copy; {new Date().getFullYear()} Created by SE team</p>
//           </div>
//           <div className="login-details">
//             {/* Toggle between Login and Signup */}
//             {isSignup ? (
//               <form onSubmit={(e) => {
//                   e.preventDefault();
//                   signupValidation.handleSubmit();
//                   return false;
//                 }}>
//                 <div className="form-wrapper">
//                   <div className="d-flex flex-column align-items-end">
//                     {signupValidation.touched.firstName && signupValidation.errors.firstName && (
//                       <div className="error-message">{signupValidation.errors.firstName}</div>
//                     )}
//                     <div className="form-inner-wrapper">
//                       <label>First Name</label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={signupValidation.values.firstName}
//                         onChange={signupValidation.handleChange}
//                         onBlur={signupValidation.handleBlur}
//                       />
//                     </div>
//                   </div>
//                   <div className="d-flex flex-column align-items-end">
//                     {signupValidation.touched.lastName && signupValidation.errors.lastName && (
//                       <div className="error-message">{signupValidation.errors.lastName}</div>
//                     )}
//                     <div className="form-inner-wrapper">
//                       <label>Last Name</label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={signupValidation.values.lastName}
//                         onChange={signupValidation.handleChange}
//                         onBlur={signupValidation.handleBlur}
//                       />
//                     </div>
//                   </div>
//                   <div className="d-flex flex-column align-items-end">
//                     {signupValidation.touched.email && signupValidation.errors.email && (
//                       <div className="error-message">{signupValidation.errors.email}</div>
//                     )}
//                     <div className="form-inner-wrapper">
//                       <label>Email</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={signupValidation.values.email}
//                         onChange={signupValidation.handleChange}
//                         onBlur={signupValidation.handleBlur}
//                       />
//                     </div>
//                   </div>
//                   <div className="d-flex flex-column align-items-end">
//                     {signupValidation.touched.password && signupValidation.errors.password && (
//                       <div className="error-message">{signupValidation.errors.password}</div>
//                     )}
//                     <div className="form-inner-wrapper">
//                       <label>Password</label>
//                       <input
//                         type="password"
//                         name="password"
//                         value={signupValidation.values.password}
//                         onChange={signupValidation.handleChange}
//                         onBlur={signupValidation.handleBlur}
//                       />
//                     </div>
//                   </div>
//                   <div className="d-flex flex-column align-items-center">
//                     {signupValidation.touched.role && signupValidation.errors.role && (
//                       <div className="error-message">{signupValidation.errors.role}</div>
//                     )}
//                     <div className="radio-main-wrapper">
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="role"
//                           value="Admin"
//                           onChange={signupValidation.handleChange}
//                           onBlur={signupValidation.handleBlur}
//                         />
//                         <label className="form-check-label">Admin</label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="role"
//                           value="Project Manager"
//                           onChange={signupValidation.handleChange}
//                           onBlur={signupValidation.handleBlur}
//                         />
//                         <label className="form-check-label">Project Manager</label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="role"
//                           value="Team Member"
//                           onChange={signupValidation.handleChange}
//                           onBlur={signupValidation.handleBlur}
//                         />
//                         <label className="form-check-label">Team Member</label>
//                       </div>
//                     </div>
//                   </div>
//                   <button type="submit" className="login-btn">Sign Up</button>
//                 </div>
//               </form>
//             ) : (
//               <form onSubmit={(e) => {
//                   e.preventDefault();
//                   loginValidation.handleSubmit();
//                   return false;
//                 }}>
//                 <div className="form-wrapper">
//                   <div className="d-flex flex-column align-items-end">
//                     {loginValidation.touched.email && loginValidation.errors.email && (
//                       <div className="error-message">{loginValidation.errors.email}</div>
//                     )}
//                     <div className="form-inner-wrapper">
//                       <label>Email</label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={loginValidation.values.email}
//                         onChange={loginValidation.handleChange}
//                         onBlur={loginValidation.handleBlur}
//                       />
//                     </div>
//                   </div>
//                   <div className="d-flex flex-column align-items-end">
//                     {loginValidation.touched.password && loginValidation.errors.password && (
//                       <div className="error-message">{loginValidation.errors.password}</div>
//                     )}
//                     <div className="form-inner-wrapper">
//                       <label>Password</label>
//                       <input
//                         type="password"
//                         name="password"
//                         value={loginValidation.values.password}
//                         onChange={loginValidation.handleChange}
//                         onBlur={loginValidation.handleBlur}
//                       />
//                     </div>
//                   </div>
//                   <div className="d-flex flex-column align-items-center">
//                     <div className="radio-main-wrapper">
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="role"
//                           value="Admin"
//                           onChange={loginValidation.handleChange}
//                           onBlur={loginValidation.handleBlur}
//                         />
//                         <label className="form-check-label">Admin</label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="role"
//                           value="Project Manager"
//                           onChange={loginValidation.handleChange}
//                           onBlur={loginValidation.handleBlur}
//                         />
//                         <label className="form-check-label">Project Manager</label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="role"
//                           value="Team Member"
//                           onChange={loginValidation.handleChange}
//                           onBlur={loginValidation.handleBlur}
//                         />
//                         <label className="form-check-label">Team Member</label>
//                       </div>
//                     </div>
//                   </div>
//                   <button type="submit" className="login-btn">Login</button>
//                 </div>
//               </form>
//             )}

//             {/* Toggle between Login and Signup */}
//           </div>
//             <div className="toggle-auth-wrapper justify-content-end" style={{width: "100%",textAlign: "right"}}>
//               <span className="text-right" onClick={() => setIsSignup(!isSignup)}>
//                 {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
//               </span>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { doLogin } from "../Auth/Auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup form

  // Form validation for Login
  const loginValidation = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required?"),
      password: Yup.string().required("Required?").min(6, 'Too Short!'),
      role: Yup.string().required("Required?"),
    }),
    onSubmit: (values) => {
      const { email, password, role } = values;

      axios
        .post(`${process.env.REACT_APP_HOST_URL}/users/loginUser`, {
          email,
          password,
          role,
        })
        .then((res) => {
          doLogin(res.data.accessToken);

          if (res.data.role === "Admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  // Form validation for Signup
  const signupValidation = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required?"),
      lastName: Yup.string().required("Required?"),
      email: Yup.string().required("Required?"),
      password: Yup.string().required("Required?").min(6, 'Too Short!'),
      role: Yup.string().required("Required?"),
    }),
    onSubmit: (values) => {
      const { firstName, lastName, email, password, role } = values;

      axios
        .post(`${process.env.REACT_APP_HOST_URL}/users/createUser`, {
          firstName,
          lastName,
          email,
          password,
          role,
        })
        .then((res) => {
          console.log("Signup successful", res.data);
          setIsSignup(false); // Switch to login page after signup
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <div className="login-main-wrapper">
        <div className="bg-layer">
          <div className="login-inner-wrapper shadow">
            <div className="login-logo">
              <h3>
                <img className="logo" src="../Images/logo1.png" alt="" />
                TaskTracker
              </h3>
              <p>&copy; {new Date().getFullYear()} Created by SE team</p>
            </div>
            <div className="login-details">
              {/* Toggle between Login and Signup */}
              {isSignup ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    signupValidation.handleSubmit();
                    return false;
                  }}
                >
                  <div className="form-wrapper">
                    <div className="d-flex flex-column align-items-end">
                      {signupValidation.touched.firstName &&
                      signupValidation.errors.firstName ? (
                        <div className="error-message">
                          {signupValidation.errors.firstName}
                        </div>
                      ) : null}
                      <div className="form-inner-wrapper">
                        <label style={{ paddingRight: "0px" }}>
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder=""
                          value={signupValidation.values.firstName || ""}
                          onChange={signupValidation.handleChange}
                          onBlur={signupValidation.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      {signupValidation.touched.lastName &&
                      signupValidation.errors.lastName ? (
                        <div className="error-message">
                          {signupValidation.errors.lastName}
                        </div>
                      ) : null}
                      <div className="form-inner-wrapper">
                        <label style={{ paddingRight: "0px" }}>
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder=""
                          value={signupValidation.values.lastName || ""}
                          onChange={signupValidation.handleChange}
                          onBlur={signupValidation.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      {signupValidation.touched.email &&
                      signupValidation.errors.email ? (
                        <div className="error-message">
                          {signupValidation.errors.email}
                        </div>
                      ) : null}
                      <div className="form-inner-wrapper">
                        <label style={{ paddingRight: "28px" }}>Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder=""
                          value={signupValidation.values.email || ""}
                          onChange={signupValidation.handleChange}
                          onBlur={signupValidation.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      {signupValidation.touched.password &&
                      signupValidation.errors.password ? (
                        <div className="error-message">
                          {signupValidation.errors.password}
                        </div>
                      ) : null}
                      <div className="form-inner-wrapper">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder=""
                          value={signupValidation.values.password || ""}
                          onChange={signupValidation.handleChange}
                          onBlur={signupValidation.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      {signupValidation.touched.role &&
                      signupValidation.errors.role ? (
                        <div className="error-message">
                          {signupValidation.errors.role}
                        </div>
                      ) : null}
                      <div className="radio-main-wrapper">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="Admin"
                            onChange={signupValidation.handleChange}
                            onBlur={signupValidation.handleBlur}
                          />
                          <label className="form-check-label">Admin</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="Project Manager"
                            onChange={signupValidation.handleChange}
                            onBlur={signupValidation.handleBlur}
                          />
                          <label className="form-check-label">
                            Project Manager
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="Team Member"
                            onChange={signupValidation.handleChange}
                            onBlur={signupValidation.handleBlur}
                          />
                          <label className="form-check-label">Team Member</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="login-btn">
                      Sign Up
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loginValidation.handleSubmit();
                    return false;
                  }}
                >
                  <div className="form-wrapper">
                    <div className="d-flex flex-column align-items-end">
                      {loginValidation.touched.email &&
                      loginValidation.errors.email ? (
                        <div className="error-message">
                          {loginValidation.errors.email}
                        </div>
                      ) : null}
                      <div className="form-inner-wrapper">
                        <label style={{ paddingRight: "28px" }}>Email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder=""
                          value={loginValidation.values.email || ""}
                          onChange={loginValidation.handleChange}
                          onBlur={loginValidation.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      {loginValidation.touched.password &&
                      loginValidation.errors.password ? (
                        <div className="error-message">
                          {loginValidation.errors.password}
                        </div>
                      ) : null}
                      <div className="form-inner-wrapper">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder=""
                          value={loginValidation.values.password || ""}
                          onChange={loginValidation.handleChange}
                          onBlur={loginValidation.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="radio-main-wrapper">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="Admin"
                            onChange={loginValidation.handleChange}
                            onBlur={loginValidation.handleBlur}
                          />
                          <label className="form-check-label">Admin</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="Project Manager"
                            onChange={loginValidation.handleChange}
                            onBlur={loginValidation.handleBlur}
                          />
                          <label className="form-check-label">
                            Project Manager
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="Team Member"
                            onChange={loginValidation.handleChange}
                            onBlur={loginValidation.handleBlur}
                          />
                          <label className="form-check-label">Team Member</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                  </div>
                </form>
              )}

              {/* Toggle between Login and Signup */}
            </div>
              <div className="toggle-auth-wrapper" style={{cursor: "pointer"}}>
                <span onClick={() => setIsSignup(!isSignup)}>
                  {isSignup
                    ? "Already have an account? Login"
                    : "Don't have an account? Signup"}
                </span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
