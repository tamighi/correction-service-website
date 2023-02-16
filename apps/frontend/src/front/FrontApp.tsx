import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"

import { Appbar } from "./components/generics/appbar/Appbar"
import { Background } from "./components/generics/background/Background"
import { Footer } from "./components/generics/footer/Footer"
import { ContactPage } from "./components/pages/contactPage/ContactPage"
import { GoldenBookPage } from "./components/pages/goldenBookPage/GoldenBookPage"
import { HomePage } from "./components/pages/homePage/HomePage"
import { ReviewPage } from "./components/pages/reviewPage/ReviewPage"
import { ServicePage } from "./components/pages/servicePage/ServicePage"
import { ErrorPage } from "./ErrorPage"


import "./FrontApp.css"

export const FrontApp = () => {
  const location = useLocation()

  return (
    <div className="FrontApp">
      <Appbar />
      <Background />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="" element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="livredor" element={<GoldenBookPage />} />
          <Route path="avis" element={<ReviewPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}