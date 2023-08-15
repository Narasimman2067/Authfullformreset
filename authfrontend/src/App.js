import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/DashBoard';
import PasswordReset from './Components/PasswordReset';
import ForgotPassword from './Components/ForgotPassword';
import Error from './Components/Error';
import { Box, CircularProgress } from "@mui/material";
import Header from "./Components/Header";
import { LoginContext } from "./Components/ContextProvider/Context";



function App() {
  const navigate = useNavigate();

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://authfullformreset.vercel.app/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      navigate("/dash");
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)

  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Header />

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;