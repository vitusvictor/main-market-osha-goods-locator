import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Locations from './pages/Locations'
import ReactGA from 'react-ga'

function App() {
  useEffect(()=>{
    ReactGA.initialize('G-11YS1PZ8FG')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <BrowserRouter>   

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/locations' element={<Locations/>}/>
      </Routes>
      
    </BrowserRouter>
     
  );
}

export default App;
