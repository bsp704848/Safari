import Navbar from "./Components/UI/Navbar"
import { Toaster } from 'react-hot-toast'
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import HomePage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RiderPage from "./Pages/RiderPage"
import RideBooking from "./Pages/RideBooking"

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/rider" element={<RiderPage />}/>
        <Route path="/book-ride" element={<RideBooking />}/>
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
