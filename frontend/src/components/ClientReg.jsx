import { useState } from "react";
import "../styles/Freelancer.css"
import axios from 'axios'//axios
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function ClientReg() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError]= useState(null);
  const navigate=useNavigate();
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError(null);
  };


  const [visible , setVisibility]=useState(false)
  const [client, setClient] = useState({
    UserName: "",
    Email: "",
    password: ""
  });

  function changeClient(event) {
    const { name, value } = event.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();
    console.log(client);
    // setClient({
    //   UserName: "",
    //   Email: "",
    //   password: ""
    // });
    await axiosInstance.post("/client/signup",{client}).then((res)=>{
      if(res.data.error==false)
      {
        const response = res.data.demouser;
        console.log(res.data.demoUser);
        setError(res.data.message)
        localStorage.setItem("token", res.data.accessToken);
        navigate("/profileClient",{ state:response})
        console.log("POST request send sucessfully");
        console.log(error)
        return;
      }
      
    }).catch((err)=>{
      if (err.response && error.response.data && error.response.data.message) {
        setError(err.response.data.message);
        console.log(error);
    } else {
        setError("An unexpected error occurred. Please try again.");
        console.log(error);
    }
    });
  }
  async function handleLogin(event){
    event.preventDefault();
    console.log(client);
    // setClient({
    //     Email: "",
    //     password: ""
    // })
    await axiosInstance.post("/client/login",{client}).then((res)=>{
      if(res.status===200 && res.data.error==false)
        {
          setError(res.data.message);
          localStorage.setItem("token", res.data.accessToken);
          navigate("/client")
          console.log(res.data)
          console.log("POST request send sucessfully");
        }
    }).catch((error)=>{
        // Handle login error
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("An unexpected error occurred. Please try again.");
            console.log(error);
        }
    });
  }
  function toggle(){
    setVisibility(!visible)
}

  return (
    <div id="form" className="min-h-screen flex flex-row items-center justify-center">
      <div className={`main ${error ? "max-h-[535px]" : "max-h-[495px]"}`}>
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="login">
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true" onClick={toggleForm}>
              Sign in
            </label>
            <input
              className="input ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-600 focus:shadow-lg"              
              type="email"
              name="Email"
              placeholder="Email"
              value={client.Email}
              onChange={changeClient}
              required=""
            />
            <input
              className="input ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-600 focus:shadow-lg"              
              type="password"
              name="password"
              placeholder="Password"
              value={client.password}
              onChange={changeClient}
              required=""
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button>Sign In</button>
          </form>
        </div>
        <div className="register">
          <form className="form" onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true" onClick={toggleForm}>
              Sign Up
            </label>
            <input
              className="input focus:ring-2 focus:ring-zinc-400 focus:shadow-lg" 
              type="text"
              name="UserName"
              id="id"
              placeholder="Username"
              required
              value={client.UserName}
            onChange={changeClient}
            />
            <input
              className="input focus:ring-2 focus:ring-zinc-400 focus:shadow-lg" 
              type="email"
              name="Email"
              id="email"
              placeholder="Email"
              required=""
              value={client.Email}
            onChange={changeClient}
            />
            <input
              className="input focus:ring-2 focus:ring-zinc-400 focus:shadow-lg" 
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required=""
              value={client.password}
            onChange={changeClient}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientReg;
