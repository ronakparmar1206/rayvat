import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginApi } from "../src/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  // -----Local State-----//
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  //-----Dispatch Action to Call api in authSlice-----//
  const dispatch = useDispatch();

  //   -----Get Data from Redux Store-----//
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  console.log(isSuccess, "isSuccess");
  //   -----Handle Submit Function-----//
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginApi({ username, password }));

    setpassword("");
    setusername("");
    navigate("/");
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          width: "min(400px,98%)",
          padding: "2rem",
        }}
      >
        <Typography sx={{ width: "100%", textAlign: "center" }}>
          Login
        </Typography>
        <TextField
          id="outlined-basic"
          value={username}
          label="Username"
          variant="outlined"
          size="small"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          value={password}
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
