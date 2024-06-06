import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { listUsers } from "../../functions/admin";
import { formatDistance, subDays } from "date-fns";
import { Container } from "@mui/material";

export default function ListUsers() {
  const [userData, setUserData] = React.useState([]);

  const getUsersData = async () => {
    const res = await listUsers();
    if (res.data) {
      setUserData(res.data);
      console.log(userData);
    }
  };
  React.useEffect(() => {
    getUsersData();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full name</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row: any, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDistance(subDays(new Date(), 3), row.created_at, {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
