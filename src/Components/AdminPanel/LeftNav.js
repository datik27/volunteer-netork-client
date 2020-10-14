import React, { useContext, useEffect } from 'react';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AddIcon from '@material-ui/icons/Add';
import logo from '../../images/logo.png'
import { UserContext } from '../../App';
import './LeftNav.css'
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
const LeftNav = () => {
    const [user,setUser]=useContext(UserContext)
    useEffect(()=>{
        setUser({...user, clicked:'volunteerList'})
    },[])
  
    
    return (
        <Grid container item xs={12}  style={{padding:'10px',  paddingTop:'20px'}}>
            <Grid item xs={12}>
                <Link to='/' className='link'>
                <img style={{height:'50px'}} src={logo} alt=""/>
                </Link>
            </Grid>

        <Grid container item xs={12} alignItems='center'>
        <Grid item >
        <button className='nav-button' autoFocus>
        <div onClick={()=>setUser({...user,clicked:'volunteerList'})} 
        style={{display:'flex',cursor:'pointer', margin:'15px 0px', alignItems:'center'}}>
            <div>
                <PeopleOutlineIcon></PeopleOutlineIcon>
            </div>
            <div style={{marginLeft:'2px'}}>
                <b>Volunteer register list</b>
            </div>
        </div>
        </button>
        </Grid>

        <Grid item >
        <button className='nav-button'>
        <div onClick={()=>setUser({...user,clicked:'addEvent'})} 
        style={{display:'flex', cursor:'pointer',alignItems:'center' }}>
            <div>
                <AddIcon></AddIcon>
            </div>
            <div style={{marginLeft:'2px'}}>
                <b>Add Event</b>
            </div>
        </div>
        </button>
        </Grid>
        </Grid>

        </Grid>
    );
};

export default LeftNav;