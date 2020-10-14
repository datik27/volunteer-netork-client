import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './AddEvent.css'
import upload from '../../images/upload.png'
const AddEvent = () => {
    const [myEvent, setMyEvent]=useState({date:new Date().toDateString(),img:'https://imgur.com/XDR2o8k.png'})
    const history=useHistory()
    
    const addEventHandler=()=>{
        fetch('https://volunteer-network-serve.herokuapp.com/add-event',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(myEvent)
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                history.push('/')
            }
        })
    }
    return (
        <>
        <Grid  item xs={12} md={9} style={{marginTop:'15px'}} >
            <h3 style={{marginLeft:'20px', color:'#0C0C0C'}}>Add Event</h3>
            <Grid  container item xs={12}    
                style={{ padding:'20px',marginTop:'25px' , boxShadow:'0 2px 5px lightgray',borderRadius:'10px'}}>
                <Grid item xs={12} sm={6}>
                    <div>
                        <b>Event title</b><br/>
                        <input onBlur={(event)=>setMyEvent({...myEvent,name:event.target.value})} 
                            placeholder='Enter title' className='event-input' id='title' type="text"/>
                    </div>
                    <div>
                        <b>Description</b><br/>
                        <textarea onBlur={(event)=>setMyEvent({...myEvent,description:event.target.value})}
                        className='event-textarea' placeholder='Enter description' name="description" id="description" 
                         rows="7"></textarea>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div>
                        <b>Event date</b><br/>
                        <input type='date' className='event-input' id='date'
                        onBlur={(event)=>setMyEvent({...myEvent,date:new Date(event.target.value).toDateString()})}
                            />
                    </div>
                    <div>
                        <b>Add Image</b><br/>
                        <input placeholder='Paste your image link' type='text' className='event-input' id='date' 
                        onBlur={(event)=>setMyEvent({...myEvent,img:event.target.value})}
                           />
                    </div>
                    <div>
                        <b>Banner</b><br/>
                            <div className='file-upload' 
                                style={{background:`url(${upload}) no-repeat`, backgroundSize:'30px 30px'}}>
                                <input type="file"/>
                                <b style={{color:'#0084FF', margin:'0'}}>Upload image</b>
                            </div>
                    
                       
                    </div>
                </Grid>
            </Grid>
            <button onClick={addEventHandler} 
                style={{float:'right', height:'40px',margin:'20px', padding:'10px 40px', borderRadius:'5px'}} 
                className='blue-button'>
                    <b>Submit</b>
            </button>
        </Grid>
        
        </>
    );
};

export default AddEvent;