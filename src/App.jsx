import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./ui/layout/Navbar";
import Footer from "./ui/layout/Footer";
import Home from "./component/homesection/Home";
import CourseHome from "./component/courses/CourseHome";
import CourseDetails from "./component/courses/course-details/Course-details";
import WhatsAppButton from "./ui/custom/WhatsAppButton";
import ContactUs from "./component/contact/ContactUs";
import FAQ from "./ui/static/FAQ";
import PrivacyPolicy from "./ui/static/PrivacyPolicy";
import TermsAndCondition from "./ui/static/Terms&Conidition";
import ScrollToTop from "./ui/custom/ScrollToTop";
import About from "./component/about/About";
import Events from "./component/events/Events";
import AdmissionForm from "./component/forms/Admission_Form";
import DashboardContact from "./admin/contact/Contact";

// Admin Imports
import AdminLayout from "./ui/layout/AdminLayout";
import AdminLogin from "./(auth)/AdminLogin";
import AdminVerifyOTP from "./(auth)/AdminVerifyOTP";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import EnrollmentForm from "./admin/FormRegistration/FormRegistration";
import ReviewDashboard from "./admin/review/Review";
import EventRegister from "./admin/events/EventRegister";
import EventData from "./admin/events/EventData";
import ProtectedRoute from "./(auth)/ProtectedRoute";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPath =
    location.pathname === '/admin/login' ||
    location.pathname === '/admin/verify-otp';

  const token = localStorage.getItem('token');
  const pendingEmail = localStorage.getItem('admin_email');

  // --- Admin Panel Routes (Protected) ---
  if (isAdminPath && !isAuthPath) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <ScrollToTop />
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/registration" element={<EnrollmentForm title="Registration System" />} />
            <Route path="/admin/review" element={<ReviewDashboard title="Registration System" />} />
            <Route path="/admin/contact" element={<DashboardContact title="Registration System" />} />
            <Route path="/admin/event-register" element={<EventRegister />} />
          </Routes>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // --- Admin Auth Pages (Login / OTP) ---
  if (isAuthPath) {
    // Already authenticated → skip login and go straight to dashboard
    if (token) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Someone navigated directly to /admin/verify-otp without going through login
    if (location.pathname === '/admin/verify-otp' && !pendingEmail) {
      return <Navigate to="/admin/login" replace />;
    }

    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/verify-otp" element={<AdminVerifyOTP />} />
        </Routes>
      </>
    );
  }

  // --- Main Public Website ---
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseHome />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/course-details/:id/admission-form" element={<AdmissionForm />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
