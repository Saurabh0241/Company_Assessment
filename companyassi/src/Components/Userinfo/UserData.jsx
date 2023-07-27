import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidenav from "../Dashboard/Dashboard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Container } from "@mui/material";
function UserData() {
  const { ID } = useParams();

  const [updateClient, setupdateClient] = useState({});

  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://20.77.124.252:8080/api/Client/" + ID,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data);
      setupdateClient(res?.data);
      console.log(updateClient);
    } catch (err) {
      alert("");
    }
  };

  const updatechange = (event) => {
    console.log("e", event.target.value);
    event.preventDefault();

    console.log(event.target.name);
    setupdateClient({
      ...updateClient,
      [event.target.name]: event.target.value,
    });
  };

  const updateData = () => {
    const token = localStorage.getItem("token");
    const updatedData = {
      id: `${updateClient.id}`,
      name: `${updateClient.name}`,
      details: "test",
      contactPerson: "",
      email: `${updateClient.email}`,
      phoneNumber: `${updateClient.phoneNumber}`,
      logoUrl: "",
      isActive: true,
      address: {
        street1: `${updateClient.address.street1}`,
        street2: "",
        country: "test",
        region: "",
        state: "",
        city: "test",
        zip: "test",
        locality: "",
        plotNumber: "",
      },
    };

    try {
      axios.put("http://20.77.124.252:8080/api/Client", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      alert("");
    }
    console.log(updateClient);
  };
  return (
    <>
      <Sidenav />

      <h1>Client Data</h1>
      <Container maxWidth="md">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <TextField
            id="input-with-icon-textfield"
            label="Name"
            name="name"
            value={updateClient.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={updatechange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="input-with-icon-textfield"
            label="Email"
            name="email"
            value={updateClient.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={updatechange}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="input-with-icon-textfield"
            label="Phone No"
            name="phoneNumber"
            value={updateClient.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            onChange={updatechange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={updateClient?.address?.street1 || null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            fullWidth
            variant="outlined"
            onChange={updatechange}
          />
          <Link to={"/userinfo"}>
            <Button variant="contained" size="large" onClick={updateData}>
              UPDATE
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default UserData;
