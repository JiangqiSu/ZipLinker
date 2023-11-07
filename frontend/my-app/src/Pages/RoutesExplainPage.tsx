import { Navigate } from 'react-router-dom';

export const RoutesExplainPage = () => {
    const auth = true;
    return auth ? (
        <>
            <h3>This page is going to be replaced by the real homepage. To modify, go to Routes.tsx</h3>
            <h3>Home page: /home</h3>
            <h3>Dashboard page: /dashboard/:userId</h3>
            <h3>Subscription page for new user: /subscription/:userId</h3>
        </>
    ) : <Navigate to="/login" />;
}