import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO:wait for the backend
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
            </Box>
        </Container>
    );
};

export default Login;
