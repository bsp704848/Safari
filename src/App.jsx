import React,{useRef} from 'react'
import { Toaster } from 'react-hot-toast'
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import HomePage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RiderPage from "./Pages/RiderPage"
import RideBooking from "./Pages/RideBooking"
import Mainlayout from "./Components/UI/Mainlayout"

function App() {
   const homePageRef = useRef(null);

  const handleScrollToService = () => {
    homePageRef.current?.scrollToService();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainlayout scrollToService={handleScrollToService}><HomePage  ref={homePageRef} /></Mainlayout>} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/about" element={<Mainlayout scrollToService={handleScrollToService}><AboutPage /></Mainlayout>}/>
        <Route path="/rider" element={<Mainlayout scrollToService={handleScrollToService}><RiderPage /></Mainlayout>}/>
        <Route path="/book-ride" element={<Mainlayout scrollToService={handleScrollToService}><RideBooking /></Mainlayout>}/>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            color: 'white',
          },
          success: {
            style: {
              background: '#40D734',
            },
          },
          error: {
            style: {
              background: '#E0452C',
            },
          },
        }}
      />
    </Router>
  )
}

export default App
