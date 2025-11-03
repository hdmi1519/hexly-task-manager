import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};
