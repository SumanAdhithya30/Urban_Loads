import * as React from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import CitizenDashboard from "./components/CitizenDashboard";
import SignUpComponent from "./components/SignUpComponent";
import UrbanLoadLandingPage from "./components/LandingPage";
import { ROLES } from "./utils/roles";

function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isSignUp, setIsSignUp] = React.useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show landing page for the root route when not signed in
  if (!isSignedIn) {
    return (
      <Routes>
        <Route path="/" element={<UrbanLoadLandingPage />} />
        <Route
          path="/signin"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {isSignUp ? (
                  <>
                    <SignUpComponent />
                    <p className="mt-4 text-center text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={() => setIsSignUp(false)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <SignIn />
                    <p className="mt-4 text-center text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={() => setIsSignUp(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sign up
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Simply check if the user has admin role
  const isAdmin = user?.publicMetadata?.role === ROLES.ADMIN;

  return (
    <Routes>
      <Route path="/" element={<UrbanLoadLandingPage />} />
      <Route
        path="/dashboard"
        element={
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Show CitizenDashboard to everyone */}
              <CitizenDashboard />

              {/* Show AdminDashboard only to admins */}
              {isAdmin && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Admin Dashboard
                  </h2>
                  <AdminDashboard />
                </div>
              )}
            </div>
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
