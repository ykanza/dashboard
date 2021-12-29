import Registration from './components/Views/Registration';
import Login from "./components/Views/Login";
import Dashboard from "./components/Views/Dashboard";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthMiddleware } from "./Middlewares/AuthMiddleware";
import { LoggedInMiddleware } from "./Middlewares/LoggedInMiddleware";

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route element={<AuthMiddleware />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route element={<LoggedInMiddleware />}>
              <Route path="/registration" element={<Registration/>} />
              <Route path="/login" element={<Login/>} />
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
