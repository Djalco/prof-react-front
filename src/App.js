import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const time = new Date().toLocaleString();

  return (
    <AuthProvider>
      <Router>
        <div className="container mt-4">
          <div className="text-center mb-4">
            <h1>Les Profs de l'école</h1>
            <p className="text-muted">{time}</p>
          </div>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
