import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Copyright } from './Copyright';
import { Box, Divider } from '@mui/material';

const footers = [
    {
      title: 'About Us',
      description: ['Team', 'Contact us', 'Locations'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];

export const Footer = () => {
    return (
        <Container
        maxWidth="md"
        component="footer"
        sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
        }}>
            <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    {footer.title}
                </Typography>
                <ul>
                    {footer.description.map((item) => (
                    <li key={item}>
                        <Link href="#" variant="subtitle1" color="text.secondary">
                        {item}
                        </Link>
                    </li>
                    ))}
                </ul>
                </Grid>
            ))}
            </Grid>
            <Box sx={{ p: 4 }}>
                <Divider />
                <Copyright />
            </Box>
        </Container>
    );
}