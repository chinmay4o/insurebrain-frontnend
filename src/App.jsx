import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InsuranceTypeSelection from './components/InsuranceTypeSelection';
import StartChat from './components/StartChat';
import MySessions from './components/MySessions';
import RecommendationResults from './components/RecommendationResults';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Public Route Component (redirects to home if already logged in)
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/home" element={
        <ProtectedRoute>
          <InsuranceTypeSelection />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/insurance/life" element={
        <ProtectedRoute>
          <Dashboard activeRoute="life-insurance" />
        </ProtectedRoute>
      } />

      <Route path="/insurance/health" element={
        <ProtectedRoute>
          <Dashboard activeRoute="health-insurance" />
        </ProtectedRoute>
      } />

      <Route path="/insurance/auto" element={
        <ProtectedRoute>
          <Dashboard activeRoute="automobile-insurance" />
        </ProtectedRoute>
      } />

      <Route path="/sessions" element={
        <ProtectedRoute>
          <Dashboard activeRoute="my-sessions" />
        </ProtectedRoute>
      } />

      <Route path="/results" element={
        <ProtectedRoute>
          <Dashboard activeRoute="recommendation-results" />
        </ProtectedRoute>
      } />

      {/* Catch all route - redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
