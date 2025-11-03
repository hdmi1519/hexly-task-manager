import { Outlet } from "react-router-dom";
import { Header } from "./Layout/Header";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-light-bg-secondary dark:bg-dark-bg transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
