import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername]=useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const params = new URLSearchParams({
                email: email,
                name:username,
                password: password,
            });
            const url = globalThis.url+`/register?${params.toString()}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.status === 201) {
                // Signup was successful
                console.log('Signup successful');
                navigate('/login'); // Redirect to login page or any other route
            } else {
                // Handle error responses here
                if (response.headers.get('content-type')?.includes('application/json') && !response.bodyUsed) {
                    const responseData = await response.json();
                    console.error('Signup failed:', responseData);
                } else {
                    console.error('Signup failed: No JSON response');
                }
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
        }
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
                    <Typography variant="h4">Sign up</Typography>
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
                        <TextField
                            fullWidth
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSignup}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Sign up
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                        Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
