import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Header from "./components/Header";
import AudioFiles from "./components/AudioFiles";
import AudioPlayerPage from "./pages/AudioPlayerPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import { AuthProvider } from "./context/authContext.jsx"; // Import the AuthContext provider

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the application with AuthProvider */}
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />{" "}
            {/* Public login route */}
            {/* Protected routes must use the ProtectedRoute component */}
            <Route
              path="/audio-files"
              element={
                <ProtectedRoute>
                  <AudioFiles /> {/* Only accessible if authenticated */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/audio-player/:audioId"
              element={
                <ProtectedRoute>
                  <AudioPlayerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {/* Default protected route (e.g., dashboard) */}
                  <div>
                    <h2>Welcome to the Audio Player App</h2>
                    <p>Access various features here.</p>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h2>Page not found</h2>} />{" "}
            {/* 404 Not Found route */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
