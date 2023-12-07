import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

declare global {
    var userEmail: string;
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const params = new URLSearchParams({
                email: email,
                password: password
            });
            const url = globalThis.url+`/login?${params.toString()}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful', data);
                const Email = data.email;
                globalThis.userEmail=Email
                navigate(`/dashboard/:${Email}`); 
            } else {
                const errorData = await response.text();
                console.error('Login failed:', errorData);
                alert('Login failed: ' + errorData);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
        handleHomeClick();
    };
    
    const handleHomeClick = () => {
        navigate('/home');
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <form>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </Typography>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<HomeIcon />}
                        onClick={handleHomeClick}
                    >
                        Home
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
