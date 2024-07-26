import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
    title: string;

}

export const Header = (props: Props) => {
    const auth = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" style={{ flexGrow: 1,  textDecoration:'none' }}>
                        <Typography variant="h6" sx={{color:'#FFF'}}>
                            {props.title}
                        </Typography>
                    </Link>
                    {
                        auth?.user ? 
                        <>
                        <Button sx={{ color: '#FFF' }} onClick={auth.logout}>Logout</Button>
                        </> :
                        <>
                        <Link to="/login"><Button sx={{ color: '#FFF' }}>Login</Button></Link>
                        <Link to="/register"><Button sx={{ color: '#FFF' }}>Register</Button></Link>
                        </>
                    }
                    
                </Toolbar>
            </AppBar>
        </Box>
    )
}