import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/logo.png'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [user]=useContext(UserContext)
    return (
        <div>
            <Grid container item xs={12} style={{padding:'10px 20px'}} alignItems='center' >
                
                <Grid item  xs={12}  md={6}>
                    <Link className='link' to='/'>
                        <img style={{height:'60px'}} src={logo} alt="volunteer network logo"/>
                    </Link>
                </Grid>
                
                <Grid container item xs={12} md={6} justify='space-between' alignItems='center' spacing={1} style={{paddingRight:'10px'}}>
                    <Grid item xs={12} md={2}><Link to='/' className='link'><b>Home</b></Link></Grid>
                    <Grid item xs={12} md={2}><Link to='/donation' className='link'><b>Donation</b></Link></Grid>
                    <Grid item xs={12} md={2}><Link to='/events' className='link'><b>Events</b></Link></Grid>
                    <Grid item xs={12} md={2}><Link to='/blog' className='link'><b>Blog</b></Link></Grid>
                    
                    
                    
                    
                    {
                        user.isSignedIn ? <Grid item xs={12} md={2}><b style={{color:'#3F90FC'}}>{user.name || 'User'} </b></Grid>
                        
                        : <Grid item xs={12} md={2} >
                            <Link to='/auth' className='link'>
                            <Button  variant="contained" style={{background:'#3F90FC', color:'white'}}>
                                Register
                            </Button>
                            </Link>
                        </Grid>
                        
                    }
                    <Grid item xs={12} md={2}>
                    <Link to='/admin-panel' className='link'>
                        <Button variant="contained" style={{background:'#434141', color:'white'}}>
                            Admin
                        </Button>
                    </Link>
                    </Grid>
                    
                </Grid>
            </Grid>
        </div>
    );
};

export default Header;