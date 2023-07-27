import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../Dashboard/Dashboard";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";

function ProjectData() {
  const [projectdata, setprojectdata] = useState([]);
  const [projectuser, setprojectuser] = useState([]);
  const [userDialog, setuserDialog] = useState(false);

  useEffect(() => {
    Projectdata();
  }, []);

  const Showusermodule = (userData) => {
    setuserDialog(true);
    setprojectuser(userData);
  };

  const CloseDialog = () => {
    setuserDialog(false);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const Projectdata = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://20.77.124.252:8080/api/Project", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res?.data);
      setprojectdata(res?.data);
    } catch {
      
    }
  };
  console.log(projectuser);
  return (
    <>
      userDialog ?
      {
        <Dialog open={userDialog} onClose={() => CloseDialog()} maxWidth={"md"}>
          <CloseIcon
            sx={{
              display: "flex",
              marginLeft: "700px",
              cursor: "pointer",
              color: "red",
              fontSize: "40px",
            }}
            onClick={() => setuserDialog(false)}
          />
          <DialogTitle>
            <span>
              <h4> User Details </h4>
            </span>
            <List sx={{ pt: 0 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectuser.map((item, index) => {
                      return (
                        <>
                          <StyledTableRow key={item.id}>
                            <StyledTableCell align="center">
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.firstName + " " + item.lastName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.email}
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </List>
          </DialogTitle>
        </Dialog>
      }
      : null
      <Sidenav />
      <h1>Project Details</h1>
      <Container maxWidth="ls">
        <Grid container spacing={3}>
          {projectdata.map((item) => {
            return (
              <Grid item xs={4} key={item.id}>
                <Grid
                  sx={{
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    boxShadow:
                      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                    height: "200px",
                    width: "350px",
                    position: "relative",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginTop: "10px" }}>
                    <Typography variant="h5">
                      Project Name:-{item.name}
                    </Typography>
                  </div>
                  <Typography variant="h6">
                    Client Name :-{item.clientName}
                  </Typography>
                  <Typography variant="h6">
                    Create Date :-
                    {moment(item.createdOn).format("MMM / Do /  YY")}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      bottom: "0px",
                      margin: "auto",
                      color: "black",
                      backgroundColor: "#fb641b",
                      borderRadius: "10px",
                    }}
                    onClick={() => Showusermodule(item.users)}
                  >
                    Show Users
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default ProjectData;
