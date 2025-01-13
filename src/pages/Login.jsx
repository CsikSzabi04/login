import React from 'react'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({auth, setUser}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); setPassword("");
      setLoginError(false);
      
      window.location.href = "https://csikszabi04.github.io/stats";
      
    } catch (error) {
      console.log("Login error: ", error.code);
      setLoginError(true);
    }
  }

  return (
    <div className='login'>
      <TextField
        error={loginError}
        required
        label="Email"
        value={email}
        onChange={e => {setEmail(e.target.value); setLoginError(false);}}
      />
      <TextField
        required
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        helperText={loginError ? "Hibás felhasználónév vagy jelszó" : "Kérem, jelentkezzen be "}
      />
      <Button
        variant="contained"
        color="success"
        onClick={login}
      >Login</Button>
    </div>
  )
}
