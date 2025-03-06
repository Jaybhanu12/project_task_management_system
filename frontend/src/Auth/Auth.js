export const isLoggin = () => {
  let token = localStorage.getItem("token");
  if (token !== null) return true;
  else return false;
};


export const doLogin =(data)=>{
    localStorage.setItem("token",JSON.stringify(data))
}


export const doLogout =()=>{
    localStorage.removeItem("token");
}