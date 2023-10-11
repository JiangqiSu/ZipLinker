import { Navigate } from 'react-router-dom';

export const DashboardPage = () => {
    const auth = true;
    return auth ? <h1>Dashboard</h1> : <Navigate to="/login" />
}