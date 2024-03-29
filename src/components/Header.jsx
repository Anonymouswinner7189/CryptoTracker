import { AppBar, MenuItem, Toolbar, Typography,Select, createTheme, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const title = {
    flex:1,
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer",
};

const Header = () =>{

    const navigate = useNavigate();

    const {currency,setCurrency,user} = CryptoState();

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                        sx={title} 
                        onClick={()=>navigate("/")}
                        variant='h6'
                        >
                            Crypto Tracker
                        </Typography>

                        <Select 
                            variant='outlined'
                            style={{
                                width:100,
                                height:40,
                                marginRight: 15,
                                color:'white',
                            }}
                            value={currency}
                            onChange = {(e)=>setCurrency(e.target.value)}
                            >
                            <MenuItem value={"USD"} >USD</MenuItem>
                            <MenuItem value={"INR"} >INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar/> : <AuthModal/>}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header