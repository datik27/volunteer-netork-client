import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import LeftNav from './LeftNav';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { UserContext } from '../../App';
import AddEvent from './AddEvent';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#F5F6FA",
      color: 'grey',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'white',
      },
    },
  }))(TableRow);
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  //start dashboard componentent code
const AdminPanel = () => {
    const [user]=useContext(UserContext)
    const classes=useStyles();
    const [allEvents, setAllEvents] = useState([])
    
    
    useEffect(()=>{
        
            fetch('https://volunteer-network-serve.herokuapp.com/all-registered-events')
            .then(res=>res.json())
            .then(result=>setAllEvents(result))
       
    },[])

    const eventDeleteHandler=(id)=>{
        fetch('https://volunteer-network-serve.herokuapp.com/cancel-event',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                id:id
            }
        })
        .then(res=>res.json())
        .then(result=>{
            const existingEvents = allEvents.filter(data=>data._id !== id)
            if(result){
                setAllEvents(existingEvents)
            }
        })

    }
    return (
        <Grid container item xs={12}>
            <Grid item md={2} xs={12}>
                <LeftNav></LeftNav>
            </Grid>

            {
                user.clicked == 'volunteerList' &&
                <Grid item md={9} xs={12} style={{marginLeft:'20px', marginTop:'10px'}}>
                <h3 style={{textAlign:'left', marginLeft:'10px', color:'#0C0C0C'}}>Volunteer register list</h3>
                <TableContainer component={Paper} style={{marginTop:'30px',
                    boxShadow:'0 2px 5px lightgray', padding:'30px', borderRadius:'10px'}}>
                <Table className={classes.table} aria-label="customized table" >
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Email Id</StyledTableCell>
                        <StyledTableCell align="left">Registation Date</StyledTableCell>
                        <StyledTableCell align="left">Volunteer list</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allEvents.map((event)=>{
                        return(
                            <StyledTableRow key={event._id}>
                        <StyledTableCell component="th" scope="row">
                            {event.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">{event.email}</StyledTableCell>
                        <StyledTableCell align="left">{event.date}</StyledTableCell>
                        <StyledTableCell align="left">{event.eventName}</StyledTableCell>
                        <StyledTableCell align="left">
                            <DeleteForeverIcon onClick={()=>eventDeleteHandler(event._id)} 
                            justify='center' style={{cursor:'pointer', color:'#f35d5d'}}>

                            </DeleteForeverIcon>
                        </StyledTableCell>
                        </StyledTableRow>
                        )
                        })
                    }
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            }
            {
                user.clicked == 'addEvent' &&
                <AddEvent></AddEvent>
            }
        </Grid>
    );
};

export default AdminPanel;