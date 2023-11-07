import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DashboardPage } from './Pages/DashboardPage';
import { RoutesExplainPage } from './Pages/RoutesExplainPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { SubscriptionPage } from './Pages/SubscriptionPage';
import { UrlManagementPage } from "./Pages/UrlManagementPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import { HistoryPage } from "./Pages/HistoryPage";

export const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RoutesExplainPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} />
                <Route path="/history/:userId" element={<HistoryPage />} />
                <Route path="/subscription/:userId" element={<SubscriptionPage />} />
                <Route path="/management/:userId" element={<UrlManagementPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
