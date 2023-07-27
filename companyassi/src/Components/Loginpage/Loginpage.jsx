import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Tooltip from "@mui/material/Tooltip";

import { Grid } from "@mui/material";

function Loginpage() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handlechange(event) {
    event.preventDefault();
    console.log(event.target.name);
    setdata({ ...data, [event.target.name]: event.target.value });
  }

  async function getData() {
    try {
      const res = await axios.post(`http://20.77.124.252:8080/api/Auth`, {
        email: `${data.email}`,
        password: `${data.password}`,
      });
      if (res) {
        navigate("/homepage");
      } else {
        navigate("/");
      }
      console.log("res", res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
      alert(`${err.response ? err.response.data.title : "Try after Sometime"}`);
      if (err?.response?.request === 400 || err.response.request === 401) {
        navigate("/");
      } else if (err?.response?.request) {
      }
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <LocalShippingIcon
                  sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}
                  style={{ fontSize: 60 }}
                />
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Muztrans
                </Typography>

                <Box
                  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                ></Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings"></Tooltip>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Grid>
      </Grid>
      <div className="Login_main">
        <h1 className="heading">Sign In</h1>
        <div className="input_email">
          <TextField
            required
            id="outlined-required"
            label="Email"
            name="email"
            value={data.email}
            onChange={handlechange}
            fullWidth
          />
        </div>
        <div className="input_pass">
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            value={data.password}
            autoComplete="current-password"
            onChange={handlechange}
            fullWidth
          />
        </div>
        <div className="btndiv">
          <Button
            variant="contained"
            className="btn"
            color="success"
            onClick={getData}
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
