import { Providers } from "./providers/Providers";

import { AppRoutes } from "./routes/routes";
import { HashRouter as Router } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <AppRoutes />
      </Router>
    </Providers>
  );
};
