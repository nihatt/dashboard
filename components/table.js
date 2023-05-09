import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Switch } from '@mui/material';
import api from '../pages/api/hello.js';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}





const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableComp(props) {
    let data = props.data;
    var me = []
    console.log(data)
    const [isLoading, setIsLoading] = React.useState(true);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const LoadRecords = async (id,val) => {
        try {
        const updateUser = await api.updateUser(id,val)
        console.log(updateUser)
  

        } catch (error) {
          console.error(error);
        }
      }

      const deleteUser = async (id) => {
        try {
            console.log(id)
        const updateUser = await api.deleteUser(id)

        console.log(updateUser)
        props.getUsers()

        } catch (error) {
          console.error(error);
        }
      }
  return (
    <TableContainer style={{width:'50%',marginRight:20}} component={Paper}>
      <Table   aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Kullanıcı Adı</TableCell>
            <TableCell align="right">Şifre</TableCell>
            <TableCell align="right">Aktif mi ?</TableCell>
            <TableCell align="center">Sil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right"><Switch {...label} value={isEnabled} defaultChecked={row.isActive}  name={row._id} onChange={()=>{setIsEnabled(!isEnabled),LoadRecords(row._id,isEnabled)}}/></TableCell>
              <TableCell align="center"><Button onClick={()=> {deleteUser(row._id)}}>SİL</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}