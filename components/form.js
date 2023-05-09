import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';

import api from '../pages/api/hello.js';
const LoginForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login form submitted!');
  };
  const [userName,setuserName] = useState("")
  const [password,setPassword] = useState("")

  const createUser = async (userName,password) => {
    try {
        console.log(userName,password)
    const updateUser = await api.createUser(userName,password)
    props.getUsers()

    return(
        <Alert severity="error">This is an error alert — check it out!</Alert>
    )


    } catch (error) {
      console.error(error);
    }
  }


  return (

    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop:'30px',paddingTop:'45px',display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:'antiquewhite',width:'100%',height:'100%',borderRadius:10 }}>
      <TextField label="Kullanıcı Adı"  onChange={(userName)=>setuserName(userName.target.value)} margin="normal" />
      <TextField type="password" label="Şifre"  onChange={(password)=>setPassword(password.target.value)} margin="normal" />
      <Button type="submit" onClick={()=>createUser(userName,password)} variant="contained" sx={{ mt: 3 }}>
        Yeni Üye
      </Button>
    </Box>
  );
};

export default LoginForm;
