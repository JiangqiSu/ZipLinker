import { Navigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const auth = true;
    return auth ? (
        <>
            <h3>Page not Found</h3>
        </>
    ) : <Navigate to="/login" />;
}