import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./common/ProtectedRoute/ProtectedRoute";

/* STUDENT PAGES */
import Home from "./student/pages/Home/Home";
import Dashboard from "./student/pages/Dashboard/Dashboard";
import Login from "./student/pages/Login/Login";
import Register from "./student/pages/Register/Register";
import PremiumNotes from "./student/pages/PremiumNotes/PremiumNotes";
import PYQPage from "./student/pages/PYQPage/PYQPage";
import BookRequest from "./student/pages/BookRequest/BookRequest";
import Payment from "./student/pages/Payment/Payment";

/* ADMIN PAGES */
import AdminDashboard from "./admin/pages/AdminDashboard/AdminDashboard";
import UploadBook from "./admin/pages/UploadBook/UploadBook";
import UploadPYQ from "./admin/pages/UploadPYQ/UploadPYQ";
import UploadPremium from "./admin/pages/UploadPremium/UploadPremium";
import ManageUsers from "./admin/pages/ManageUsers/ManageUsers";
import ManageRequests from "./admin/pages/ManageRequests/ManageRequests";
import ManagePayments from "./admin/pages/ManagePayments/ManagePayments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* STUDENT PROTECTED ROUTES */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/premium"
          element={
            <ProtectedRoute>
              <PremiumNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/pyq"
          element={
            <ProtectedRoute>
              <PYQPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/request"
          element={
            <ProtectedRoute>
              <BookRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PROTECTED ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload-book"
          element={
            <ProtectedRoute adminOnly={true}>
              <UploadBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload-pyq"
          element={
            <ProtectedRoute adminOnly={true}>
              <UploadPYQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/upload-premium"
          element={
            <ProtectedRoute adminOnly={true}>
              <UploadPremium />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-requests"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-payments"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManagePayments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
