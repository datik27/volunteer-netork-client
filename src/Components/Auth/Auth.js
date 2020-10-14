import React, { useContext } from 'react';
import { FormControl, FormGroup,  Grid,  Input, InputLabel } from '@material-ui/core';
import firebase from 'firebase'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import google from '../../images/google.png'
import firebaseConfig from '../firebaseConfig/firebaseConfig';
firebase.initializeApp(firebaseConfig);



export default function Auth() {
  const [user,setUser]=useContext(UserContext)
  const history=useHistory()

  //sign in with google provider
  const googleSigninHandler = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      setUser({...user, email:result.user.email, name:result.user.displayName, uid:result.user.uid, isSignedIn:true})
      history.location.state ? history.replace(history.location.state.pathname)
      : history.goBack()
    })
    .catch(error=>console.log(error))
  }

// sign up with email and password
  const emailPassSignupHandler=()=>{
    firebase.auth().createUserWithEmailAndPassword(`${user.inputEmail}`, `${user.inputPassword}`)
    .then(result => {
      setUser({...user, isSignedUp:true})
    })
    .catch(error=>console.log(error))
  }

  // sign in with email and password
  const emailPassSigninHandler = ()=>{
    firebase.auth().signInWithEmailAndPassword(`${user.inputEmail}`, `${user.inputPassword}`)
    .then(result=>{
        setUser({...user, isSignedIn:true, email:result.user.email})
        history.location.state ? history.replace(history.location.state.pathname)
        : history.goBack()
      })
    .catch(error=>console.log(error))
  }

// token verify




  return (
   <>
     <FormGroup style={{width:"300px",border:'1px solid lightgray',
      padding:'30px', borderRadius:'10px',  margin:'auto', marginTop:'20vh'}}>
        {
          user.isSignedUp ? <b style={{textAlign:'center'}}>Login</b>
          : <b style={{textAlign:'center'}}>Create an Account</b>
        }
        <FormControl style={{marginBottom:"5px"}}>
            <InputLabel >Email address</InputLabel>
            <Input onBlur={(event)=>setUser({...user, inputEmail:event.target.value})}  aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl style={{marginBottom:"15px"}}>
            <InputLabel >Password</InputLabel>
            <Input onBlur={(event)=>setUser({...user, inputPassword:event.target.value})} aria-describedby="my-helper-text" />
        </FormControl>
        {
          user.isSignedUp? <button onClick={emailPassSigninHandler} className='blue-button'>Sign in</button>
          :<button onClick={emailPassSignupHandler} className='blue-button'>Sign up</button>
          
          
        }
        <Grid container item justify='center' alignItems='center' onClick={googleSigninHandler}
          style={{margin:'auto',cursor:'pointer',  width:'270px',marginTop:'20px', borderRadius:"30px", padding:'0'}} >
          <Grid item>
            <img style={{width:'35px', margin:'0', padding:'0'}} src={google} alt=""/>
          </Grid>
          <Grid style={{marginBottom:'5px', marginLeft:'10px', }} item >Continue with Google</Grid>
        </Grid>

        {
          user.isSignedUp ? 
            <div style={{textAlign:'center', marginTop:'10px'}}>
            Don't have an account? 
            <span onClick={()=>setUser({...user,isSignedUp:false})} 
              style={{color:'#3F90FC', marginLeft:'10px',fontWeight:'400', cursor:'pointer'}}>
              Create an account
            </span>
            </div>
          : <div style={{textAlign:'center', marginTop:'10px'}}>
              Already have an account? 
            <span onClick={()=>setUser({...user,isSignedUp:true})} 
              style={{color:'#3F90FC', marginLeft:'10px',fontWeight:'400', cursor:'pointer'}}>
                Signin
            </span>
            </div>
        }
    </FormGroup>
  
      
   </>
  );
}
