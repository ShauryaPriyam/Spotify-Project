import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Homepage from './pages/Homepage'
import { useUserContext } from './context/Usercontext'
import Loading from './components/Loading'
import Adminpage from './pages/Adminpage'
import Playlist from './components/Playlist'
import Albumpage from './pages/Albumpage'
import Player from './components/Player'

const AppContent = () => {
  const { isAuth } = useUserContext()
  const location = useLocation() 
  const hidePlayer = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/login" element={isAuth ? <Homepage /> : <Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/playlist" element={isAuth ? <Playlist /> : <Homepage />} />
          <Route path="/album/:id" element={<Albumpage />} />
          <Route path="/logout" />
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={isAuth ? <Adminpage /> : <Homepage />} />
        </Routes>
      </div>

      {!hidePlayer && (
        <div className="w-full h-[13%] fixed bottom-0 bg-black">
          <Player />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const { spin } = useUserContext();

  return spin ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <AppContent /> 
    </BrowserRouter>
  );
};

export default App;

