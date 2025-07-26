// Default Import

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Layout

import Layout from "@/layouts/root-layout";

// Utility Pages / Components

// import ScrollToTop from "./utility/ScrollToTop";
import CustomCursor from "./utility/CustomCursor";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import NotFoundPage from "./pages/Utility/NotFound404";
import LoadingScreen from "./pages/Utility/LoadingScreen";

// Pages

import TransparencyPage from "./pages/Public-Transparency/page";
import LandingPage from "@/pages/Landing/page";
import AIRecommendationPage from "./pages/AI/recommendation-ai";
import FeaturesPage from "./pages/Features/page";

// Bansos

import BansosPage from "./pages/Bansos/page";
import ProgramDetailPage from "./pages/Bansos/[id]/page";

// Utility Pages

import BansosSubmitPage from "./pages/Bansos/submit/page";
import PartnershipPage from "./pages/Utility/Wants-to-be-partner";

import LegalPage from "./pages/Utility/Legal";
import ContactPage from "./pages/Utility/Contact";

import EducationPage from "./pages/Education/page";
import ArticleDetailPage from "./pages/Education/article";
import VideoDetailPage from "./pages/Education/video-tutorial";
import PartnersPage from "./pages/Utility/Partner";

import ConnectWalletPage from "./pages/Utility/Connect-Wallet";

// Auth Pages

import AdminLoginPage from "./pages/Auth/Admin-Login";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import ForgotPasswordPage from "./pages/Auth/Forgot-Password";
import ChatWidget from "./components/ui/ChatWidget";

// User Dashboard Pages

import SettingsPage from "./pages/User-Dashboard/Settings/page";
import ProgramsPage from "./pages/User-Dashboard/Programs/page";
import DashboardOverview from "./pages/User-Dashboard/overview";
import DashboardLayout from "./pages/User-Dashboard/layout";

function App() {

  const [loading, setLoading] = useState(true);

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <BrowserRouter>
      <ScrollToTopFunction />
      {/* <ScrollToTop /> */}
      <CustomCursor />

      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <AnimatePresence mode="wait">

        {!loading && (

          <Routes>

            <Route path="/" element={<Layout />}>
              
                <Route index element={<LandingPage/>} />

                {/* AI Pages */}

                <Route path="/bansos-recommendation" element={<AIRecommendationPage/>} />

                <Route path="/public-data" element={<TransparencyPage/>} />
                <Route path="/features" element={<FeaturesPage/>} />

                <Route path="/bansos" element={<BansosPage/>} />
                <Route path="/bansos/:id" element={<ProgramDetailPage/>} />

                {/* Utility Pages */}

                <Route path="/bansos/:id/submit" element={<BansosSubmitPage/>} />
                <Route path="/connect" element={<ConnectWalletPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/legal" element={<LegalPage/>} />

                <Route path="/education" element={<EducationPage/>} />
                <Route path="/education/articles/:id" element={<ArticleDetailPage/>} />
                <Route path="/education/videos/:id" element={<VideoDetailPage/>} />
                <Route path="/partner" element={<PartnersPage/>} />
                <Route path="/partnership" element={<PartnershipPage/>} />

            </Route>

            {/* User Dashboard */}

            <Route path="/user-dashboard" element={<DashboardLayout children={<DashboardOverview/>}/>} />
            <Route path="/user-settings" element={<DashboardLayout children={<SettingsPage/>}/>} />
            <Route path="/user-programs" element={<DashboardLayout children={<ProgramsPage/>}/>} />

            {/* Auth Pages */}

            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="*" element={<NotFoundPage />} />

          </Routes>

        )}

      </AnimatePresence>

      <Toaster position="top-center" />

      <ChatWidget />
      
    </BrowserRouter>

  );
}

export default App;
