import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// Components
import Sidebar from "./components/Sidebar";

// Pages
import AuthPage from "./Pages/AuthPage";
import Dashboard from "./Pages/Dashboard";
import DailyPlan from "./Pages/DailyPlan";
import WeeklyPlan from "./Pages/WeeklyPlan";
import MonthlyPlan from "./Pages/MonthlyPlan";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<AuthPage />} />

        {/* Pages WITH Sidebar */}
        <Route
          path="/*"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />

              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="daily" element={<DailyPlan />} />
                  <Route path="weekly" element={<WeeklyPlan />} />
                  <Route path="monthly" element={<MonthlyPlan />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
