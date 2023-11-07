import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import UrlManagementTable from '../Components/UrlManagementTable';
import { Footer } from '../Components/Footer';
import DefaultHeader from '../Components/DefaultHeader';

export const UrlManagementPage = () => {
  return (
    <ThemeProvider theme>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <DefaultHeader></DefaultHeader>
      <UrlManagementTable />
      <Footer />
    </ThemeProvider>
  );
}