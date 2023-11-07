import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DashboardPage } from './Pages/DashboardPage';
import { RoutesExplainPage } from './Pages/RoutesExplainPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { SubscriptionPage } from './Pages/SubscriptionPage';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";

export const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RoutesExplainPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} />
                <Route path="/subscription/:userId" element={<SubscriptionPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}