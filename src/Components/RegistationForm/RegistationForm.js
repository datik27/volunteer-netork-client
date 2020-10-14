import React from 'react';
import { FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import logo from '../../images/logo.png'
import { useContext } from 'react';
import { UserContext } from '../../App';
import './RegistationForm.css'
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const RegistationForm = () => {
    const history=useHistory()
    const [user]=useContext(UserContext)
    const [form, setForm]=useState({eventName:user.event?.name, name:user.name, email:user.email, img:user.event?.img})
    const submitFormHandler=(event)=>{
        event.preventDefault()
        fetch('https://volunteer-network-serve.herokuapp.com/submit-form',{
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(form)
        })
        .then(res=>res.text())
        .then(result=>{
            if(result=='true'){
                history.push('/events')
            }
        })
        
    }
   
    return (
        <div >
            <div  style={{width:"200px", margin:'auto', padding:'20px'}}>
                <Link to='/'>
                <img style={{height:'50px'}} src={logo} alt=""/>
                </Link>
            </div>

            <form onSubmit={submitFormHandler} >
            <FormGroup style={{width:'300px', margin:'auto',padding:'30px',
            border:'1px solid lightgray', borderRadius:'5px'}}>
                <h3 style={{marginTop:'0'}}>Register as a Volunteer</h3>
                
                    <FormControl style={{marginBottom:'10px'}}>
                        <InputLabel htmlFor="name">Full Name</InputLabel>
                        <Input onBlur={(event)=>setForm({...form,name:event.target.value})} name='name'   
                        style={{color:'#3d3b3b'}} id="name" aria-describedby="my-helper-text" value={user.name } required/>
                    </FormControl>
                    <FormControl style={{marginBottom:'10px'}}>
                        <InputLabel htmlFor="email">Email address</InputLabel>
                        <Input onBlur={(event)=>setForm({...form,email:event.target.value})} name='email' 
                        style={{color:'#3d3b3b'}} id="email" aria-describedby="my-helper-text" value={user?.email}/>
                    </FormControl>
                    <FormControl style={{marginBottom:'10px'}}>
                        <Input onBlur={(event)=>setForm({...form,date:new Date(event.target.value).toDateString()})} type='date'
                         name='date' style={{color:'#3d3b3b'}} id="date" aria-describedby="my-helper-text" required/>
                    </FormControl>
                    <FormControl style={{marginBottom:'10px'}}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input onBlur={(event)=>setForm({...form,description:event.target.value})}
                         style={{color:'#3d3b3b'}} id="description" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl style={{marginBottom:'10px'}}>
                    <InputLabel htmlFor="description">Organization Name</InputLabel>
                        <Input onBlur={(event)=>setForm({...form,eventName:event.target.value})}
                         name='organizationName' style={{color:'#3d3b3b'}} id="organizationName"
                         aria-describedby="my-helper-text" value={user.event?.name} required />
                    </FormControl>

                
                <button type='submit' style={{marginTop:'20px', borderRadius:'5px'}} 
                className="blue-button">Registation</button>

            </FormGroup>
            </form>
        </div>
    );
};

export default RegistationForm;