import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DashboardPage } from './Pages/DashboardPage';
import { RoutesExplainPage } from './Pages/RoutesExplainPage';
import { NotFoundPage } from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";

export const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RoutesExplainPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}