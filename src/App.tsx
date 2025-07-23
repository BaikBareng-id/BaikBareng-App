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

import LandingPage from "@/pages/Landing/page";

// Bansos

import BansosPage from "./pages/Bansos/page";

// Utility Pages

import LegalPage from "./pages/Utility/Legal";
import ContactPage from "./pages/Utility/Contact";

// Auth Pages

import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import ForgotPasswordPage from "./pages/Auth/Forgot-Password";
import ChatWidget from "./components/ui/ChatWidget";


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

                <Route path="/bansos" element={<BansosPage/>} />

                {/* Utility Pages */}

                <Route path="/contact" element={<ContactPage/>} />
                <Route path="/legal" element={<LegalPage/>} />

            </Route>

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
