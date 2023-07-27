import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidenav from "../Dashboard/Dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 8,
  },
}));

export default function CustomizedTables() {
  const [user, setuser] = useState([]);
  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    getuserinfo();
  }, []);

  async function getuserinfo() {
    try {
      const res = await axios.get("http://20.77.124.252:8080/api/Client", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res?.data);
      if (res) {
        setuser(res?.data);
      }
    } catch (err) {
      alert("");
    }
  }
  return (
    <>
      <Sidenav />
      <h1>Client Information</h1>
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <h3>ID</h3>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <h3>Name</h3>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <h3>Email</h3>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <h3>Phone No</h3>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <h3>Action</h3>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((item, index) => {
                return (
                  <>
                    <StyledTableRow key={index + 1}>
                      <StyledTableCell align="center">
                        <h3>{item.id}</h3>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h3> {item.name}</h3>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h3> {item.email}</h3>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h3> {item.phoneNumber} </h3>
                      </StyledTableCell>
                      <StyledTableCell style={{ cursor: "pointer" }}>
                        <Link to={"/userinfo/" + item.id}>
                          {
                            <EditNoteIcon
                              sx={{ fontSize: "40px" }}
                              align="center"
                            />
                          }
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
