import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function Register({auth}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      setError(err.message || 'Failed to create an account.');
      setSuccess(false);
    }
  };

  return (
    <div className='signup' style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {success && <Typography color="green">Account created successfully!</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!error}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleRegister}
        style={{ marginTop: '20px' }}
      >
        Register
      </Button>
      <Button
        fullWidth
        variant="text"
        onClick={() => navigate('/')}
        style={{ marginTop: '10px' }}
      >
        Already have an account? Log in
      </Button>
    </div>
  );
}
