import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Events.css'
const Events = () => {
    const [user]=useContext(UserContext)
    const [events, setEvents]=useState([])
    useEffect(()=>{
        fetch('https://volunteer-network-serve.herokuapp.com/my-events',{
            method:'GET', 
            headers:{
                'Content-Type':'application/json',
                email: user.email
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setEvents(result)
        })
    })

    const calcelEventHandler=(id)=>{
        fetch('https://volunteer-network-serve.herokuapp.com/cancel-event',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                id:id
            }
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                const existingEvents=events.filter(data=>data._id !== id)
                setEvents(existingEvents)
            }
        })
    }
    return (
        <>
        <Header></Header>
  
            <Grid container item xs={11} justify='center'  spacing='5' style={{margin:'auto'}}>
                {
                    events.map(event=>{
                       return(
                            <Grid key={event._id} container item xs={10} sm={5} justify='space-around' 
                            style={{boxShadow:'0px 2px 5px lightGray', borderRadius:'10px', width:'100%',margin:'10px'}}>
                                <Grid item xs={10} md={5} style={{width:'50%'}}>
                                    <img style={{width:'100%', height:'180px'}} src={event.img} alt=""/>
                                </Grid>
                                <Grid item xs={10} md={5} style={{width:'50%', marginLeft:'15px'}}>
                                    <h3>{event.eventName}</h3>
                                    <h4>{event.date}</h4>
                                    <div style={{textAlign:'right', marginTop:'30px'}}>
                                    <button onClick={()=>calcelEventHandler(event._id)}  className='event-cancel'>
                                        cancel
                                    </button>
                                    </div>
                                </Grid>
                            </Grid>
                       )
                    })
                }
            </Grid>
            
       
        </>
    );
};

export default Events;