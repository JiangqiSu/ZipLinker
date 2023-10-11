import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
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
            </Box>
        </Container>
    );
};

export default Signup;
