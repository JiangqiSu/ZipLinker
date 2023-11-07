import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { PlansAndPricing } from '../Components/PlansAndPricing';
import { Footer } from '../Components/Footer';
import DefaultHeader from '../Components/DefaultHeader';

export const SubscriptionPage = () => {
  return (
    <ThemeProvider theme>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <DefaultHeader></DefaultHeader>
      <PlansAndPricing />
      <Footer />
    </ThemeProvider>
  );
}