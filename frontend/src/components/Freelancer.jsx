import { useState } from "react";
import "../styles/Freelancer.css"
import axios from 'axios'//axios
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function FreelancerReg() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError]= useState(null);
  const navigate = useNavigate();
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError(null);
  };

  const [visible , setVisibility]=useState(false)
  const [Freelancer, setFreelancer] = useState({
    UserName: "",
    Email: "",
    password: ""
  });

  function changeFreelancer(event) {
    const { name, value } = event.target;
    setFreelancer(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const getUser = async ()=>{
    try{
      const response= await axiosInstance.get("/freelancer/getUser");
      return response.data;
      }catch(err){
        console.log(err);
      }
  }


  

  async function handleRegister(event) {
    event.preventDefault();
    console.log(Freelancer);
    setFreelancer({
      UserName: "",
      Email: "",
      password: ""
    });
    const res = await axiosInstance.post("/freelancer/signup",{Freelancer})
    
      if(res.status===200 && res.data.error==false)
        {
          //console.log(res);
          setError(res)
          localStorage.setItem("token", res.data.accessToken);
          const response = await getUser();
          console.log(response);
          navigate("/profile")
          console.log("POST request send sucessfully");
        }else{
          console.log("Some error has occured");
        }
      }

      


  async function handleLogin(event){
    event.preventDefault();
    console.log(Freelancer);
    setFreelancer({
        Email: "",
        password: ""
    })
    await axiosInstance.post("/freelancer/login",{Freelancer}).then((res)=>{
      if(res.status===200 && res.data.error==false)
        {
          setError(res.data.message);
          localStorage.setItem("token", res.data.accessToken);
          
          // navigate("/freelancer")
          navigate("/freelancer")
          console.log(res.data)
          console.log("POST request send sucessfully");
        }else{
            setError(res.data.message);
            console.log(error);
        }
    }).catch((error)=>{
      console.log(error);
    });
  }
  function toggle(){
    setVisibility(!visible)
}

  return (
    <div id="Form2" className="min-h-screen flex flex-row items-center justify-center">
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
              value={Freelancer.Email}
              onChange={changeFreelancer}
              required=""
            />
            <input
              className="input ring-1 ring-zinc-400 focus:ring-2 focus:ring-indigo-600 focus:shadow-lg"              
              type="password"
              name="password"
              placeholder="Password"
              value={Freelancer.password}
              onChange={changeFreelancer}
              required=""
            />
            {(error) && <p className="text-red-500 text-xs">{error}</p>}
            <button>Sign in</button>
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
              value={Freelancer.UserName}
            onChange={changeFreelancer}
            />
            <input
              className="input focus:ring-2 focus:ring-zinc-400 focus:shadow-lg"                            
              type="email"
              name="Email"
              id="email"
              placeholder="Email"
              required=""
              value={Freelancer.Email}
            onChange={changeFreelancer}
            />
            <input
              className="input focus:ring-2 focus:ring-zinc-400 focus:shadow-lg"              
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required=""
              value={Freelancer.password}
            onChange={changeFreelancer}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button >Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FreelancerReg;
